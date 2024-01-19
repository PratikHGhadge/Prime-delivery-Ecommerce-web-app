const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const server = express();
const session = require("express-session");
const passport = require("passport");
const { initializePassport } = require("./Middlewares/passport");
const path = require("path");
const cors = require("cors");
const User = require("./Models/User");
const isAuth = require("./Middlewares/middlewares");
dotenv.config();

// mongodb connection
connectDB()
  .then(() => {})
  .catch(() => {});
// middlewares
server.use(express.json());
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: false },
  })
);

server.use(passport.initialize());
server.use(passport.session());
server.use(passport.authenticate("session"));

initializePassport(passport);

passport.serializeUser(function (user, cb) {});
// Routes
// Test Routes
server.use("/", require("./Routes/testRout"));
// Products routes
server.use("/products", isAuth(), require("./Routes/productsRoutes"));
// Category routes
server.use("/categories", isAuth(), require("./Routes/Categories"));
// Brand routes
server.use("/brands", isAuth(), require("./Routes/brands"));
// Cart Routes
server.use("/cart", isAuth(), require("./Routes/cart"));
// User Routes
server.use("/user", isAuth(), require("./Routes/user"));
// Cart Routes
server.use("/auth", require("./Routes/auth"));
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`app is listening on port no ${PORT}`);
});
