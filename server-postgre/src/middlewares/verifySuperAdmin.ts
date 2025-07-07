import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";

export default async (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) return next(new AppError("please provide a token", 404));

  if (!process.env.JWT_SECRET) {
    return next(new AppError("JWT secret is not defined", 500));
  }
  const { role } = jwt.verify(token, process.env.JWT_SECRET as string) as {
    role: string;
  };

  if (role == "superAdmin") {
    next();
  } else {
    return next(new AppError("only super admin can do this", 401));
  }
};
