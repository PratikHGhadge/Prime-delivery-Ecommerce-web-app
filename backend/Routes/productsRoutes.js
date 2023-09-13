const express = require("express");
const {
  createProduct,
  fetchProduct,
  fetchProductById,
} = require("../controllers/ProductController");

// router object
const router = express.Router();
// routes
router.post("/create-product", createProduct);
router.get("/fetch-products", fetchProduct);
router.get("/product-detail", fetchProductById);
module.exports = router;
