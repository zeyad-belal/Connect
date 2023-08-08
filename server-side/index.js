require("dotenv").config();
require("./db");
require("express-async-error");

const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT;
const cors = require("cors");

// import routes
const usersRoutes = require("./src/routes/userRoutes");
const categoryRouter = require("./src/routes/categoryRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");

// parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

// Routes

app.use("/users", usersRoutes);
app.use("/categories", categoryRouter);
app.use("/services", serviceRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Internal Server Error!",
    errors: err?.errors || []
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}! ✅`);
});
