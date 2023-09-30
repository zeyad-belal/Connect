const { Types } = require("mongoose");
const IncomingOrder = require("../models/IncomingOrder");

const AppError = require("../utils/AppError");

const createIncomingOrder = async (req, res, next) => {
  const { id } = req.params;
  const { items ,buyer , chatHistroy } = req.body;

  const createdIncomingOrder = await IncomingOrder.create({
    user_id: id,
    items: items,
    buyer:buyer,
    chatHistroy:chatHistroy
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
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const incomingOrder = await IncomingOrder.find({user_id : req.params.id})
    .populate("user_id")
    .populate({
      path: "buyer",
      model: "User", 
    })
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

  const incomingOrder = await IncomingOrder.findOne({user_id : req.params.id});
  if (!incomingOrder) return next(new AppError("IncomingOrder not found!", 404));


  const {chatHistroy} = req.body
  const updatedIncomingOrder = await IncomingOrder.findByIdAndUpdate(
    incomingOrder._id,
    { $set: { chatHistroy: chatHistroy } },
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
