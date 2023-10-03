require("dotenv").config();
require("./db");
require("express-async-error");

const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const http = require("http"); 
const socketIo = require("socket.io");
const server = http.createServer(app); 
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});



// import routes
const usersRoutes = require("./src/routes/userRoutes");
const categoryRouter = require("./src/routes/categoryRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const {makePayment} = require("./src/controllers/stripPayment");
const verfiyUserToken = require("./src/middlewares/verfiyUserToken");

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
app.post('/create-checkout-session',verfiyUserToken, makePayment);



io.on('connection', (socket) => {
  socket.on('send-message', (message, room) => {
    if (room !== '') { 
      // Join the specified room
      socket.join(room);
      socket.to(room).emit('receive-message', message); 
    }
  });

  socket.on('send-noti', (message, room) => {
    if (room !== '') { 
      // Join the specified room
      socket.join(room);
      socket.to(room).emit('receive-noti', message); 
    }
  });

  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });
});





// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Internal Server Error!",
    errors: err?.errors || []
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}! ✅`);
});
