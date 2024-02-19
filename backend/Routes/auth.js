const express = require("express");
const {
  createUser,
  loginUser,
  checkUser,
  logout,
} = require("../controllers/authController");
const passport = require("passport");
// router object
const router = express.Router();
// routes
router.post("/signup", createUser);
router.post("/login", passport.authenticate("local"), loginUser);
router.get("/logout", logout);
router.get("/check", passport.authenticate("jwt"), checkUser);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }, loginUser)
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_BASE_URL + "/home",
    failureRedirect: process.env.CLIENT_BASE_URL + "/login",
  })
);
module.exports = router;
