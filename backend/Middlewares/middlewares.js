const passport = require("passport");

module.exports = function isAuth(req, res, done) {
  return passport.authenticate("jwt");
};
