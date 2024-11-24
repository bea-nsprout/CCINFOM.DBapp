import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

import itemsRouter from "./api/items.js";
import warehouseRouter from "./api/warehouse.js";
import inventoryRouter from "./api/inventories.js";
import trucksHandler from "./api/trucks.js";
import personnelRouter from "./api/personnel.js";
import requestRouter from "./api/requests.js";
import transferRouter from "./api/transfer.js";
import productionRouter from "./api/production.js";
import adjustmentRouter from "./api/adjustments.js";
import reportRouter from "./api/reports.js";

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
app.use(cors());

app.use('/api/items', itemsRouter(connection));
app.use('/api/warehouses', warehouseRouter(connection));
app.use('/api/inventories', inventoryRouter(connection));
app.use('/api/trucks', trucksHandler(connection));
app.use('/api/personnel', personnelRouter(connection));
app.use('/api/requests', requestRouter(connection));
app.use('/api/transfers', transferRouter(connection));
app.use('/api/productions', productionRouter(connection));
app.use('/api/adjustments', adjustmentRouter(connection));
app.use('/api/reports', reportRouter(connection));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: "internal server error." });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = app;
