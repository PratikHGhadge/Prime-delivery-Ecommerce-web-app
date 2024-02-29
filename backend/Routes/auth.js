const express = require("express")
const {
  createUser,
  loginUser,
  checkUser,
  logout,
} = require("../controllers/authController")
const passport = require("passport")
const User = require("../Models/User")
const jwt = require("jsonwebtoken")
const { sanitizeUser } = require("../services/common")
// router object
const router = express.Router()
// routes
router.post("/signup", createUser)
router.post("/login", passport.authenticate("local"), loginUser)
router.get("/logout", logout)
router.get("/check", passport.authenticate("jwt"), checkUser)

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }, loginUser)
)

router.get("/google/callback", function (req, res, next) {
  passport.authenticate("google", async (err, user, info, status) => {
    if (err) {
      res.redirect(process.env.CLIENT_BASE_URL + "/login")
      return
    }

    console.log("Google Callback Info : ", user)
    // find user in database using email address
    const newUser = await User.findOne({ email: user.email })
    // generate jwt token
    const token = jwt.sign(sanitizeUser(newUser), process.env.SECRET_KEY)

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: " lax",
      expires: new Date(Date.now() + 3600000),
    })
    // store the token into cookies and send the response
    res.redirect(process.env.CLIENT_BASE_URL + "/home")
  })(req, res, next)
})
module.exports = router
