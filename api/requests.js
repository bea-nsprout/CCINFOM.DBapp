import express from "express";
import { matchedData, query, body } from "express-validator";
import { assertDefined, validationStrictRoutine } from "./helper.js";

const requestRouter = (connection) => {
    const router = express.Router();

    // Create a new request record
    router.post('/new',
        [
            body("personnel_id").isNumeric().notEmpty(),
            body("item_code").isString().notEmpty(),
            body("qty_balance").isNumeric().notEmpty(),
            body("qty_total").isNumeric().notEmpty(),
            body("warehouse_from_id").isNumeric().notEmpty(),
            body("warehouse_to_id").isNumeric().notEmpty()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { personnel_id, item_code, qty_balance, qty_total, warehouse_from_id, warehouse_to_id } = matchedData(req);
            await connection.execute(`INSERT INTO requests (personnel_id, date_requested, item_code, qty_balance, qty_total, warehouse_from_id, warehouse_to_id) VALUES (?, CURDATE(), ?, ?, ?, ?, ?);`,
                [personnel_id, item_code, qty_balance, qty_total, warehouse_from_id, warehouse_to_id]
            );
            res.status(200).json({ success: true });
        }
    );

    // Modify an existing request record
    router.put('/modify',
        [
            body("request_id").isNumeric().notEmpty(),
            body("new_qty_balance").isNumeric().notEmpty()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { request_id, new_qty_balance } = matchedData(req);
            await connection.execute(`UPDATE requests SET qty_balance = ? WHERE qty_total >= ? AND request_id = ?;`,
                [new_qty_balance, new_qty_balance, request_id]
            );
            res.status(200).json({ success: true });
        }
    );

    // Delete an existing request record
    router.delete('/delete',
        [body("request_id").isNumeric().notEmpty()],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { request_id } = matchedData(req);
            await connection.execute(`DELETE FROM requests WHERE request_id = ? AND qty_balance = 0;`,
                [request_id]
            );
            res.status(200).json({ success: true });
        }
    );

    // View all request records
    router.get('/view',
        async (req, res) => {
            const [results] = await connection.execute(`SELECT request_id, item_code, qty_balance, date_requested, warehouse_from_id, warehouse_to_id, IF(qty_balance > 0, 'PENDING', 'COMPLETED') AS status FROM requests ORDER BY request_id DESC;`);
            res.status(200).json(results);
        }
    );

    // View request records with filters
    router.get('/view',
        [
            query("date_requested").isString().optional(),
            query("item_code").isString().optional(),
            query("status").isString().optional(),
            query("warehouse_from_id").isNumeric().optional(),
            query("warehouse_to_id").isNumeric().optional()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { date_requested, item_code, status, warehouse_from_id, warehouse_to_id } = matchedData(req);
            let query = `SELECT request_id, item_code, qty_balance, date_requested, warehouse_from_id, warehouse_to_id, IF(qty_balance > 0, 'PENDING', 'COMPLETED') AS status FROM requests WHERE 1=1`;
            const params = [];

            if (date_requested) {
                query += ` AND date_requested = ?`;
                params.push(date_requested);
            }
            if (item_code) {
                query += ` AND item_code LIKE ?`;
                params.push(`%${item_code}%`);
            }
            if (status) {
                query += ` AND IF(qty_balance > 0, 'PENDING', 'COMPLETED') = ?`;
                params.push(status);
            }
            if (warehouse_from_id) {
                query += ` AND warehouse_from_id = ?`;
                params.push(warehouse_from_id);
            }
            if (warehouse_to_id) {
                query += ` AND warehouse_to_id = ?`;
                params.push(warehouse_to_id);
            }
            query += ` ORDER BY request_id DESC`;

            const [results] = await connection.execute(query, params);
            res.status(200).json(results);
        }
    );

    return router;
};

export default requestRouter;
