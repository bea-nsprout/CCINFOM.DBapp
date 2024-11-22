import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

import inventoryRouter from "./api/items.js";
import warehouseRouter from "./api/warehouse.js";

dotenv.config();

const app = express();
const port = 3000;
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_DB_PASSWORD,
  database: 'warehousedb'
})


app.use(express.json());

app.use(inventoryRouter(cors, connection));
app.use(warehouseRouter(cors, connection));

app.use((err, req, res, next) => {
  console.log(err);
  res.code(500).json({ error: "internal server error." });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = app;
