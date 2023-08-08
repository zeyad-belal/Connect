const Joi = require("joi");
const AppError = require("../AppError");

const createBrandValidationSchema = Joi.object({
  brand_name: Joi.string().required(),
  image: Joi.object(),
});

const updateBrandValidationSchema = Joi.object({
  brand_name: Joi.string(),
  image: Joi.object(),
});

const createBrandValidation = (req, res, next) => {
  const { error } = createBrandValidationSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

const updateBrandValidation = (req, res, next) => {
  const { error } = updateBrandValidationSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

module.exports = { createBrandValidation, updateBrandValidation };
