require('dotenv').config();
const sql = require('mysql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_USER,
    server: process.env.DB_USER,
    database: process.env.DB_USER,
}

const connectionDB = async () => {
    try{
        const pool = await new sql.connect(dbConfig);
        console.log("connection is established");
        return pool;
    }
    catch(err) {
        console.log("database connection error", err);
        throw err;
    }
}

module.exports = { connectionDB, sql}