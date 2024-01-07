const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const server = express();
const cors = require("cors");
dotenv.config();

// mongodb connection
connectDB()
  .then(() => {})
  .catch(() => {});

// middlewares
server.use(express.json());
server.use(cors({ exposedHeaders: ["X-total-Count"] }));

// Routes
// Test Routes
server.use("/", require("./Routes/testRout"));
// Products routes
server.use("/products", require("./Routes/productsRoutes"));
// Category routes
server.use("/categories", require("./Routes/Categories"));
// Brand routes
server.use("/brands", require("./Routes/brands"));
// Cart Routes
server.use("/cart", require("./Routes/cart"));

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`app is listening on port no ${PORT}`);
});
