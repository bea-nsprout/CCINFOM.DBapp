import express from "express";
import { body, matchedData, query } from "express-validator";
import { validationRoutine, extractMatchedRoutine } from "./helper.js";

const itemDoesNotExistRoutine = (connection) => {
    const routine = async (req, res, next) => {
        const [[{ item_exists }]] = await connection.execute(
            `SELECT EXISTS (SELECT 1 FROM items items WHERE items.item_code = ?) AS item_exists;`,
            [res.locals.data.item_code],
        );
        if (item_exists) {
            res.status(406).json({ error: "item already exists." });
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
            res.status(406).json({ error: "item does not exist." });
            return;
        }

        next()

    }

    return routine;
};

const inventoryRouter = (cors, connection) => {
    const routeRoot = "/api/items/";
    const router = express.Router();

    router.get(
        routeRoot + "all",
        query("archived").optional().isBoolean(),
        cors(),
        [
            validationRoutine(400, "Invalid value for archived, must be 'true' or 'false'."),
            async (req, res) => {
                const { archived } = matchedData(req);
                let sqlQuery = "SELECT * FROM items";

                if (archived !== undefined) {
                    sqlQuery += " WHERE archived = ?";
                }

                const [results] = await connection.execute(
                    sqlQuery,
                    archived !== undefined ? [archived == "true" ? true : false] : [],
                );

                res.status(200).json(results);
            }
        ]
    );

    router.post(
        routeRoot + "insert",
        [
            body("item_code").notEmpty().isString().trim(),
            body("item_desc").notEmpty().isString().trim(),
            body("unit").notEmpty().isString().trim(),
        ],
        cors(),
        [
            validationRoutine(400, "ensure item_code, item_desc, and unit are all alphanumeric and defined."),
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

                res.status(200).send({ message: "successfully added " + item_code });
            }
        ],
    );

    router.delete(
        routeRoot + "delete",
        [body("item_code").notEmpty().isString().trim()],
        cors(),
        [
            validationRoutine(400, "ensure item_code is alphanumeric and defined."),
            extractMatchedRoutine,
            itemExistsRoutine(connection),
            async (req, res) => {
                const { item_code } = res.locals.data;

                const [[{ no_existing_item }]] = await connection.execute(
                    `SELECT NOT EXISTS ( SELECT 1 FROM inventories WHERE item_code = ? AND quantity > 0) AS no_existing_item;`,
                    [item_code],
                );

                if (!no_existing_item) {
                    res
                        .status(409)
                        .json({
                            error:
                                "currently a warehouse holds a quantity of that item. Please empty the warehouse and try again.",
                        });
                    return;
                }

                await connection.execute(
                    `DELETE FROM inventories WHERE item_code = ?`,
                    [item_code],
                );
                await connection.execute(
                    `DELETE FROM items WHERE item_code = ?`,
                    [item_code],
                );

                res.status(200).json({ response: "successfully deleted " + item_code });
            },
        ],
    );

    router.put(
        routeRoot + "modify",
        [
            body("item_code").notEmpty().isString().trim(),
            body("item_desc").notEmpty().isString().trim(),
            body("unit").notEmpty().isString().trim(),
        ],
        cors(),
        [
            validationRoutine(400, "ensure item_code, item_desc, and unit are all alphanumeric and defined."),
            extractMatchedRoutine,
            itemExistsRoutine(connection),
            async (req, res) => {

                const { item_code, item_desc, unit } = res.locals.data;
                await connection.execute(`UPDATE items SET item_desc = ?, unit = ? WHERE item_code = ?`, [item_desc, unit, item_code])



                res.status(200).json({ response: "successfully modified" });
            }
        ]
    )

    return router;
};

export default inventoryRouter;
