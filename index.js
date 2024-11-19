import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

import inventoryRouter from "./api/inventory.js";

dotenv.config();

const app = express();
const port = 3000;
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_DB_PASSWORD,
  database: "warehousedb",
});

// nerd shit
app.use(function (req, res, next) {
  res.set("X-Clacks-Overhead", "GNU Terry Pratchet");
  next();
});


app.use(express.json());

app.use(inventoryRouter(cors, connection));

app.use((err, req, res, next) => {
  console.log(err);
  res.code(500).json({ error: "internal server error." });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = app;
