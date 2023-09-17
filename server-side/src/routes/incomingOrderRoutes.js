const express = require("express");
const router = express.Router();

const {
  createIncomingOrder,
  getAllIncomingOrders,
  getIncomingOrderById,
  getIncomingOrderByUserId,
  updateIncomingOrder,
  deleteIncomingOrder
} = require("../controllers/incomingOrderController");

const verfiyUserToken = require("../middlewares/verfiyUserToken");

// get all orders
router.get("/", verfiyUserToken, getAllIncomingOrders);

// get order by id
router.get("/:id", verfiyUserToken, getIncomingOrderById);

// get order by user id
router.get("/user/:id", verfiyUserToken, getIncomingOrderByUserId);

// create a new order
router.post("/:id", verfiyUserToken, createIncomingOrder);

// update order
router.patch( "/:id", verfiyUserToken, updateIncomingOrder);

// delete order
router.delete("/:id",verfiyUserToken, deleteIncomingOrder);

module.exports = router;
