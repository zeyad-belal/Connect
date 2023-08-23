const Joi = require("joi");
const AppError = require("../AppError");

const serviceCreationValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  time: Joi.string().required(),
  extras: Joi.array(), 
  keywords: Joi.string(),
  images: Joi.array(),
  category_name: Joi.string()
});

const serviceUpdateValidationSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
  time: Joi.string(),
  extras: Joi.array(), 
  keywords: Joi.string(),
  images: Joi.array(),
  category_name: Joi.string()
});

const serviceCreationValidation = (req, res, next) => {
  console.log(req.body)
  const { error } = serviceCreationValidationSchema.validate({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    keywords: req.body.keywords,
    time: req.body.time,
    extras: JSON.parse(req.body.extras),
    images: req.files,
    category_name: req.body.category_name
  });
  if (error) console.log(error) 
  if (error) return next(new AppError(error.name, 404));
  next();
};

const serviceUpdateValidation = (req, res, next) => {
  const { error } = serviceUpdateValidationSchema.validate({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    keywords: req.body.keywords,
    time: req.body.time,
    extras: req.body.extras ? JSON.parse(req.body.extras) : undefined,
    images: req.files,
    category_name: req.body.category_name
  });
  if (error) console.log(error) 
  if (error) return next(new AppError(error.name, 404));
  next();
};

module.exports = { serviceCreationValidation, serviceUpdateValidation };
