import Joi from "joi";
import AppError from "../AppError";

const reviewCreationValidationSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  review_title: Joi.string().max(100),
  review_description: Joi.string().max(250),
  seller_id: Joi.string(),
});

const reviewUpdateValidationSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  review_title: Joi.string().max(100),
  review_description: Joi.string().max(250),
  seller_id: Joi.string(),
});

export const reviewCreationValidation = (req: any, res: any, next: any) => {
  const { error } = reviewCreationValidationSchema.validate({
    rating: req.body.rating,
    review_title: req.body.review_title,
    review_description: req.body.review_description,
  });
  if (error) return next(new AppError(error.message, 401));
  next();
};

export const reviewUpdateValidation = (req: any, res: any, next: any) => {
  const { error } = reviewUpdateValidationSchema.validate({
    rating: req.body.rating,
    review_title: req.body.review_title,
    review_description: req.body.review_description,
  });
  if (error) return next(new AppError(error.message, 401));
  next();
};
