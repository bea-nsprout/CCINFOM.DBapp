import express from "express";
import { matchedData, query, body } from "express-validator";
import { assertDefined, validationStrictRoutine } from "./helper.js";

const inventoryRouter = (connection) => {
    const router = express.Router();

    // Modify inventory quantity
    router.put('/modify',
        [
            body("item_code").isString().notEmpty(),
            body("warehouse_id").isNumeric().notEmpty(),
            body("qty_new").isNumeric().notEmpty()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { item_code, warehouse_id, qty_new } = matchedData(req);
            const [rows] = await connection.execute(`SELECT quantity FROM inventories WHERE item_code = ? AND warehouse_id = ?;`,
                [item_code, warehouse_id]
            );
            const { quantity: qty_current } = rows[0];
            const qty_diff = qty_new - qty_current;
            await connection.execute(`UPDATE inventories SET quantity = ? WHERE item_code = ? AND warehouse_id = ?;`,
                [qty_new, item_code, warehouse_id]
            );
            await connection.execute(`INSERT INTO adjustments (time_log, item_code, warehouse_id, qty_adjusted) VALUES (NOW(), ?, ?, ?);`,
                [item_code, warehouse_id, qty_diff]
            );
            res.status(200).json({ success: true });
        }
    );

    // View all nonzero items in warehouse
    router.get('/view/nonzero',
        async (req, res) => {
            const [results] = await connection.execute(`SELECT * FROM inventories WHERE quantity > 0;`);
            res.status(200).json(results);
        }
    );

    // View inventory records with filters
    router.get('/view',
        [
            query("item_code").isString().optional(),
            query("warehouse_name").isString().optional(),
            query("quantity_gt_zero").isBoolean().optional()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { item_code, warehouse_name, quantity_gt_zero } = matchedData(req);
            let query = `SELECT inv.item_code, item_desc, quantity, unit, w.warehouse_name, w.warehouse_id
                FROM inventories inv
                JOIN items i ON inv.item_code = i.item_code
                JOIN warehouses w ON inv.warehouse_id = w.warehouse_id
                WHERE 1=1`;
            const params = [];

            if (item_code) {
                query += ` AND inv.item_code LIKE ?`;
                params.push(`%${item_code}%`);
            }
            if (warehouse_name) {
                query += ` AND w.warehouse_name LIKE ?`;
                params.push(`%${warehouse_name}%`);
            }
            if (quantity_gt_zero) {
                query += ` AND inv.quantity > 0`;
            }
            query += ` ORDER BY inv.item_code`;

            const [results] = await connection.execute(query, params);
            res.status(200).json(results);
        }
    );

    return router;
};

export default inventoryRouter;
