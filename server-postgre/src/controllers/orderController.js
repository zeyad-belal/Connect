const { Types, default: mongoose } = require("mongoose");
const Order = require("../models/Order");

const AppError = require("../utils/AppError");

const createOrder = async (req, res, next) => {
  const { items ,buyer ,orderID,seller } = req.body;

  const createdOrder = await Order.create({
    buyer ,
    items,
    orderID,
    seller,
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
    .populate("buyer")
    .populate("items.service_id");

  res.send(order);
};

const getOrderByBuyerId = async (req, res, next) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const order = await Order.find({buyer : req.params.id})
    .populate("buyer")
    .populate({
      path: "items.service_id",
      populate: {
        path: "user_id",
      }
    })
      .populate("seller");
      
  

  res.send({order});
}

const getOrderBySellerId = async (req, res, next) => {
  try {
    // Check if id is a valid objectId
    if (!Types.ObjectId.isValid(req.params.id)) {
      return next(new AppError("Invalid ObjectId.", 401));
    }
    // Use aggregate to perform a nested populate
    const orders = await Order.find({seller : req.params.id})
    .populate("buyer")
    .populate({
      path: "items.service_id",
      populate: {
        path: "user_id",
      }
    })
      .populate("seller");



    res.send({ orders });
  } catch (error) {
    
    return next(new AppError(error, 500));
  }
};



const updateOrderStatus = async (req, res, next) => {
  try {
    // Check if id is a valid ObjectId
    if (!Types.ObjectId.isValid(req.params.id))
      return next(new AppError("Invalid ObjectId.", 401));

    // Find the order by its _id
    const order = await Order.findOne({ _id: req.params.id });

    // Check if the order exists
    if (!order) return next(new AppError("Order not found!", 404));



    // Update the status of the item
    order.items[0].status = req.body.status;

    // Save the updated order
    const updatedOrder = await order.save();

    res.send({ message: "Order status updated successfully!", updatedOrder });
  } catch (error) {
    // Handle any errors that may occur during the update
    return next(new AppError("Failed to update order status.", 500));
  }
};


const updateOrderChat = async (req, res, next) => {
  try {
    // Check if id is a valid ObjectId
    if (!Types.ObjectId.isValid(req.params.id))
      return next(new AppError("Invalid ObjectId.", 401));

    // Find the order by its _id
    const order = await Order.findOne({_id :req.params.id} );

    // Check if the order exists
    if (!order) return next(new AppError("Order not found!", 404));


    // Update the status of the item
    order.chatHistory = req.body.chatHistory;

    // Save the updated order
    const updatedOrder = await order.save();

    res.send({ message: "Order status updated successfully!", updatedOrder });
  } catch (error) {
    // Handle any errors that may occur during the update
    return next(new AppError(error, 500));
  }
};

const updateOrderReviewStatus = async (req, res, next) => {
  try {
    // Check if id is a valid ObjectId
    if (!Types.ObjectId.isValid(req.params.id))
      return next(new AppError("Invalid ObjectId.", 401));

    // Find the order by its _id
    const order = await Order.findById(req.params.id);

    // Check if the order exists
    if (!order) return next(new AppError("Order not found!", 404));


    // Update the status of the item
    order.reviewed = req.body.reviewed;

    // Save the updated order
    const updatedOrder = await order.save();

    res.send({ message: "Order status updated successfully!", updatedOrder });
  } catch (error) {
    // Handle any errors that may occur during the update
    return next(new AppError(error, 500));
  }
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
  getOrderByBuyerId,
  getOrderBySellerId,
  updateOrderStatus,
  updateOrderReviewStatus,
  updateOrderChat,
  deleteOrder
};
