const express = require("express");
const { checkout } = require("../controllers/paymentController");

// router object
const router = express.Router();
// routes
router.post("/checkout", checkout);

module.exports = router;
