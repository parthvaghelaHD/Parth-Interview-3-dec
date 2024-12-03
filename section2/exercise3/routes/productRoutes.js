const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// defining the routes
router.get("/", productController.getAllProducts);
router.post("/", productController.getAllProducts);
router.put("/:id", productController.getAllProducts);
router.delete("/:id", productController.getAllProducts);

module.exports = router;