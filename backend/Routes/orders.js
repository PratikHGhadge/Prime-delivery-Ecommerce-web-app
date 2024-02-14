const express = require("express");
const {
  fetchOrders,
  createOrder,
  fetchAllOrders,
  updateOrderById,
} = require("../controllers/ordersController");

// router object
const router = express.Router();
// routes
router.get("/", fetchOrders);
router.get("/all", fetchAllOrders);
router.post("/", createOrder);
router.patch("/:id", updateOrderById);

module.exports = router;
