const express = require("express");
const {
  createProduct,
  fetchProduct,
  fetchProductById,
  updateProductById,
} = require("../controllers/ProductController");

// router object
const router = express.Router();
// routes
router.post("/", createProduct);
router.get("/", fetchProduct);
router.get("/:id", fetchProductById);
router.patch("/update-product/:id", updateProductById);
module.exports = router;
