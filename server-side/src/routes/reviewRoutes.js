const express = require("express");
const router = express.Router();

const {
  reviewCreationValidation,
  reviewUpdateValidation
} = require("../utils/validations/reviewValidation");

const verifyUserToken = require("../middlewares/verfiyUserToken");
const canUpdateReview = require("../middlewares/review/canUpdateReview");
const canCreateReview = require("../middlewares/review/canCreateReview");
const canDeleteReview = require("../middlewares/review/canDeleteReview");

const {
  createReview,
  getReviews,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

// create review for a product (req must include user._id & product._id)
router.post(
  "/",
  verifyUserToken,
  canCreateReview,
  reviewCreationValidation,
  createReview
);

// get reviews for a product (req must include product._id)
router.get("/", verifyUserToken, getReviews);

// update a review in a product (must provide review fields in req & review id in params)
router.put(
  "/:id",
  verifyUserToken,
  canUpdateReview,
  reviewUpdateValidation,
  updateReview
);

// delete a review from a product (must provide review id in params)
router.delete("/:id", canDeleteReview, deleteReview);

module.exports = router;
