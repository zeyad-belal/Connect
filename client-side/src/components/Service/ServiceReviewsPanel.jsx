/* eslint-disable react/prop-types */
import {
  EmptyRatingStarIcon,
  FilledRatingStarIcon,
  SmallFilledRatingStarIcon
} from "../Icons";
import Review from "./Review";

const ServiceReviewsPanel = ({ service, checkActive }) => {
  const reviewsWithOneStarRatings = service.reviews.filter(
    (review) => review.rating == 1
  );

  const reviewsWithTwoStarRatings = service.reviews.filter(
    (review) => review.rating == 2
  );
  const reviewsWithThreeStarRatings = service.reviews.filter(
    (review) => review.rating == 3
  );
  const reviewsWithFourStarRatings = service.reviews.filter(
    (review) => review.rating == 4
  );
  const reviewsWithFiveStarRatings = service.reviews.filter(
    (review) => review.rating == 5
  );

  // Normal Percentages
  const oneStarRatingsPercentage =
    (reviewsWithOneStarRatings.length / service.reviews.length) * 100 || 0;

  const twoStarRatingsPercentage =
    (reviewsWithTwoStarRatings.length / service.reviews.length) * 100 || 0;

  const threeStarRatingsPercentage =
    (reviewsWithThreeStarRatings.length / service.reviews.length) * 100 || 0;

  const fourStarRatingsPercentage =
    (reviewsWithFourStarRatings.length / service.reviews.length) * 100 || 0;

  const fiveStarRatingsPercentage =
    (reviewsWithFiveStarRatings.length / service.reviews.length) * 100 || 0;

  return (
    <>
      <div id="reviews" className={`panel ${checkActive(2, "active")}`}>
        {/* OverAll Ratings */}
        <div className="flex flex-col items-center md:flex-row justify-around py-5">
          <div className="flex justify-center items-center flex-col my-5">
            <div className="text-lg font-bold">Overall Rating</div>
            {!service.avg_rating && (
              <div className="text-lg font-bold text-gray-400">0.0</div>
            )}
            {service.avg_rating && (
              <div className="text-lg font-bold text-yellow-500">
                {service.avg_rating}
              </div>
            )}
            <div>
              <div className="flex">
                {!service.avg_rating && (
                  <>
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                  </>
                )}
                {service.avg_rating < 2 && service.avg_rating >= 1 && (
                  <>
                    <FilledRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                  </>
                )}
                {service.avg_rating < 3 && service.avg_rating >= 2 && (
                  <>
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                  </>
                )}
                {service.avg_rating < 4 && service.avg_rating >= 3 && (
                  <>
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                  </>
                )}
                {service.avg_rating < 5 && service.avg_rating >= 4 && (
                  <>
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <EmptyRatingStarIcon />
                  </>
                )}
                {service.avg_rating == 5 && (
                  <>
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                  </>
                )}
              </div>
            </div>
            <div>
              <div className=" text-gray-400 ">
                Based on {service.reviews.length} ratings
              </div>
            </div>
          </div>
          {/* Five Star Rating Bar */}
          <div className="flex justify-center items-center flex-col w-[400px]">
            <div className="flex justify-center items-center w-full mt-4">
              <span className="text-sm font-bold text-gray-600">5</span>
              <div className="pl-1 pt-0.5">
                <SmallFilledRatingStarIcon />
              </div>
              <div className=" w-2/5 h-1.5 mx-2 bg-gray-200 rounded">
                <div
                  style={{ width: `${fiveStarRatingsPercentage}%` }}
                  className="h-1.5 bg-yellow-400 rounded"
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {Math.floor(fiveStarRatingsPercentage)}%
              </span>
            </div>
            {/* Four Star Rating Bar */}
            <div className="flex justify-center items-center w-full mt-4">
              <span className="text-sm font-bold text-gray-600">4</span>
              <div className="pl-1 pt-0.5">
                <SmallFilledRatingStarIcon />
              </div>
              <div className=" w-2/5 h-1.5 mx-2 bg-gray-200 rounded">
                <div
                  style={{ width: `${fourStarRatingsPercentage}%` }}
                  className="h-1.5 bg-yellow-400 rounded"
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {Math.floor(fourStarRatingsPercentage)}%
              </span>
            </div>
            {/* Three Star Rating Bar */}
            <div className="flex justify-center items-center w-full mt-4">
              <span className="text-sm font-bold text-gray-600">3</span>
              <div className="pl-1 pt-0.5">
                <SmallFilledRatingStarIcon />
              </div>
              <div className=" w-2/5 h-1.5 mx-2 bg-gray-200 rounded">
                <div
                  style={{ width: `${threeStarRatingsPercentage}%` }}
                  className="h-1.5 bg-yellow-400 rounded"
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {Math.floor(threeStarRatingsPercentage)}%
              </span>
            </div>
            {/* Two Star Rating Bar */}
            <div className="flex justify-center items-center w-full mt-4">
              <span className="text-sm font-bold text-gray-600">2</span>
              <div className="pl-1 pt-0.5">
                <SmallFilledRatingStarIcon />
              </div>
              <div className=" w-2/5 h-1.5 mx-2 bg-gray-200 rounded">
                <div
                  style={{ width: `${twoStarRatingsPercentage}%` }}
                  className="h-1.5 bg-yellow-400 rounded"
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {Math.floor(twoStarRatingsPercentage)}%
              </span>
            </div>
            {/* One Star Rating Bar */}
            <div className="flex justify-center items-center w-full mt-4">
              <span className="text-sm font-bold text-gray-600">1</span>
              <div className="pl-1 pt-0.5">
                <SmallFilledRatingStarIcon />
              </div>
              <div className=" w-2/5 h-1.5 mx-2 bg-gray-200 rounded">
                <div
                  style={{ width: `${oneStarRatingsPercentage}%` }}
                  className="h-1.5 bg-yellow-400 rounded"
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {Math.floor(oneStarRatingsPercentage)}%
              </span>
            </div>
          </div>
        </div>
        {/* ----------------------------- Customer Reviews Section ----------------------- */}
        <div className="p-5">
          <div className="py-4 border-t border-b">
            <div className="text-lg font-bold">Customer Reviews</div>
          </div>
          <div className="p-4">
            {!service.reviews.length && (
              <>
                <div className="text-center italic py-5">
                  There are no customer reviews.
                </div>
              </>
            )}
            {service.reviews.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceReviewsPanel;
