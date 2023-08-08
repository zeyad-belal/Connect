const Joi = require("joi");

const AppError = require("../AppError");

const orderValidationSchema = Joi.object({
  order: Joi.array().items(
    Joi.object({
      product_id: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required()
    })
  )
});

const orderValidation = (req, res, next) => {
  const { error } = orderValidationSchema.validate({
    order: req.body.order
  });

  if (error) return next(new AppError(error, 401));
  next();
};

module.exports = { orderValidation };
