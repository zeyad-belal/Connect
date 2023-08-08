/*
    This middleware ensures that the order being deleted,
    is deleted by its owner, or an admin.
*/
const AppError = require("../../utils/AppError");
const jwt = require("jsonwebtoken");

const Order = require("../../models/Order");

const canDeleteOrder = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please, provide a token!!", 400));

  const order_id = req.params.id;

  // the id of the logged in user
  const { id, role } = jwt.verify(token, process.env.JWT_SECRET);

  if (role == "user") {
    const order = await Order.findOne({ _id: order_id });
    if (!order) return next(new AppError("Order does not exist!"));
    if (id == order.user_id) {
      next();
    } else {
      return next(new AppError("You are not authorized to delete this order!"));
    }
  } else if (role == "superAdmin") {
    next();
  } else {
    return next(new AppError("You are not authorized to delete this order!"));
  }
};

module.exports = canDeleteOrder;
