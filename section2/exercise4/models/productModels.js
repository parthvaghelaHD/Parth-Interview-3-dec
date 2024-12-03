const { sql, connectionDB } = require("../config/dbconfig");

const getAllProducts = async () => {
    const pool = await connectionDB();
    const result = await pool.request().query("SELECT * FROM Products");
    return result.recordset;
}

const createProduct = async (product) => {
    const { name, description, price} = product;
    const pool = await connectionDB();
    const result = await pool.request()
    .input("name", sql.VarChar(50), name)
    .input("description", sql.Text, description)
    .input("price", sql.Decimal(10,2), price)
    .query(`INSERT INTO Products (name, description, price) VALUES (@name, @description, @price`);
}


const updateProductById = async (id, product) => {
    const { name, description, price} = product;
    const pool = await connectionDB();
    const result = await pool.request()
    .input("id", sql.Int, id)
    .input("name", sql.VarChar(50), name)
    .input("description", sql.Text, description)
    .input("price", sql.Decimal(10,2), price)
    .query(`UPDATE Products SET name=@name, description=@description, price=@price where id=@id`);
    return result.rowsAffected[0];
}

const deleteProductById = async (id) => {
    const pool = await connectionDB();
    const result = await pool.request()
    .input("id", sql.Int, id)
    .query(`DELETE FROM Products where id=@id`);
    return result.rowsAffected[0];
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProductById,
    deleteProductById
}