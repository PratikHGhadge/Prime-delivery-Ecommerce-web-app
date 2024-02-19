const User = require("../Models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sanitizeUser } = require("../services/common");

const createUser = async (req, res) => {
  try {
    // save new user record
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();
        const token = jwt.sign(sanitizeUser(doc), process.env.SECRET_KEY);
        return res
          .cookie("jwt", token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
            // sameSite: "None",
          })
          .status(201)
          .send({ id: doc.id, role: doc.role, token });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while creating user",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    res
      .cookie("jwt", req.user, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        // sameSite: "None",
      })
      .status(200)
      .send({ status: "success", token: req.user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in while logging user",
      error,
    });
  }
};

const checkUser = async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).send({ status: "success", token: req.cookies });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "error in while checking user",
      error,
    });
  }
};

const logout = async (req, res) => {
  res
    .cookie("jwt", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};
module.exports = {
  createUser,
  loginUser,
  checkUser,
  logout,
};
