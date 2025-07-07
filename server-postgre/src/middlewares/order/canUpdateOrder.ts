/* 
This middleware ensures that the order being updated,
is updated by its owner.
*/
import { prisma } from "../../db";
import AppError from "../../utils/AppError";

const canUpdateOrder = async (req: any, res: any, next: any) => {
  // the id of the logged in user
  const user_id = req.user.id;

  // the id of the order that is being updated
  const toBeUpdatedOrder = req.params.id;

  const order = await prisma.order.findUnique({
    where: { id: Number(toBeUpdatedOrder) },
  });

  if (!order) return next(new AppError("Order was not found!", 404));

  if (user_id == order.buyerId || user_id == order.sellerId) {
    next();
  } else {
    return next(new AppError("the user is not the owner of the order!"));
  }
};

module.exports = canUpdateOrder;
