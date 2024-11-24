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
        [query("warehouse_id").isNumeric().notEmpty().optional()],
        assertDefined("warehouse_id"),
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { warehouse_id } = matchedData(req);
            const [results] = await connection.execute(
                `SELECT truck_id, warehouse_name
	            FROM trucks tr
	            JOIN warehouses w on w.warehouse_id = tr.warehouse_id
	            WHERE w.warehouse_id = ?`,
                [warehouse_id]
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
            try {
                await connection.execute(`DELETE FROM trucks WHERE truck_id = ?`, [id]);
            } catch (err) {
                console.log(err);
                res.status(400).json({ sucess: false, error: "cannot delete truck." });
                return;
            }
            res.status(200).json({ success: true, message: "successfully deleted truck." });
        }
    )

    router.post('/modify',
        [body("truck_id").isString().notEmpty().optional(),
        body("warehouse_id").isString().notEmpty().optional(),
        ],
        (req, res, next) => { console.log(matchedData(req)); next() },
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { truck_id, warehouse_id } = matchedData(req);
            await connection.execute(`UPDATE trucks SET warehouse_id = ? WHERE truck_id = ?;`, [warehouse_id, truck_id]);
            res.status(200).json({ success: true, message: "successfully changed truck location." });
        }
    )

    router.post('/new',
        [
            body("truck_id").isString().notEmpty().optional(),
            body("warehouse_id").isString().notEmpty().optional()

        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {

            const { truck_id, warehouse_id } = matchedData(req);
            const [[{ truck_id_exists }]] = await connection.execute(`SELECT EXISTS (
                                                                SELECT 1
                                                                FROM trucks t
                                                                WHERE t.truck_id = ?
                                                                ) AS truck_id_exists;`, [truck_id]);
            if (truck_id_exists) {
                res.status(400).json({ success: false, error: "truck id already exists." });
                return;
            }

            await connection.execute(`INSERT INTO trucks (truck_id, warehouse_id) VALUES (?, ?);`,
                [truck_id, warehouse_id]
            )

            res.status(200).json({ success: true, message: "successfully created new truck." });
        }


    )
    return router;
}

export default trucksHandler;