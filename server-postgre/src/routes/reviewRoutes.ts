import express from "express";
import { upload } from "../utils/multer";

import {
  reviewCreationValidation,
  reviewUpdateValidation,
} from "../utils/validations/reviewValidation";

import verifyUserToken from "../middlewares/verfiyUserToken";

import {
  createReview,
  getReviews,
  getSellerReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";

export const router = express.Router();

// create review for a service (req must include user._id & service._id)
router.post(
  "/",
  verifyUserToken,
  reviewCreationValidation,
  upload.none(),
  createReview
);

// get reviews for a service (req must include service._id)
router.get("/", verifyUserToken, getReviews);

// get all reviews for a Seller (provide id in params)
router.get("/sellerReviews/:id", verifyUserToken, getSellerReviews);

// update a review in a service (must provide review fields in req & review id in params)
router.put("/:id", verifyUserToken, reviewUpdateValidation, updateReview);

// delete a review from a service (must provide review id in params)
router.delete("/:id", verifyUserToken, deleteReview);

module.exports = router;
