const Joi = require("joi");
const AppError = require("../AppError");

const createCategoryValidationSchema = Joi.object({
  category_name: Joi.string().required(),
  image: Joi.object()
});

const updateCategoryValidationSchema = Joi.object({
  category_name: Joi.string(),
  image: Joi.object()
});

const createCategoryValidation = (req, res, next) => {
  const { error } = createCategoryValidationSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

const updateCategoryValidation = (req, res, next) => {
  const { error } = updateCategoryValidationSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

module.exports = { createCategoryValidation, updateCategoryValidation };
