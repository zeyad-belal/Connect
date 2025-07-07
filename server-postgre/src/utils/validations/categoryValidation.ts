import Joi from "joi";
import AppError from "../AppError";

const createCategoryValidationSchema = Joi.object({
  category_name: Joi.string().required(),
  image: Joi.object(),
});

const updateCategoryValidationSchema = Joi.object({
  category_name: Joi.string(),
  image: Joi.object(),
});

export const createCategoryValidation = (req: any, res: any, next: any) => {
  const { error } = createCategoryValidationSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

export const updateCategoryValidation = (req: any, res: any, next: any) => {
  const { error } = updateCategoryValidationSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};
