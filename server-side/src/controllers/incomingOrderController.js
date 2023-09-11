const { Types } = require("mongoose");
const IncomingOrder = require("../models/IncomingOrder");

const AppError = require("../utils/AppError");

const createIncomingOrder = async (req, res, next) => {
  const { items } = req.body;

  const createdIncomingOrder = await IncomingOrder.create({
    user_id: req.user._id,
    items: items
  });

  res.send({ message: "Order created successfully!", createdIncomingOrder });
};

const getAllIncomingOrders = async (req, res, next) => {
  const incomingOrders = await IncomingOrder.find();

  res.send(incomingOrders);
};

const getIncomingOrderById = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const order = await IncomingOrder.findById(req.params.id)
    .populate("user_id")
    .populate("items.service_id");

  res.send(order);
};

const getIncomingOrderByUserId = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const incomingOrder = await IncomingOrder.find({user_id : req.params.id})
    .populate("user_id")
    .populate("items.service_id")
    .populate({
      path: "items.service_id",
      populate: {
        path: "user_id",
      }
    });

  res.send({incomingOrder});
}

const updateIncomingOrder = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const incomingOrder = await IncomingOrder.findById(req.params.id);
  if (!incomingOrder) return next(new AppError("IncomingOrder not found!", 404));

  const updatedIncomingOrder = await IncomingOrder.findByIdAndUpdate(
    req.params.id,
    { incomingOrder: req.body.incomingOrder },
    { new: true }
  );

  res.send({ message: "Order created successfully!", updatedIncomingOrder });
};

const deleteIncomingOrder = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const deletedIncomingOrder = await IncomingOrder.findByIdAndDelete(req.params.id);
  if (!deletedIncomingOrder) return next(new AppError("IncomingOrder was not found.", 404));

  res.send({ message: "Order deleted successfully!", deletedIncomingOrder });
};

module.exports = {
  createIncomingOrder,
  getAllIncomingOrders,
  getIncomingOrderById,
  getIncomingOrderByUserId,
  updateIncomingOrder,
  deleteIncomingOrder
};
