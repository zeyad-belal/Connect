import { prisma } from "../db";
import AppError from "../utils/AppError";

const createOrder = async (req: any, res: any, next: any) => {
  const { items, buyer, orderID, seller } = req.body;

  const createdOrder = await prisma.order.create({
    data: {
      buyer,
      items,
      id: orderID,
      seller,
    },
  });

  res.send({ message: "Order created successfully!", createdOrder });
};

const getAllOrders = async (req: any, res: any, next: any) => {
  const orders = await prisma.order.findMany();

  res.send(orders);
};

const getOrderById = async (req: any, res: any, next: any) => {


  const order = await prisma.order.findById(req.params.id)
    .populate("buyer")
    .populate("items.service_id");

  res.send(order);
};

const getOrderByBuyerId = async (req: any, res: any, next: any) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const order = await prisma.order.find({ buyer: req.params.id })
    .populate("buyer")
    .populate({
      path: "items.service_id",
      populate: {
        path: "user_id",
      },
    })
    .populate("seller");

  res.send({ order });
};

const getOrderBySellerId = async (req: any, res: any, next: any) => {
  try {
    // Check if id is a valid objectId
    if (!Types.ObjectId.isValid(req.params.id)) {
      return next(new AppError("Invalid ObjectId.", 401));
    }
    // Use aggregate to perform a nested populate
    const orders = await prisma.order.find({ seller: req.params.id })
      .populate("buyer")
      .populate({
        path: "items.service_id",
        populate: {
          path: "user_id",
        },
      })
      .populate("seller");

    res.send({ orders });
  } catch (error) {
    return next(new AppError(error, 500));
  }
};

const updateOrderStatus = async (req: any, res: any, next: any) => {
  try {
    // Check if id is a valid ObjectId
    if (!Types.ObjectId.isValid(req.params.id))
      return next(new AppError("Invalid ObjectId.", 401));

    // Find the order by its _id
    const order = await prisma.order.findOne({ _id: req.params.id });

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

const updateOrderChat = async (req: any, res: any, next: any) => {
  try {
    // Check if id is a valid ObjectId
    if (!Types.ObjectId.isValid(req.params.id))
      return next(new AppError("Invalid ObjectId.", 401));

    // Find the order by its _id
    const order = await prisma.order.findOne({ _id: req.params.id });

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

const updateOrderReviewStatus = async (req: any, res: any, next: any) => {
  try {
    // Check if id is a valid ObjectId
    if (!Types.ObjectId.isValid(req.params.id))
      return next(new AppError("Invalid ObjectId.", 401));

    // Find the order by its _id
    const order = await prisma.order.findById(req.params.id);

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

const deleteOrder = async (req: any, res: any, next: any) => {
  // check if id is a valid objectId
  if (!Types.ObjectId.isValid(req.params.id))
    return next(new AppError("Invalid ObjectId.", 401));

  const deletedOrder = await prisma.order.findByIdAndDelete(req.params.id);
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
  deleteOrder,
};
