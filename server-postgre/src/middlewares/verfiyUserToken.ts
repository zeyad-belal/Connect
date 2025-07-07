import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import { prisma } from "../db";

export default async (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) return next(new AppError("please provide a token", 404));

  if (!process.env.JWT_SECRET) {
    return next(new AppError("JWT secret is not defined", 500));
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as {
    id: string;
  };
  let ID = Number(id);
  
  const user = await prisma.user.findUnique({ where: { id: ID } });

  if (!user) return next(new AppError("invalid token", 404));

  req.user = user;
  next();
};
