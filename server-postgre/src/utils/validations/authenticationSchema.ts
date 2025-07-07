import joi from "joi";
import AppError from "../AppError";

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required(),
  rememberMe: joi.boolean(),
});

const signupSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required(),
  first_name: joi.string().min(3).max(20).required(),
  last_name: joi.string().min(3).max(20).required(),
  role: joi.string().valid("user", "admin", "superAdmin"),
  phone_number: joi.string(),
  cart_items: joi.array(),
});

export const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 401));
  next();
};

export const signupValidation = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 401));
  next();
};

