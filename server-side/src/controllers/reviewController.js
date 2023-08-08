const Review = require("../models/Review");
const Product = require("../models/Product");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const getReviews = async (req, res) => {
  const { product_id } = req.body;

  if (!product_id)
    return next(new AppError("Must provide product_id in request"), 404);
  const reviews = await Review.find({ product_id: product_id }).populate({
    path: "product_id"
  });

  res.send(reviews);
};

const createReview = async (req, res, next) => {
  const { product_id } = req.body;

  if (!product_id)
    return next(new AppError("Must provide product_id in request"), 404);

  const productExist = await Product.findById(product_id);
  if (!productExist)
    return next(new AppError("Please provide a valid product_id"), 404);

  if (req.review) {
    const updateReview = await Review.findOneAndUpdate(
      { _id: req.review._id },
      {
        rating: req.body.rating,
        review_title: req.body.review_title,
        review_description: req.body.review_description
      },
      { new: true }
    );

    res.send({ message: "Review Updated!", updateReview });
  } else {
    const createdReview = await Review.create({
      rating: req.body.rating,
      review_title: req.body.review_title,
      review_description: req.body.review_description,
      user_id: req.user._id,
      product_id: product_id
    });

    res.send(createdReview);
  }
};

const updateReview = async (req, res, next) => {
  const { id } = req.params;

  const updatedReview = await Review.findOneAndUpdate(
    { _id: id },
    {
      rating: req.body.rating,
      review_title: req.body.review_title,
      review_description: req.body.review_description
    },
    { new: true }
  );

  if (!updatedReview)
    return next(new AppError("Error in updating review", 404));

  res.send({ message: "Review updated successfully!", updatedReview });
};

const deleteReview = async (req, res, next) => {
  const { id } = req.params;

  const reviewExist = await Review.findById(id);
  if (!reviewExist)
    return next(new AppError("Please provide a valid review_id"), 404);

  const deletedReview = await Review.findByIdAndRemove(id);

  if (!deletedReview)
    return next(new AppError("Error in deleting review", 404));

  res.send({ message: "Review deleted successfully!", deletedReview });
};

module.exports = { getReviews, createReview, updateReview, deleteReview };
