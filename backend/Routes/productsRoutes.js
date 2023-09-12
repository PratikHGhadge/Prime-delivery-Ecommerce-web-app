const express = require("express");
const {
  createProduct,
  fetchProduct,
} = require("../controllers/ProductController");

// router object
const router = express.Router();
// routes
router.post("/create-product", createProduct);
router.get("/fetch-products", fetchProduct);

module.exports = router;
