const { Types } = require("mongoose");
const Order = require("../models/Order");

const AppError = require("../utils/AppError");

const createOrder = async (req, res, next) => {
  const { order } = req.body;

  const createdOrder = await Order.create({
    user_id: req.user._id,
    order: order
  });

  res.send({ message: "Order created successfully!", createdOrder });
};

const getAllOrders = async (req, res, next) => {
  const orders = await Order.find();

  res.send(orders);
};

const getOrderById = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const order = await Order.findById(req.params.id)
    .populate("user_id")
    .populate("order.product_id");

  res.send(order);
};

const getOrderByUserId = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const order = await Order.find({user_id : req.params.id})
    .populate("user_id")
    .populate("order.product_id");

  res.send({order});
}

const updateOrder = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError("Order not found!", 404));

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { order: req.body.order },
    { new: true }
  );

  res.send({ message: "Order created successfully!", updatedOrder });
};

const deleteOrder = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
  if (!deletedOrder) return next(new AppError("Order was not found.", 404));

  res.send({ message: "Order deleted successfully!", deletedOrder });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  updateOrder,
  deleteOrder
};
