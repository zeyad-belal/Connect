/* 
This middleware ensures that the order being updated,
is updated by its owner.
*/
const AppError = require("../../utils/AppError");

const Order = require("../../models/Order");

const canUpdateOrder = async (req, res, next) => {
  // the id of the logged in user
  const user_id = req.user.id;

  // the id of the order that is being updated
  const toBeUpdatedOrder = req.params.id;

  const order = await Order.findById(toBeUpdatedOrder);
  if (!order) return next(new AppError("Order was not found!", "404"));

  if (user_id == order.user_id) {
    next();
  } else {
    return next(new AppError("the user is not the owner of the order!"));
  }
};

module.exports = canUpdateOrder;
