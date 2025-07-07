import express from "express";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByBuyerId,
  getOrderBySellerId,
  updateOrderStatus,
  updateOrderReviewStatus,
  updateOrderChat,
  deleteOrder
} from "../controllers/orderController";

import verfiyUserToken from "../middlewares/verfiyUserToken";
import canDeleteOrder from "../middlewares/order/canDeleteOrder";

export const router = express.Router();

// get all orders
router.get("/", verfiyUserToken, getAllOrders);

// get order by id
router.get("/:id", verfiyUserToken, getOrderById);

// get order by buyer id
router.get("/buyer/:id", verfiyUserToken, getOrderByBuyerId);

// get order by seller id
router.get("/seller/:id", verfiyUserToken, getOrderBySellerId);

// create a new order
router.post("/", verfiyUserToken, createOrder);

// update order status
router.patch( "/:id", verfiyUserToken, updateOrderStatus);

// update order chat
router.patch( "/chat/:id", verfiyUserToken, updateOrderChat);


// update order chat
router.patch( "/reviewed/:id", verfiyUserToken, updateOrderReviewStatus);

// delete order
router.delete("/:id", canDeleteOrder, deleteOrder);

module.exports = router;
