import express from "express";
import { validationStrictRoutine } from "./helper.js";
import { query } from "express-validator";

const inventoryRouter = (connection) => {
    const router = express.Router();

    router.get(
        '/view/all',
        async (req, res) => {
            const [results] = await connection.execute(
                `SELECT inv.item_code, item_desc, quantity, unit, w.warehouse_name
        FROM inventories inv
        JOIN items i ON inv.item_code = i.item_code
        JOIN warehouses w ON inv.warehouse_id = w.warehouse_id
        ORDER BY inv.warehouse_id;`
            )

            res.status(200).json(results);
        }
    )

    // router.get(
    //     routeRoot + '/view/byItem',
    //     cors(),
    //     query("item-code"),
    //     [
    //     validationStrictRoutine(400, "item-code must be provided"),
    //     async (req, res) => {
    //         const {}

    //         const [results] = await connection.execute(
    //             `SELECT inv.item_code, item_desc, quantity, unit, w.warehouse_name
    //     FROM inventories inv
    //     JOIN items i ON inv.item_code = i.item_code
    //     JOIN warehouses w ON inv.warehouse_id = w.warehouse_id
    //     WHERE inv.item_code LIKE '%137%'
    //     ORDER BY inv.item_code;`
    //         )

    //         res.status(200).json(results);
    //     }
    //     ]
    // )


    return router;


}

export default inventoryRouter;