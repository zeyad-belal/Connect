import {
  EmptyRatingStarIcon,
  FilledRatingStarIcon,
  SmallFilledRatingStarIcon
} from "../Icons";

const ProductReviewsPanel = ({ product, checkActive }) => {
  const reviewsWithOneStarRatings = product.reviews.filter(
    (review) => review.rating == 1
  );

  const reviewsWithTwoStarRatings = product.reviews.filter(
    (review) => review.rating == 2
  );
  const reviewsWithThreeStarRatings = product.reviews.filter(
    (review) => review.rating == 3
  );
  const reviewsWithFourStarRatings = product.reviews.filter(
    (review) => review.rating == 4
  );
  const reviewsWithFiveStarRatings = product.reviews.filter(
    (review) => review.rating == 5
  );

  // Normal Percentages
  const oneStarRatingsPercentage =
    (reviewsWithOneStarRatings.length / product.reviews.length) * 100 || 0;

  const twoStarRatingsPercentage =
    (reviewsWithTwoStarRatings.length / product.reviews.length) * 100 || 0;

  const threeStarRatingsPercentage =
    (reviewsWithThreeStarRatings.length / product.reviews.length) * 100 || 0;

  const fourStarRatingsPercentage =
    (reviewsWithFourStarRatings.length / product.reviews.length) * 100 || 0;

  const fiveStarRatingsPercentage =
    (reviewsWithFiveStarRatings.length / product.reviews.length) * 100 || 0;

  return (
    <>
      <div id="reviews" className={`panel ${checkActive(2, "active")}`}>
        {/* OverAll Ratings */}
        <div className="flex flex-col items-center md:flex-row justify-around py-5">
          <div className="flex justify-center items-center flex-col my-5">
            <div className="text-lg font-bold">Overall Rating</div>
            {!product.avg_rating && (
              <div className="text-lg font-bold text-gray-400">0.0</div>
            )}
            {product.avg_rating && (
              <div className="text-lg font-bold text-yellow-500">
                {product.avg_rating}
              </div>
            )}
            <div>
              <div className="flex">
                {!product.avg_rating && (
                  <>
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                  </>
                )}
                {product.avg_rating < 2 && product.avg_rating >= 1 && (
                  <>
                    <FilledRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                  </>
                )}
                {product.avg_rating < 3 && product.avg_rating >= 2 && (
                  <>
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                  </>
                )}
                {product.avg_rating < 4 && product.avg_rating >= 3 && (
                  <>
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <EmptyRatingStarIcon />
                    <EmptyRatingStarIcon />
                  </>
                )}
                {product.avg_rating < 5 && product.avg_rating >= 4 && (
                  <>
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <FilledRatingStarIcon />
                    <EmptyRatingStarIcon />
                  </>
                )}
                {product.avg_rating == 5 && (
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
                Based on {product.reviews.length} ratings
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
                {fiveStarRatingsPercentage}%
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
                {fourStarRatingsPercentage}%
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
                {threeStarRatingsPercentage}%
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
                {twoStarRatingsPercentage}%
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
                {oneStarRatingsPercentage}%
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
            {!product.reviews.length && (
              <>
                <div className="text-center italic py-5">
                  There are no customer reviews.
                </div>
              </>
            )}
            {product.reviews.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReviewsPanel;
