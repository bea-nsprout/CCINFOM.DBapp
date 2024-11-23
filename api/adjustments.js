import express from "express";
import { matchedData, query, body } from "express-validator";
import { assertDefined, validationStrictRoutine } from "./helper.js";

const adjustmentRouter = (connection) => {
    const router = express.Router();

    // Modify an existing adjustment record
    router.put('/modify',
        [
            body("time_log").isString().notEmpty(),
            body("new_qty").isNumeric().notEmpty()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { time_log, new_qty } = matchedData(req);
            const [rows] = await connection.execute(`SELECT qty_adjusted, item_code, warehouse_id FROM adjustments WHERE time_log = ?;`,
                [time_log]
            );
            const { qty_adjusted: old_qty, item_code, warehouse_id } = rows[0];
            await connection.execute(`UPDATE adjustments SET qty_adjusted = ? WHERE time_log = ?;`,
                [new_qty, time_log]
            );
            await connection.execute(`UPDATE inventories SET quantity = quantity - ? + ? WHERE item_code = ? AND warehouse_id = ?;`,
                [old_qty, new_qty, item_code, warehouse_id]
            );
            res.status(200).json({ success: true });
        }
    );

    // Delete an existing adjustment record
    router.delete('/delete',
        [body("time_log").isString().notEmpty()],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { time_log } = matchedData(req);
            const [rows] = await connection.execute(`SELECT qty_adjusted, item_code, warehouse_id FROM adjustments WHERE time_log = ?;`,
                [time_log]
            );
            const { qty_adjusted, item_code, warehouse_id } = rows[0];
            await connection.execute(`DELETE FROM adjustments WHERE time_log = ?;`,
                [time_log]
            );
            await connection.execute(`UPDATE inventories SET quantity = quantity - ? WHERE item_code = ? AND warehouse_id = ?;`,
                [qty_adjusted, item_code, warehouse_id]
            );
            res.status(200).json({ success: true });
        }
    );

    // View all adjustment records
    router.get('/view',
        async (req, res) => {
            const [results] = await connection.execute(`SELECT time_log, warehouse_name, item_code, qty_adjusted
                FROM adjustments a
                JOIN warehouses w ON w.warehouse_id = a.warehouse_id;`
            );
            res.status(200).json(results);
        }
    );

    // View adjustment records with filters
    router.get('/view',
        [
            query("start_date").isString().optional(),
            query("end_date").isString().optional(),
            query("item_code").isString().optional(),
            query("warehouse_name").isString().optional()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { start_date, end_date, item_code, warehouse_name } = matchedData(req);
            let query = `SELECT time_log, warehouse_name, item_code, qty_adjusted
                FROM adjustments a
                JOIN warehouses w ON w.warehouse_id = a.warehouse_id
                WHERE 1=1`;
            const params = [];

            if (start_date && end_date) {
                query += ` AND DATE(time_log) BETWEEN ? AND ?`;
                params.push(start_date, end_date);
            }
            if (item_code) {
                query += ` AND item_code LIKE ?`;
                params.push(`%${item_code}%`);
            }
            if (warehouse_name) {
                query += ` AND warehouse_name LIKE ?`;
                params.push(`%${warehouse_name}%`);
            }
            const [results] = await connection.execute(query, params);
            res.status(200).json(results);
        }
    );

    return router;
};

export default adjustmentRouter;
