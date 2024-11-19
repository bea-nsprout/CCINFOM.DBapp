import express from "express";
import { body, matchedData, query, validationResult } from "express-validator";

const itemExistsRoutine = async (item_code, connection) => {
  const [[{ item_exists }]] = await connection.execute(
    `SELECT EXISTS (SELECT 1 FROM item_masterlist items WHERE items.item_code = ?) AS item_exists;`,
    [item_code],
  );
  return item_exists;
};
const inventory = (cors, connection) => {
  const routeRoot = "/api/item-masterlist/";
  const router = express.Router();

  router.get(
    routeRoot + "all",
    query("archived").optional().isBoolean(),
    cors(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            errors: errors.array(),
            description:
              "Invalid value for archived, must be 'true' or 'false'.",
          });
      }
      try {
        const { archived } = matchedData(req);
        let sqlQuery = "SELECT * FROM item_masterlist";

        if (archived !== undefined) {
          sqlQuery += " WHERE archived = ?";
        }

        const [results] = await connection.execute(
          sqlQuery,
          archived !== undefined ? [archived] : [],
        );

        res.status(200).json(results);
      } catch (error) {
        console.error("Error querying database:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
  );

  router.post(
    routeRoot + "insert",
    [
      body("item_code").notEmpty().isString().isAlphanumeric().trim(),
      body("item_desc").notEmpty().isString().isAlphanumeric().trim(),
      body("unit").notEmpty().isString().isAlphanumeric().trim(),
    ],
    cors(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(400)
          .json({
            errors: errors.array(),
            description:
              "ensure item_code, item_desc, and unit are all alphanumeric and defined.",
          });
        return;
      }
      try {
        const { item_code, item_desc, unit } = matchedData(req);

        const item_exists = await itemExistsRoutine(item_code, connection);
        if (item_exists) {
          res.status(406).json({ error: "item already exists." });
          return;
        }

        await connection.execute(
          "INSERT INTO item_masterlist (item_code, item_desc, unit) VALUES (?, ?, ?);",
          [item_code, item_desc, unit],
        );

        await connection.execute(
          `INSERT INTO warehouse_inventory (item_code, warehouse_id) SELECT ?, warehouse_id FROM warehouse;`,
          [item_code],
        );

        res.status(200).send({ message: "successfully added " + item_code });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
  );

  router.delete(
    routeRoot + "delete",
    [body("item_code").notEmpty().isString().isAlphanumeric().trim()],
    cors(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(400)
          .json({
            errors: errors.array(),
            description: "ensure item_code is alphanumeric and defined.",
          });
        return;
      }

      try {
        const { item_code } = matchedData(req);

        const item_exists = await itemExistsRoutine(item_code, connection);
        if (!item_exists) {
          res.status(406).json({ error: "item does not exists." });
          return;
        }

        const [[{ no_existing_item }]] = await connection.execute(
          `SELECT NOT EXISTS ( SELECT 1 FROM warehouse_inventory WHERE item_code = ? AND quantity > 0) AS no_existing_item;`,
          [item_code],
        );
        if (!no_existing_item) {
          res
            .status(409)
            .json({
              error:
                "currently a warehouse holds a quantity of that item. Please empty the warehouse and try again.",
            });
          return;
        }

        await connection.execute(
          `DELETE FROM warehouse_inventory WHERE item_code = ?`,
          [item_code],
        );
        await connection.execute(
          `DELETE FROM item_masterlist WHERE item_code = ?`,
          [item_code],
        );

        res.status(200).json({ response: "successfully deleted " + item_code });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
  );

  return router;
};

export default inventory;
