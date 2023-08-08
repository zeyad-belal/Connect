/*
    This middleware ensures that the review being created,
    does not exist before.
*/
const Review = require("../../models/Review");

const canCreateReview = async (req, res, next) => {
  // the id of the logged in user
  const user_id = req.user._id;

  const review = await Review.findOne({ user_id: user_id });

  if (review) {
    req.review = review;
  }

  next();
};

module.exports = canCreateReview;
