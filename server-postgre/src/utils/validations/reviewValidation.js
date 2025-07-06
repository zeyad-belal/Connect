const Joi = require("joi");

const AppError = require("../AppError");

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
  seller_id: Joi.string()
});

const reviewCreationValidation = (req, res, next) => {
  const { error } = reviewCreationValidationSchema.validate({
    rating: req.body.rating,
    review_title: req.body.review_title,
    review_description: req.body.review_description
  });
  if (error) return next(new AppError(error, 401));
  next();
};

const reviewUpdateValidation = (req, res, next) => {
  const { error } = reviewUpdateValidationSchema.validate({
    rating: req.body.rating,
    review_title: req.body.review_title,
    review_description: req.body.review_description
  });
  if (error) return next(new AppError(error, 401));
  next();
};

module.exports = { reviewCreationValidation, reviewUpdateValidation };
