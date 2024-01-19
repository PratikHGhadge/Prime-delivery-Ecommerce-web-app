const express = require("express");
const { fetchUserById, updateUser } = require("../controllers/userController");
// router object
const router = express.Router();
// routes
router.get("/:id", fetchUserById);
router.patch("/:id", updateUser);
module.exports = router;
