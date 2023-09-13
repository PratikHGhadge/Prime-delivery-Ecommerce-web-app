const express = require("express");
const { fetchBrands, createBrand } = require("../controllers/brand");

// router object
const router = express.Router();
// routes
router.get("/fetch-brands", fetchBrands);
router.post("/create-brand", createBrand);

module.exports = router;
