const express = require("express");
const { fetchCategories, createCategory } = require("../controllers/Category");

// router object
const router = express.Router();
// routes
router.get("/", fetchCategories);
router.post("/", createCategory);

module.exports = router;
