const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const server = express();
dotenv.config();

// mongodb connection
connectDB()
  .then(() => {})
  .catch(() => {});

// middlewares
server.use(express.json());

// Routes
// Test Routes
server.use("/", require("./Routes/testRout"));

// Products routes
server.use("/products", require("./Routes/productsRoutes"));

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log("app is listening on port no 3000");
});
