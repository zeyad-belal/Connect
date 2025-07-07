import Joi from "joi";
import AppError from "../AppError";

const orderValidationSchema = Joi.object({
  order: Joi.array().items(
    Joi.object({
      service_id: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
    })
  ),
});

export const orderValidation = (req: any, res: any, next: any) => {
  const { error } = orderValidationSchema.validate({
    order: req.body.order,
  });

  if (error) return next(new AppError(error.message, 401));
  next();
};
