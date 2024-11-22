import express from "express";
import { body, matchedData, query, validationResult } from "express-validator";

const itemDoesNotExistRoutine = (connection) => {
    const routine = async (req, res, next) => {
        const [[{ item_exists }]] = await connection.execute(
            `SELECT EXISTS (SELECT 1 FROM item_masterlist items WHERE items.item_code = ?) AS item_exists;`,
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
            `SELECT EXISTS (SELECT 1 FROM item_masterlist items WHERE items.item_code = ?) AS item_exists;`,
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

const extractMatchedRoutine = (req, res, next) => {
    res.locals.data = matchedData(req)
    next()
}


const validationRoutine = (status, description) => {
    const routine = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res
                .status(status)
                .json({
                    errors: errors.array(),
                    description: description
                });
            return;
        }
        next()
    }

    return routine

}


const inventory = (cors, connection) => {
    const routeRoot = "/api/item-masterlist/";
    const router = express.Router();

    router.get(
        routeRoot + "all",
        query("archived").optional().isBoolean(),
        cors(),
        [
            validationRoutine(400, "Invalid value for archived, must be 'true' or 'false'."),
            async (req, res) => {
                const { archived } = matchedData(req);
                let sqlQuery = "SELECT * FROM item_masterlist";

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
                    "INSERT INTO item_masterlist (item_code, item_desc, unit) VALUES (?, ?, ?);",
                    [item_code, item_desc, unit],
                );

                await connection.execute(
                    `INSERT INTO warehouse_inventory (item_code, warehouse_id) SELECT ?, warehouse_id FROM warehouse;`,
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
                    `SELECT NOT EXISTS ( SELECT 1 FROM warehouse_inventory WHERE item_code = ? AND quantity > 0) AS no_existing_item;`,
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
                    `DELETE FROM warehouse_inventory WHERE item_code = ?`,
                    [item_code],
                );
                await connection.execute(
                    `DELETE FROM item_masterlist WHERE item_code = ?`,
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
                await connection.execute(`UPDATE item_masterlist SET item_desc = ?, unit = ? WHERE item_code = ?`, [item_desc, unit, item_code])



                res.status(200).json({ response: "successfully modified" });
            }
        ]
    )

    return router;
};

export default inventory;
