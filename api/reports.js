import express from "express";
import { matchedData, query, body } from "express-validator";
import { assertDefined, validationStrictRoutine } from "./helper.js";

const reportRouter = (connection) => {
    const router = express.Router();

    // Report: Comparing 2 Warehouses
    router.get('/compare-warehouses',
        [
            query("warehouse1_id").isNumeric().notEmpty(),
            query("warehouse2_id").isNumeric().notEmpty()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { warehouse1_id, warehouse2_id } = matchedData(req);
            const [results] = await connection.execute(`SELECT i.item_code, i.item_desc, SUM(i1.quantity) AS warehouse1, SUM(i2.quantity) AS warehouse2
                FROM inventories i1
                JOIN inventories i2 ON i1.item_code = i2.item_code AND i1.warehouse_id != i2.warehouse_id
                JOIN warehouses w1 ON i1.warehouse_id = w1.warehouse_id
                JOIN warehouses w2 ON i2.warehouse_id = w2.warehouse_id
                JOIN items i ON i1.item_code = i.item_code
                WHERE i1.warehouse_id = ? AND i2.warehouse_id = ?
                GROUP BY i1.warehouse_id, i2.warehouse_id, i1.item_code
                ORDER BY warehouse1 DESC, warehouse2 DESC, i1.item_code;`,
                [warehouse1_id, warehouse2_id]
            );
            res.status(200).json(results);
        }
    );

    // Report: Total Items Produced in All Warehouses
    router.get('/total-produced',
        [query("ndays").isNumeric().notEmpty()],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { ndays } = matchedData(req);
            const [results] = await connection.execute(`SELECT w.warehouse_name, w.location,
                (SELECT SUM(p.qty_produced)
                 FROM productions p
                 WHERE p.warehouse_id = w.warehouse_id AND p.date_produced BETWEEN (CURDATE() - INTERVAL ? DAY) AND CURDATE()
                ) AS Total_Produced_Past_30_Days
                FROM warehouses w
                ORDER BY w.warehouse_id;`,
                [ndays]
            );
            res.status(200).json(results);
        }
    );

    // Report: Number of Requests from Past n Days
    router.get('/requests-report',
        [query("ndays").isNumeric().notEmpty()],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { ndays } = matchedData(req);
            const [results] = await connection.execute(`SELECT warehouse_name, location,
                IF(reqs_received IS NULL, 0, reqs_received) AS reqs_received,
                IF(reqs_sent IS NULL, 0, reqs_sent) AS reqs_sent
                FROM warehouses w
                LEFT JOIN (SELECT warehouse_id, COUNT(*) AS reqs_received
                           FROM requests r
                           JOIN warehouses w ON warehouse_to_id = warehouse_id
                           WHERE date_requested BETWEEN (CURDATE() - INTERVAL ? DAY) AND CURDATE()
                           GROUP BY warehouse_to_id) AS received
                ON received.warehouse_id = w.warehouse_id
                LEFT JOIN (SELECT warehouse_id, COUNT(*) AS reqs_sent
                           FROM requests r
                           JOIN warehouses w ON warehouse_from_id = warehouse_id
                           WHERE date_requested BETWEEN (CURDATE() - INTERVAL ? DAY) AND CURDATE()
                           GROUP BY warehouse_from_id) AS delivered
                ON delivered.warehouse_id = w.warehouse_id
                ORDER BY w.warehouse_id DESC;`,
                [ndays, ndays]
            );
            res.status(200).json(results);
        }
    );

    // Report: Number of Transfers from Past n Days
    router.get('/transfers-report',
        [query("ndays").isNumeric().notEmpty()],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { ndays } = matchedData(req);
            const [results] = await connection.execute(`SELECT warehouse_name, location,
                IF(transfers_out IS NULL, 0, transfers_out) AS transfers_out,
                IF(transfers_in IS NULL, 0, transfers_in) AS transfers_in
                FROM warehouses w
                LEFT JOIN (SELECT warehouse_id, COUNT(*) AS transfers_in
                           FROM transfers t
                           JOIN requests r ON t.request_id = r.request_id
                           JOIN warehouses w ON warehouse_to_id = warehouse_id
                           WHERE date_transferred BETWEEN (CURDATE() - INTERVAL ? DAY) AND CURDATE()
                           GROUP BY warehouse_to_id) AS received
                ON received.warehouse_id = w.warehouse_id
                LEFT JOIN (SELECT warehouse_id, COUNT(*) AS transfers_out
                           FROM transfers t
                           JOIN requests r ON t.request_id = r.request_id
                           JOIN warehouses w ON warehouse_from_id = warehouse_id
                           WHERE date_transferred BETWEEN (CURDATE() - INTERVAL ? DAY) AND CURDATE()
                           GROUP BY warehouse_from_id) AS delivered
                ON delivered.warehouse_id = w.warehouse_id
                ORDER BY w.warehouse_id DESC;`,
                [ndays, ndays]
            );
            res.status(200).json(results);
        }
    );

    // Report: Adjustments from Past n Days
    router.get('/adjustments-report',
        [query("ndays").isNumeric().notEmpty()],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { ndays } = matchedData(req);
            const [results] = await connection.execute(`SELECT w.warehouse_name, w.location, COUNT(qty_adjusted) AS times_adjusted, SUM(ABS(a.qty_adjusted)) AS total_adjusted
                FROM adjustments a
                JOIN warehouses w ON w.warehouse_id = a.warehouse_id
                WHERE DATE(time_log) BETWEEN (CURDATE() - INTERVAL ? DAY) AND CURDATE()
                GROUP BY a.warehouse_id;`,
                [ndays]
            );
            res.status(200).json(results);
        }
    );

    return router;
};

export default reportRouter;
