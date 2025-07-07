/*
    This middleware ensures that the order being deleted,
    is deleted by its owner, or an admin.
*/
import { prisma } from "../../db";
import AppError from "../../utils/AppError";
import jwt from "jsonwebtoken";

const canDeleteOrder = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("Please, provide a token!!", 400));

  const order_id = req.params.id;

  // the id of the logged in user
  if (!process.env.JWT_SECRET) {
    return next(new AppError("JWT secret is not defined!", 500));
  }
  const { id, role } = jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: string;
    role: string;
  };

  if (role == "user") {
    const order = await prisma.order.findUnique({
      where: { id: Number(order_id) },
    });
    
    if (!order) return next(new AppError("Order does not exist!"));
    if (Number(id) == order.buyerId) {
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

export default canDeleteOrder;
