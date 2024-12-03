require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: process.env.PORT 
};

const connectionDB = async () => {
    try {
        console.log("connection db is called")
        const pool = await new sql.connect(dbConfig);
        console.log("connection is established");
        return pool;
    }
    catch (err) {
        console.log("database connection error", err);
        throw err;
    }
}

module.exports = { connectionDB, sql }