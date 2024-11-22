import express from "express";
import { body, matchedData, query, validationResult } from "express-validator";


const warehouse = (cors, connection) => {
    const routeRoot = "/api/warehouses/";
    const router = express.Router();

    router.get(
        routeRoot + "all",

    )

    return router;
}

export default warehouse;