import { prisma } from "../db";
import AppError from "../utils/AppError";

const getReviews = async (req: any, res: any, next: any) => {
  try {
    const { service_id } = req.body;

    if (!service_id) {
      return next(new AppError("Must provide service_id in request", 400));
    }

    // Convert string ID to integer for PostgreSQL
    const serviceId = parseInt(service_id);
    
    if (isNaN(serviceId)) {
      return next(new AppError("Invalid service ID.", 400));
    }

    const reviews = await prisma.review.findMany({
      where: { serviceId },
      include: {
        service: true,
        user: true,
        seller: true
      }
    });

    res.send(reviews);
  } catch (error) {
    return next(new AppError("Failed to fetch reviews.", 500));
  }
};

const getSellerReviews = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Must provide seller_id in request", 400));
    }

    // Convert string ID to integer for PostgreSQL
    const sellerId = parseInt(id);
    
    if (isNaN(sellerId)) {
      return next(new AppError("Invalid seller ID.", 400));
    }

    const reviews = await prisma.review.findMany({
      where: { sellerId: sellerId },
      include: {
        seller: true,
        user: true,
        service: true
      }
    });

    res.send(reviews);
  } catch (error) {
    console.error(error);
    return next(new AppError("Error while fetching reviews", 500));
  }
};

const createReview = async (req: any, res: any, next: any) => {
  try {
    const { service_id, rating, review_title, review_description, user_id, seller_id } = req.body;
    
    console.log(req.body);
    
    if (!service_id) {
      return next(new AppError("Must provide service_id in request", 400));
    }

    // Convert string IDs to integers for PostgreSQL
    const serviceId = parseInt(service_id);
    const userId = parseInt(user_id);
    const sellerId = parseInt(seller_id);
    
    if (isNaN(serviceId) || isNaN(userId) || isNaN(sellerId)) {
      return next(new AppError("Invalid ID format.", 400));
    }

    // Check if service exists
    const serviceExist = await prisma.service.findUnique({
      where: { id: serviceId }
    });
    
    if (!serviceExist) {
      return next(new AppError("Please provide a valid service_id", 404));
    }

    if (req.review) {
      // Update existing review
      const reviewId = parseInt(req.review.id);
      
      if (isNaN(reviewId)) {
        return next(new AppError("Invalid review ID.", 400));
      }

      const updateReview = await prisma.review.update({
        where: { id: reviewId },
        data: {
          rating: rating,
          reviewTitle: review_title,
          reviewDescription: review_description,
        },
        include: {
          user: true,
          seller: true,
          service: true
        }
      });

      res.send({ message: "Review Updated!", updateReview });
    } else {
      // Create new review
      const createdReview = await prisma.review.create({
        data: {
          rating: rating,
          reviewTitle: review_title,
          reviewDescription: review_description,
          userId: userId,
          sellerId: sellerId,
          serviceId: serviceId,
        },
        include: {
          user: true,
          seller: true,
          service: true
        }
      });

      res.send(createdReview);
    }
  } catch (error) {
    return next(new AppError("Failed to create/update review.", 500));
  }
};

const updateReview = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const { rating, review_title, review_description } = req.body;

    // Convert string ID to integer for PostgreSQL
    const reviewId = parseInt(id);
    
    if (isNaN(reviewId)) {
      return next(new AppError("Invalid review ID.", 400));
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        rating: rating,
        reviewTitle: review_title,
        reviewDescription: review_description,
      },
      include: {
        user: true,
        seller: true,
        service: true
      }
    });

    res.send({ message: "Review updated successfully!", updatedReview });
  } catch (error) {
    return next(new AppError("Error in updating review", 500));
  }
};

const deleteReview = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;

    // Convert string ID to integer for PostgreSQL
    const reviewId = parseInt(id);
    
    if (isNaN(reviewId)) {
      return next(new AppError("Invalid review ID.", 400));
    }

    // Check if review exists
    const reviewExist = await prisma.review.findUnique({
      where: { id: reviewId }
    });
    
    if (!reviewExist) {
      return next(new AppError("Please provide a valid review_id", 404));
    }

    const deletedReview = await prisma.review.delete({
      where: { id: reviewId },
      include: {
        user: true,
        seller: true,
        service: true
      }
    });

    res.send({ message: "Review deleted successfully!", deletedReview });
  } catch (error) {
    return next(new AppError("Error in deleting review", 500));
  }
};

export {
  getReviews,
  getSellerReviews,
  createReview,
  updateReview,
  deleteReview,
};
