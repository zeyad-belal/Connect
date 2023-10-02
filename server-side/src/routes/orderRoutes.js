const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByBuyerId,
  getOrderBySellerId,
  updateOrderStatus,
  updateOrderChat,
  deleteOrder
} = require("../controllers/orderController");

const verfiyUserToken = require("../middlewares/verfiyUserToken");
const canDeleteOrder = require("../middlewares/order/canDeleteOrder");

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

// delete order
router.delete("/:id", canDeleteOrder, deleteOrder);

module.exports = router;
