const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Models/User");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

// Passport strategy
const initializePassport = (passport) => {
  // JWT OPTIONS
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET_KEY;

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: "http://localhost:8080/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          // Check if user already exists in your database
          let user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            return cb(null, user);
          }
          // If user does not exist, create a new user
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            // Add any other relevant user information from the Google profile
          });
          await user.save();
          return cb(null, user);
        } catch (error) {
          return cb(error, null);
        }
      }
    )
  );

  // local strategy
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async function (
      email,
      password,
      done
    ) {
      try {
        // save new user record
        const user = await User.findOne({ email: email });
        if (!user) {
          done(null, false, { message: "no such user email" });
        }
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          async function (err, hashedPassword) {
            if (crypto.timingSafeEqual(user.password, hashedPassword)) {
              const token = jwt.sign(
                sanitizeUser(user),
                process.env.SECRET_KEY
              );
              done(null, token);
            } else {
              done(null, false, { message: "Invalid credentials" });
            }
          }
        );
      } catch (error) {
        done(error);
      }
    })
  );

  // jwt strategy
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      console.log(jwt_payload);
      try {
        const user = await User.findOne({ id: jwt_payload.sub });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(err, false);
      }
    })
  );

  // this creates session variable req.user on being called from callbacks
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, sanitizeUser(user));
    });
  });
  // this creates session variable req.user when called from
  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

module.exports = { initializePassport };
