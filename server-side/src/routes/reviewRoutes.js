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
  getSellerReviews,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

// create review for a service (req must include user._id & service._id)
router.post(
  "/",
  verifyUserToken,
  canCreateReview,
  reviewCreationValidation,
  createReview
);

// get reviews for a service (req must include service._id)
router.get("/", verifyUserToken, getReviews);

// get all reviews for a Seller (provide id in params)
router.get("/sellerReviews/:id", verifyUserToken, getSellerReviews);

// update a review in a service (must provide review fields in req & review id in params)
router.put(
  "/:id",
  verifyUserToken,
  canUpdateReview,
  reviewUpdateValidation,
  updateReview
);

// delete a review from a service (must provide review id in params)
router.delete("/:id", canDeleteReview, deleteReview);

module.exports = router;
