const mongoose = require("mongoose");
const { Schema } = mongoose;


const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true
  },
  review_title: {
    type: String,
    required: true
  },
  review_description: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  seller_id: {
    type: String,
    required: true
  },
  service_id: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
