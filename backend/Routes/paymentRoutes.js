const express = require("express");
const {
  checkout,
  paymentVerification,
} = require("../controllers/paymentController");

// router object
const router = express.Router();
// routes
router.post("/checkout", checkout);
router.post("/payment-verification", paymentVerification);

module.exports = router;
