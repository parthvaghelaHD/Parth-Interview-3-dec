const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.getAllProducts);
router.post("/", productController.getAllProducts);
router.put("/:id", productController.getAllProducts);
router.delete("/:id", productController.getAllProducts);

router.post(":id/pdf", productController.generateProductPDF);
router.post("/pdf/merge", productController.mergeProductPDFS);
router.post(":id/email", productController.sendProductPDFEmail);

module.exports = router;