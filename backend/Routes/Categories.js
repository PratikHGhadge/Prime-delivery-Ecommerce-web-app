const express = require("express");
const { fetchCategories, createCategory } = require("../controllers/Category");

// router object
const router = express.Router();
// routes
router.get("/fetch-categories", fetchCategories);
router.post("/create-category", createCategory);

module.exports = router;
