const express = require("express");
const { fetchBrands, createBrand } = require("../controllers/brand");

// router object
const router = express.Router();
// routes
router.get("/", fetchBrands);
router.post("/", createBrand);

module.exports = router;
