import express from "express";
import { body, matchedData, query } from "express-validator";
import { validationStrictRoutine, extractMatchedRoutine } from "./helper.js";

const itemDoesNotExistRoutine = (connection) => {
    const routine = async (req, res, next) => {
        const [[{ item_exists }]] = await connection.execute(
            `SELECT EXISTS (SELECT 1 FROM items items WHERE items.item_code = ?) AS item_exists;`,
            [res.locals.data.item_code],
        );
        if (item_exists) {
            res.status(406).json({ success: false, error: "item already exists." });
            return;
        }

        next()

    }

    return routine;
};


const itemExistsRoutine = (connection) => {
    const routine = async (req, res, next) => {
        const [[{ item_exists }]] = await connection.execute(
            `SELECT EXISTS (SELECT 1 FROM items items WHERE items.item_code = ?) AS item_exists;`,
            [res.locals.data.item_code],
        );
        if (!item_exists) {
            res.status(406).json({ success: false, error: "item does not exist." });
            return;
        }

        next()

    }

    return routine;
};

const itemsRouter = (connection) => {
    const router = express.Router();


    // Get all items, query for archived.
    router.get(
        '/view/archived',
        query("archived").isBoolean(),
        [
            validationStrictRoutine(400, "Archived must be a boolean ('true' or 'false')."),
            async (req, res) => {
                const { archived } = matchedData(req);
                const [results] = await connection.execute(
                    "SELECT * FROM items WHERE archived = ?",
                    [archived == "true"]
                );
                res.status(200).json(results);
            }
        ]
    );

    // Get all items, item_code.
    router.get(
        '/view/item-code',
        [query("item-code").notEmpty().isString().trim()],
        [
            validationStrictRoutine(400, "item-code must be provided."),
            async (req, res) => {
                const { "item-code": item_code } = matchedData(req);
                const [results] = await connection.execute(
                    "SELECT * FROM items WHERE item_code LIKE ?",
                    [`%${item_code}%`]
                );
                res.status(200).json(results);
            }
        ]
    );

    // Gets all items.
    router.get(
        "/view/all",
        [
            async (req, res) => {

                const [results] = await connection.execute(
                    "SELECT * FROM items",
                );

                res.status(200).json(results);
            }
        ]
    );

    router.post(
        "/new",
        [
            body("item_code").notEmpty().isString().trim(),
            body("item_desc").notEmpty().isString().trim(),
            body("unit").notEmpty().isString().trim(),
        ],
        [
            validationStrictRoutine(400, "ensure item_code, item_desc, and unit are all alphanumeric and defined."),
            extractMatchedRoutine,
            itemDoesNotExistRoutine(connection),
            async (req, res) => {

                const { item_code, item_desc, unit } = res.locals.data;

                await connection.execute(
                    "INSERT INTO items (item_code, item_desc, unit) VALUES (?, ?, ?);",
                    [item_code, item_desc, unit],
                );

                await connection.execute(
                    `INSERT INTO inventories (item_code, warehouse_id) SELECT ?, warehouse_id FROM warehouses;`,
                    [item_code],
                );

                res.status(200).send({ success: true, message: "successfully added " + item_code });
            }
        ],
    );

    router.post(
        "/delete",
        [body("item_code").notEmpty().isString().trim()],
        [
            validationStrictRoutine(400, "ensure item_code is alphanumeric and defined."),
            extractMatchedRoutine,
            itemExistsRoutine(connection),
            async (req, res) => {
                const { item_code } = res.locals.data;

                await connection.execute("SET @itemcode = ?;", [item_code]);

                const [thing] = await connection.execute("SELECT @itemcode");
                console.log(thing);

                const [[{ no_existing_item }]] = await connection.execute(
                    `SELECT NOT EXISTS (
            SELECT 1
            FROM inventories
            WHERE item_code = ? AND quantity > 0
        ) AND NOT EXISTS (
            SELECT 1
            FROM requests
            WHERE item_code = ?
        ) AND NOT EXISTS (
            SELECT 1
            FROM productions
            WHERE item_code = ?
        ) AND NOT EXISTS (
            SELECT 1
            FROM adjustments
            WHERE item_code = ?
        ) AS no_existing_item;
;`, [item_code, item_code, item_code, item_code]
                );
                console.log(no_existing_item);

                if (!no_existing_item) {
                    res
                        .status(409)
                        .json({
                            success: false,
                            error:
                                "currently a warehouse holds a quantity of that item. Please empty the warehouse and try again.",
                        });
                    return;
                }

                try {
                    await connection.execute(
                        `DELETE FROM inventories WHERE item_code = ?`,
                        [item_code],
                    );
                    await connection.execute(
                        `DELETE FROM items WHERE item_code = ?`,
                        [item_code],
                    );

                } catch (error) {
                    res.status(400).json({ success: false, message: "could not delete item." });
                    console.log(error);
                    return;
                }


                res.status(200).json({ success: true, message: "successfully deleted " + item_code });
            },
        ],
    );

    router.post(
        "/modify",
        [
            body("item_code").notEmpty().isString().trim(),
            body("item_desc").notEmpty().isString().trim(),
            body("unit").notEmpty().isString().trim().isLength({ min: 0, max: 10 }),
        ],
        [
            validationStrictRoutine(400, "ensure item_code, item_desc, and unit are all alphanumeric and defined."),
            extractMatchedRoutine,
            itemExistsRoutine(connection),
            async (req, res) => {

                const { item_code, item_desc, unit } = res.locals.data;
                await connection.execute(`UPDATE items SET item_desc = ?, unit = ? WHERE item_code = ?`, [item_desc, unit, item_code])



                res.status(200).json({ success: true, message: "successfully modified" });
            }
        ]
    )

    return router;
};

export default itemsRouter;
