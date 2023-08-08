const Joi = require("joi");
const AppError = require("../AppError");

const serviceCreationValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  details: Joi.object(),
  images: Joi.array(),
  category_name: Joi.string()
});

const serviceUpdateValidationSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  details: Joi.object(),
  category_name: Joi.string()
});

const serviceCreationValidation = (req, res, next) => {
  const { error } = serviceCreationValidationSchema.validate({
    name: req.body.name,
    price: req.body.price,
    details: JSON.parse(req.body.details),
    images: req.files,
    category_name: req.body.category_name
  });
  if (error) return next(new AppError(error.name, 404, error.details));
  next();
};

const serviceUpdateValidation = (req, res, next) => {
  const { error } = serviceUpdateValidationSchema.validate({
    name: req.body.name,
    price: req.body.price,
    details: req.body.details ? JSON.parse(req.body.details) : undefined,
    images: req.files,
    category_name: req.body.category_name
  });
  if (error) return next(new AppError(error.name, 404, error.details));
  next();
};

module.exports = { serviceCreationValidation, serviceUpdateValidation };
