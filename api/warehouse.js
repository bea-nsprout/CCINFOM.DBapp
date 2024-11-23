import express from "express";
import { body, matchedData, query } from "express-validator";
import { validationStrictRoutine, extractMatchedRoutine } from "./helper.js";

const assertWarehouseExistsRoutine = (connection) => {
    const routine = async (req, res, next) => {
        const [[{ warehouse_exists }]] = await connection.execute(
            `SELECT EXISTS (
            SELECT 1
            FROM warehouses
            WHERE warehouse_name = ? AND location = ?
            ) AS warehouse_exists;`,
            [res.locals.data.name, res.locals.data.location],
        );
        if (!warehouse_exists) {
            res.status(406).json({ error: "warehouse does not exist." });
            return;
        }

        next()

    }

    return routine;
};

const assertWarehouseDoesNotExistsRoutine = (connection) => {
    const routine = async (req, res, next) => {
        const [[{ warehouse_exists }]] = await connection.execute(
            `SELECT EXISTS (
            SELECT 1
            FROM warehouses
            WHERE warehouse_name = ? AND location = ?
            ) AS warehouse_exists;`,
            [res.locals.data.name, res.locals.data.location],
        );
        if (warehouse_exists) {
            res.status(406).json({ error: "warehouse already exists." });
            return;
        }

        next()

    }

    return routine;
}

const warehouseRouter = (connection) => {
    const router = express.Router();

    router.post(
        "/new",
        [
            body("name").notEmpty().isString().trim(),
            body("location").notEmpty().isString().trim(),
        ],
        [
            validationStrictRoutine(400, "Ensure name and location is given."),
            extractMatchedRoutine,
            assertWarehouseDoesNotExistsRoutine(connection),
            async (req, res) => {
                const { name, location } = res.locals.data;

                await Promise.all([
                    connection.execute(`INSERT INTO warehouses (warehouse_name, location) VALUES (?, ?);`, [name, location]),
                    connection.execute(`SET @last_whID = LAST_INSERT_ID();`)
                ]);

                await connection.execute(`INSERT INTO inventories (item_code, warehouse_id)
		                                    SELECT item_code, @last_whID
                                    		FROM items;`);

                res.status(200).json({ message: "successfully added new warehouse." });
            }
        ]
    )

    router.put(
        "/modify",
        [
            body("name").notEmpty().isString().trim(),
            body("location").notEmpty().isString().trim(),
            body("id").isNumeric()
        ],
        extractMatchedRoutine,
        assertWarehouseExistsRoutine(connection),
        validationStrictRoutine(400, "ensure name and location are text and id is numeric."),
        async (req, res) => {
            const { name, location, id } = res.locals.data;

            await connection.execute(
                `UPDATE warehouses SET warehouse_name = '?', location = '?' WHERE warehouse_id = '?';`,
                [name, location, id]
            )

            res.status(200).json({ message: "successfully updated warehouse." });
        }
    )

    router.get(
        "/view",
        [query("name").notEmpty().isString().trim().optional()],
        validationStrictRoutine(400, "name must be a string."),
        async (req, res, next) => {
            const { name } = matchedData(req);
            if (name == undefined) {
                next('route');
                return;
            }

            const [results] = await connection.execute(
                "SELECT warehouse_name, location FROM warehouses WHERE warehouse_name LIKE ? ",
                [`%${name}%`]
            )
            res.status(200).json(results)
        }
    )

    router.get(
        "/view",
        [query("location").notEmpty().isString().trim().optional()],
        validationStrictRoutine(400, "location must be a string."),
        async (req, res, next) => {
            const { location } = matchedData(req);
            if (location == undefined) {
                next('route');
                return;
            }
            console.log("QUERIYING LOCATION", `%${location}%`);
            const [results] = await connection.execute(
                "SELECT warehouse_name, location warehouses FROM warehouses WHERE location LIKE ?;",
                [`%${location}%`]
            )
            res.status(200).json(results)
        }
    )

    router.get(
        "/view",
        [query("status").isBoolean().optional()],
        validationStrictRoutine(400, "status must be a boolean ('true' or 'false')"),
        async (req, res, next) => {
            console.log("status");
            const { status } = matchedData(req);
            if (status == undefined) {
                next();
                return;
            }
            const [results] = await connection.execute(
                "SELECT warehouse_name, location FROM warehouses WHERE archived = ?",
                [status == 'true']
            )
            res.status(200).json(results)
        }
    )

    router.get(
        "/view",
        async (req, res) => {
            console.log("all");
            const [results] = await connection.execute(
                `SELECT warehouse_name, location FROM warehouses WHERE archived = false;`
            )
            res.status(200).json(results);
        }
    )




    return router;
}

export default warehouseRouter;