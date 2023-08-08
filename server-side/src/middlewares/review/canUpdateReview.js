/*
    This middleware ensures that the review being updated,
    is updated by its owner.
*/
const AppError = require("../../utils/AppError");
const jwt = require("jsonwebtoken");

const Review = require("../../models/Review");

const canUpdateReview = async (req, res, next) => {
  // the id of the logged in user
  const user_id = req.user.id;

  // the id of the review that is being updated
  const toBeUpdatedReview = req.params.id;

  const review = await Review.findById(toBeUpdatedReview);

  if (user_id == review.user_id) {
    next();
  } else {
    return next(new AppError("the user is not the owner of the review!"));
  }
};

module.exports = canUpdateReview;
