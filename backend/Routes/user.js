const express = require("express");
const { fetchUserById, updateUser } = require("../controllers/userController");
// router object
const router = express.Router();
// routes
router.get("/", fetchUserById);
router.patch("/", updateUser);
module.exports = router;
