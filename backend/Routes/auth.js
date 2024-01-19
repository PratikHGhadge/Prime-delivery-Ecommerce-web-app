const express = require("express");
const {
  createUser,
  loginUser,
  checkUser,
} = require("../controllers/authController");
const passport = require("passport");
// router object
const router = express.Router();
// routes
router.post("/signup", createUser);
router.post("/login", passport.authenticate("local"), loginUser);
router.get("/check", passport.authenticate("jwt"), checkUser);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/home",
    failureRedirect: "http://localhost:5173/home/login",
  })
);
module.exports = router;
