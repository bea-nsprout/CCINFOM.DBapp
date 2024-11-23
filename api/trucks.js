import express from "express";
import { matchedData, query, body } from "express-validator";
import { assertDefined, validationStrictRoutine } from "./helper.js";

const trucksHandler = (connection) => {
    const router = express.Router();

    router.get('/view',
        [query("status").isBoolean().optional()],
        assertDefined("status"),
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { status } = matchedData(req);
            const [results] = await connection.execute(
                `SELECT truck_id, warehouse_name FROM trucks tr
                JOIN warehouses w on w.warehouse_id = tr.warehouse_id
                WHERE tr.archived = ?`,
                [status == 'true']
            )
            res.status(200).json(results);
        }
    )

    router.get('/view',
        [query("warehouse").isString().notEmpty().optional()],
        assertDefined("warehouse"),
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { warehouse } = matchedData(req);
            const [results] = await connection.execute(
                `SELECT truck_id, warehouse_name
	            FROM trucks tr
	            JOIN warehouses w on w.warehouse_id = tr.warehouse_id
	            WHERE warehouse_name LIKE ?`,
                [`%${warehouse}%`]
            )
            res.status(200).json(results);
        }
    )

    router.get('/view',
        [query("platenumber").isString().notEmpty().optional()],
        assertDefined("platenumber"),
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { platenumber } = matchedData(req);
            console.log(platenumber);

            const [results] = await connection.execute(
                `SELECT truck_id, warehouse_name FROM trucks tr JOIN warehouses w on w.warehouse_id = tr.warehouse_id WHERE truck_id LIKE ?;`,
                [`%${platenumber}%`]
            )
            res.status(200).json(results);
        }
    )

    router.get('/view',
        async (req, res) => {
            const [results] = await connection.execute(
                `SELECT truck_id, warehouse_name FROM trucks tr JOIN warehouses w on w.warehouse_id = tr.warehouse_id;`
            )
            res.status(200).json(results);
        }
    )

    router.post('/delete',
        [body("id").isString().notEmpty().optional()],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { id } = matchedData(req);
            await connection.execute(`DELETE FROM trucks WHERE truck_id = ?`, [id]);
            res.status(200).json({ success: true });
        }
    )

    router.put('/modify',
        [body("truckid").isString().notEmpty().optional(),
        body("warehouseid").isString().notEmpty().optional(),
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { truckid, warehouseid } = matchedData(req);
            await connection.execute(`UPDATE trucks SET warehouse_id = ? WHERE truck_id = ?;`, [truckid, warehouseid]);
            res.status(200).json({ success: true });
        }
    )

    router.post('/new',
        [
            body("truckid").isString().notEmpty().optional(),
            body("warehouseid").isString().notEmpty().optional()

        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { truckid, warehouseid } = matchedData(req);
            const [[{ truck_id_exists }]] = connection.execute(`SELECT EXISTS (
                                                                SELECT 1
                                                                FROM trucks t
                                                                WHERE t.truck_id = ?
                                                                ) AS truck_id_exists;`, [truckid]);
            if (truck_id_exists) {
                res.status(400).send("NO");
                return;
            }

            await connection.execute(`INSERT INTO trucks (truck_id, warehouse_id) VALUES (?, ?);`,
                [truckid, warehouseid]
            )

            res.status(200).json({ success: true });
        }


    )
    return router;
}

export default trucksHandler;