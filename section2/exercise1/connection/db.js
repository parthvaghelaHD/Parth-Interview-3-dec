require('dotenv').config();
const sql = require('mysql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_USER,
    server: process.env.DB_USER,
    database: process.env.DB_USER,
}

const pool = new sql.ConnectionPool(config);
const connectionDB = async () => {
    try{
        await pool.connect();
        console.log("connection is established");
    }
    catch(err) {
        console.log("database connection error", err)
    }
}

module.exports = { connectionDB, pool}