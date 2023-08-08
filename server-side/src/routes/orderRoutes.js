const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

const verfiyUserToken = require("../middlewares/verfiyUserToken");
const canUpdateOrder = require("../middlewares/order/canUpdateOrder");
const canDeleteOrder = require("../middlewares/order/canDeleteOrder");
const { orderValidation } = require("../utils/validations/orderValidation");

// get all orders
router.get("/", verfiyUserToken, getAllOrders);

// get order by id
router.get("/:id", verfiyUserToken, getOrderById);

// get order by user id
router.get("/user/:id", verfiyUserToken, getOrderByUserId);

// create a new order
router.post("/", verfiyUserToken, orderValidation, createOrder);

// update order
router.patch(
  "/:id",
  verfiyUserToken,
  canUpdateOrder,
  orderValidation,
  updateOrder
);

// delete order
router.delete("/:id", canDeleteOrder, deleteOrder);

module.exports = router;
