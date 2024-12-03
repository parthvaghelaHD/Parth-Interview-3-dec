const express = require("express");
const productRoutes = require("./routes/productRoutes");
const { connectionDB } = require("./config/dbconfig");

const app = express();
app.use("/api/products", productRoutes);

connectionDB();

//server
const PORT = 3000;
app.listen(PORT, () => {
    console.log("server running on 3000")
})