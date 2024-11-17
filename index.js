
import express from "express";
import mysql from "mysql2/promise";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_DB_PASSWORD,
    database: 'warehousedb'
})

// app.use(express.static('public'));

app.get("/api/test", cors(), async (req, res) => {
    const [results, fields] = await connection.query('SELECT * FROM item_masterlist')
    console.log(results)
    res.send(results)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// module.exports = app;