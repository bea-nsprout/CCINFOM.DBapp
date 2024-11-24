import express from "express";
import { matchedData, query, body } from "express-validator";
import { validationStrictRoutine } from "./helper.js";

const productionRouter = (connection) => {
    const router = express.Router();

    // Create a new production record
    router.post('/new',
        [
            body("item_code").isString().notEmpty(),
            body("date_produced").isString().optional(),
            body("qty_produced").isNumeric().notEmpty(),
            body("warehouse_id").isNumeric().notEmpty()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            try {
                const { item_code, date_produced, qty_produced, warehouse_id } = matchedData(req);

                // Use the date_produced if provided, otherwise default to CURDATE()
                const sql = `
                    INSERT INTO productions (item_code, date_produced, qty_produced, warehouse_id) 
                    VALUES (?, ?, ?, ?);
                `;
                const date = date_produced || null; // Use `null` for defaulting to CURDATE() in SQL

                await connection.execute(sql, [
                    item_code,
                    date || new Date().toISOString().slice(0, 10), // Fallback to today's date if no date_produced
                    qty_produced,
                    warehouse_id,
                ]);

                // Update the inventory
                await connection.execute(`
                    UPDATE inventories 
                    SET quantity = quantity + ? 
                    WHERE item_code = ? AND warehouse_id = ?;
                `, [qty_produced, item_code, warehouse_id]);

                res.status(200).json({ success: true });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: error.message });
            }
        }

    );

    // Modify an existing production record
    router.put('/modify',
        [
            body("production_id").isNumeric().notEmpty(),
            body("new_qty").isNumeric().notEmpty()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { production_id, new_qty } = matchedData(req);
            const [rows] = await connection.execute(`SELECT qty_produced, item_code, warehouse_id FROM productions WHERE production_id = ?;`,
                [production_id]
            );
            const { qty_produced: old_qty, item_code, warehouse_id } = rows[0];
            await connection.execute(`UPDATE productions SET qty_produced = ? WHERE production_id = ?;`,
                [new_qty, production_id]
            );
            await connection.execute(`UPDATE inventories SET quantity = quantity - ? + ? WHERE item_code = ? AND warehouse_id = ?;`,
                [old_qty, new_qty, item_code, warehouse_id]
            );
            res.status(200).json({ success: true });
        }
    );

    // Delete a production record
    router.delete('/delete',
        [body("production_id").isNumeric().notEmpty()],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { production_id } = matchedData(req);
            const [rows] = await connection.execute(`SELECT qty_produced, item_code, warehouse_id FROM productions WHERE production_id = ?;`,
                [production_id]
            );
            const { qty_produced, item_code, warehouse_id } = rows[0];
            await connection.execute(`DELETE FROM productions WHERE production_id = ?;`,
                [production_id]
            );
            await connection.execute(`UPDATE inventories SET quantity = quantity - ? WHERE item_code = ? AND warehouse_id = ?;`,
                [qty_produced, item_code, warehouse_id]
            );
            res.status(200).json({ success: true });
        }
    );

    // View all production records
    router.get('/view',
        async (req, res) => {
            const [results] = await connection.execute(`SELECT p.production_id, p.item_code, p.qty_produced, p.date_produced, w.warehouse_name
                FROM productions p
                JOIN warehouses w ON w.warehouse_id = p.warehouse_id
                ORDER BY p.production_id DESC;`
            );
            res.status(200).json(results);
        }
    );

    // View production records with filters
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
            let query = `SELECT p.production_id, p.item_code, p.qty_produced, p.date_produced, w.warehouse_name
                FROM productions p
                JOIN warehouses w ON w.warehouse_id = p.warehouse_id
                WHERE 1=1`;
            const params = [];

            if (start_date && end_date) {
                query += ` AND p.date_produced BETWEEN ? AND ?`;
                params.push(start_date, end_date);
            }
            if (item_code) {
                query += ` AND p.item_code LIKE ?`;
                params.push(`%${item_code}%`);
            }
            if (warehouse_name) {
                query += ` AND w.warehouse_name LIKE ?`;
                params.push(`%${warehouse_name}%`);
            }
            query += ` ORDER BY p.production_id DESC`;

            const [results] = await connection.execute(query, params);
            res.status(200).json(results);
        }
    );

    return router;
};

export default productionRouter;
