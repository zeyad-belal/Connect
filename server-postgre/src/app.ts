import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();
import './db';
import { CustomError } from './types/types';

import usersRoutes from './routes/userRoutes';
import categoryRouter from './routes/categoryRoutes';
import serviceRoutes from './routes/serviceRoutes';
import orderRoutes from './routes/orderRoutes';
import reviewRoutes from './routes/reviewRoutes';
import { makePayment } from './controllers/stripPayment';
import verfiyUserToken from './middlewares/verfiyUserToken';


const app = express();
const prisma = new PrismaClient();

const port = process.env.PORT || 3000;
const server = http.createServer(app); 
const io = new SocketIOServer(server, {
  cors: {
    origin: ["http://localhost:5173","https://connect-silk-pi.vercel.app"],
  },
});

// parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

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


app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});




// Global Error Handler
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Internal Server Error!",
    errors: err?.errors || []
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
