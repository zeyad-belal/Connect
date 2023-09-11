const Review = require("../models/Review");
const Service = require("../models/Service");
const AppError = require("../utils/AppError");

const getReviews = async (req, res) => {
  const { service_id } = req.body;

  if (!service_id)
    return next(new AppError("Must provide service_id in request"), 404);
  const reviews = await Review.find({ service_id: service_id }).populate({
    path: "service_id"
  });

  res.send(reviews);
};

const getSellerReviews = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("Must provide seller_id in request"), 404);
  }

  try {
    const reviews = await Review.aggregate([
      {
        $lookup: {
          from: "Service", 
          localField: "service_id",
          foreignField: "_id",
          as: "service"
        }
      },
      {
        $unwind: "$service"
      },
      {
        $match: {
          "service.user_id": id
        }
      }
    ]);

    res.send(reviews);
  } catch (error) {
    // Handle errors here
    console.error(error);
    return next(new AppError("Error while fetching reviews", 500));
  }
};


const createReview = async (req, res, next) => {
  const { service_id } = req.body;

  if (!service_id)
    return next(new AppError("Must provide service_id in request"), 404);

  const serviceExist = await Service.findById(service_id);
  if (!serviceExist)
    return next(new AppError("Please provide a valid service_id"), 404);

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
      service_id: service_id
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

module.exports = { getReviews,getSellerReviews, createReview, updateReview, deleteReview };
