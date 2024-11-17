
const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_DB_PASSWORD,
    database: 'warehousedb'
})

connection.connect()

connection.query('SELECT * FROM item_masterlist', (err, rows, fields) => {
    // console.log(rows);
})


app.use(express.static('public'));

app.get("api/test", (req, res) => {

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;