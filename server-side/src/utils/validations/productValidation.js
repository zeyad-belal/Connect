const Joi = require("joi");
const AppError = require("../AppError");

const productCreationValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  details: Joi.object(),
  images: Joi.array(),
  new_price: Joi.number().min(0),
  stock_count: Joi.number().integer().min(0).required(),
  category_name: Joi.string(),
  brand_name: Joi.string()
});

const productUpdateValidationSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  details: Joi.object(),
  images: Joi.array(),
  new_price: Joi.number().min(0),
  stock_count: Joi.number().integer().min(0),
  category_name: Joi.string(),
  brand_name: Joi.string()
});

const productCreationValidation = (req, res, next) => {
  const { error } = productCreationValidationSchema.validate({
    name: req.body.name,
    price: req.body.price,
    details: JSON.parse(req.body.details),
    images: req.files,
    new_price: req.body.new_price,
    stock_count: req.body.stock_count,
    category_name: req.body.category_name,
    brand_name: req.body.brand_name
  });
  if (error) return next(new AppError(error.name, 404, error.details));
  next();
};

const productUpdateValidation = (req, res, next) => {
  const { error } = productUpdateValidationSchema.validate({
    name: req.body.name,
    price: req.body.price,
    details: req.body.details ? JSON.parse(req.body.details) : undefined,
    images: req.files,
    new_price: req.body.new_price,
    stock_count: req.body.stock_count,
    category_name: req.body.category_name,
    brand_name: req.body.brand_name
  });
  if (error) return next(new AppError(error.name, 404, error.details));
  next();
};

module.exports = { productCreationValidation, productUpdateValidation };
