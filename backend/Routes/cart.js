const express = require("express");
const {
  addToCart,
  fetchCartByUser,
  deleteFromCart,
  updateCart,
} = require("../controllers/cartController");

// router object
const router = express.Router();
// routes
router.post("/", addToCart);
router.get("/", fetchCartByUser);
router.delete("/:id", deleteFromCart);
router.patch("/:id", updateCart);

module.exports = router;
