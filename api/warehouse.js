import express from "express";
import { body } from "express-validator";
import { validationStrictRoutine, extractMatchedRoutine } from "./helper.js";


const warehouseRouter = (cors, connection) => {
    const routeRoot = "/api/warehouses/";
    const router = express.Router();

    router.post(
        routeRoot + "new",
        [
            body("name").notEmpty().isString().trim(),
            body("location").notEmpty().isString().trim(),
        ],
        cors(),
        [
            validationStrictRoutine(400, "Ensure name and location is given."),
            extractMatchedRoutine,
            async (req, res) => {
                const { name, location } = res.locals.data;

                const [warehouse_exists] = await connection.execute(`SELECT EXISTS (
                                                SELECT 1
                                                FROM warehouses
                                                WHERE warehouse_name = ? AND location = ?
                                            ) AS warehouse_exists;`,
                    [name, location]);

                if (warehouse_exists) {
                    res.status(409).json({ error: "that warehouse already exists." });
                    return;
                }

                await Promise.all([
                    connection.execute(`INSERT INTO warehouses (warehouse_name, location) VALUES (@new_wh_name, @new_wh_loc);`),
                    connection.execute(`SET @last_whID = LAST_INSERT_ID();`)
                ]);

                await connection.execute(`INSERT INTO inventories (item_code, warehouse_id)
		                                    SELECT item_code, @last_whID
                                    		FROM items;`);

                res.status(200).json({ message: "successfully added new warehouse." });
            }
        ]

    )

    router.get(
        routeRoot + "test",
        cors(),
        async (req, res) => {

            await connection.execute(
                `SET @warehouse_id = ?`,
                [5]
            );

            const [results] = await connection.execute(
                `SELECT NOT EXISTS ( SELECT 1 FROM inventories WHERE warehouse_id = @warehouse_id AND quantity > 0 )
                AND NOT EXISTS ( SELECT 1 FROM requests WHERE warehouse_from_id = @warehouse_id OR warehouse_to_id = @warehouse_id )
                AND NOT EXISTS ( SELECT 1 FROM productions WHERE warehouse_id = @warehouse_id )
                AND NOT EXISTS ( SELECT 1 FROM trucks WHERE warehouse_id = @warehouse_id ) AS no_existing_item;`
            )

            res.send(results);
            /*
            
                warehouseid to check for deletion;
    
	
            */
        }
    )

    return router;
}

export default warehouseRouter;