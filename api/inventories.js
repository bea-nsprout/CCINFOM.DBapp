import express from "express";

const inventoryRouter = (cors, connection) => {
    const routeRoot = "/api/inventories";
    const router = express.Router();

    router.get(
        routeRoot + '/view/all',
        cors(),
        async (req, res) => {
            const [results] = await connection.execute(
                `SELECT * FROM inventories;`
            )

            res.status(200).json(results);
        }
    )


    return router;


}

export default inventoryRouter;