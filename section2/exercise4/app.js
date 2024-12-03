const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use("/products", productRoutes);

//server
const PORT = 3000;
app.listen(PORT, ()=> {
    console.log("server running on 3000")
})