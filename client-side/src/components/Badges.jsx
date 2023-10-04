/* eslint-disable react/prop-types */
import { FilledRatingStarIcon} from "./Icons";




export const RatingBadge = ({ avg_rating }) => {
  return (
    <>
      <div className="flex items-center border-2 bg-gray-50 border-yellow-500 rounded-full w-fit px-2">
        <FilledRatingStarIcon />
        <span className="text-yellow-500 font-semibold ml-1">{avg_rating}</span>
      </div>
    </>
  );
};
