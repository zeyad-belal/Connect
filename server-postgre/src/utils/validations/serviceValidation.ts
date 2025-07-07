import Joi from "joi";
import AppError from "../AppError";

const serviceCreationValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  time: Joi.string().required(),
  extras: Joi.array(),
  keywords: Joi.string(),
  images: Joi.array(),
  category_name: Joi.string(),
  user_id: Joi.string(),
});

const serviceUpdateValidationSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
  time: Joi.string(),
  extras: Joi.array(),
  keywords: Joi.string(),
  images: Joi.array(),
  category_name: Joi.string(),
  user_id: Joi.string(),
});

export const serviceCreationValidation = (req: any, res: any, next: any) => {
  console.log(req.body);
  const { error } = serviceCreationValidationSchema.validate({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    keywords: req.body.keywords,
    time: req.body.time,
    extras: JSON.parse(req.body.extras),
    images: req.files,
    category_name: req.body.category_name,
    user_id: req.body.user_id,
  });
  if (error) console.log(error);
  if (error) return next(new AppError(error.name, 404));
  next();
};

export const serviceUpdateValidation = (req: any, res: any, next: any) => {
  const { error } = serviceUpdateValidationSchema.validate({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    keywords: req.body.keywords,
    time: req.body.time,
    extras: req.body.extras ? JSON.parse(req.body.extras) : undefined,
    images: req.files,
    category_name: req.body.category_name,
    user_id: req.body.user_id,
  });
  if (error) console.log(error);
  if (error) return next(new AppError(error.name, 404));
  next();
};
