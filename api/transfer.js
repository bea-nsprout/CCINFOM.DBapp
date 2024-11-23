import express from "express";
import { matchedData, query, body } from "express-validator";
import { assertDefined, validationStrictRoutine } from "./helper.js";

const transferRouter = (connection) => {
    const router = express.Router();

    // Create a new transfer record
    router.post('/new',
        [
            body("request_id").isNumeric().notEmpty(),
            body("personnel_id").isNumeric().notEmpty(),
            body("truck_id").isString().notEmpty(),
            body("quantity").isNumeric().notEmpty()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { request_id, personnel_id, truck_id, quantity } = matchedData(req);
            await connection.execute(`INSERT INTO transfers (request_id, personnel_id, date_transferred, truck_id, quantity) VALUES (?, ?, CURDATE(), ?, ?);`,
                [request_id, personnel_id, truck_id, quantity]
            );
            await connection.execute(`UPDATE requests SET qty_balance = qty_balance - ? WHERE request_id = ? AND qty_balance >= ?;`,
                [quantity, request_id, quantity]
            );
            await connection.execute(`UPDATE inventories wi
                JOIN requests r ON wi.item_code = r.item_code
                SET wi.quantity = wi.quantity - ?
                WHERE wi.warehouse_id = r.warehouse_from_id AND r.request_id = ? AND wi.quantity >= ?;`,
                [quantity, request_id, quantity]
            );
            res.status(200).json({ success: true });
        }
    );

    // Modify an existing transfer record
    router.put('/modify',
        [
            body("transfer_id").isNumeric().notEmpty(),
            body("new_qty").isNumeric().notEmpty()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { transfer_id, new_qty } = matchedData(req);
            const [rows] = await connection.execute(`SELECT quantity, request_id, item_code, warehouse_to_id, warehouse_from_id FROM transfers t
                JOIN requests r ON r.request_id = t.request_id
                WHERE transfer_id = ?;`,
                [transfer_id]
            );
            const { quantity: old_qty, request_id, item_code, warehouse_to_id, warehouse_from_id } = rows[0];
            const add = new_qty - old_qty;
            await connection.execute(`UPDATE transfers SET quantity = ? WHERE transfer_id = ?;`,
                [new_qty, transfer_id]
            );
            await connection.execute(`UPDATE requests SET qty_balance = qty_balance - ? WHERE request_id = ?;`,
                [add, request_id]
            );
            await connection.execute(`UPDATE inventories SET quantity = quantity + ? WHERE item_code = ? AND warehouse_id = ?;`,
                [add, item_code, warehouse_to_id]
            );
            await connection.execute(`UPDATE inventories SET quantity = quantity - ? WHERE item_code = ? AND warehouse_id = ?;`,
                [add, item_code, warehouse_from_id]
            );
            res.status(200).json({ success: true });
        }
    );

    // Delete an existing transfer record
    router.delete('/delete',
        [body("transfer_id").isNumeric().notEmpty()],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { transfer_id } = matchedData(req);
            const [rows] = await connection.execute(`SELECT quantity, request_id, item_code, warehouse_to_id, warehouse_from_id FROM transfers t
                JOIN requests r ON r.request_id = t.request_id
                WHERE transfer_id = ?;`,
                [transfer_id]
            );
            const { quantity, request_id, item_code, warehouse_to_id, warehouse_from_id } = rows[0];
            await connection.execute(`UPDATE inventories SET quantity = quantity + ? WHERE item_code = ? AND warehouse_id = ?;`,
                [quantity, item_code, warehouse_from_id]
            );
            await connection.execute(`UPDATE requests SET qty_balance = qty_balance + ? WHERE request_id = ?;`,
                [quantity, request_id]
            );
            await connection.execute(`DELETE FROM transfers WHERE transfer_id = ?;`,
                [transfer_id]
            );
            res.status(200).json({ success: true });
        }
    );

    // View all transfer records
    router.get('/view',
        async (req, res) => {
            const [results] = await connection.execute(`SELECT t.transfer_id, r.item_code, t.quantity, r.warehouse_from_id, r.warehouse_to_id, t.date_transferred, IF(t.quantity > 0, 'PENDING', 'COMPLETED') AS status
                FROM transfers t
                JOIN requests r ON t.request_id = r.request_id
                ORDER BY t.transfer_id DESC;`
            );
            res.status(200).json(results);
        }
    );

    // View transfer records with filters
    router.get('/view',
        [
            query("date_transferred").isString().optional(),
            query("item_code").isString().optional(),
            query("status").isString().optional(),
            query("warehouse_from_id").isNumeric().optional(),
            query("warehouse_to_id").isNumeric().optional()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { date_transferred, item_code, status, warehouse_from_id, warehouse_to_id } = matchedData(req);
            let query = `SELECT t.transfer_id, r.item_code, t.quantity, r.warehouse_from_id, r.warehouse_to_id, t.date_transferred, IF(t.quantity > 0, 'PENDING', 'COMPLETED') AS status
                FROM transfers t
                JOIN requests r ON t.request_id = r.request_id
                WHERE 1=1`;
            const params = [];

            if (date_transferred) {
                query += ` AND t.date_transferred BETWEEN ? AND ?`;
                params.push(date_transferred);
            }
            if (item_code) {
                query += ` AND r.item_code LIKE ?`;
                params.push(`%${item_code}%`);
            }
            if (status) {
                query += ` AND IF(t.quantity > 0, 'PENDING', 'COMPLETED') = ?`;
                params.push(status);
            }
            if (warehouse_from_id) {
                query += ` AND r.warehouse_from_id = ?`;
                params.push(warehouse_from_id);
            }
            if (warehouse_to_id) {
                query += ` AND r.warehouse_to_id = ?`;
                params.push(warehouse_to_id);
            }
            query += ` ORDER BY t.transfer_id DESC`;

            const [results] = await connection.execute(query, params);
            res.status(200).json(results);
        }
    );

    return router;
};

export default transferRouter;
