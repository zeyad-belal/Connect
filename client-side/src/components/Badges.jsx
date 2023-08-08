import {
  BoltIcon,
  ClickIcon,
  FilledRatingStarIcon,
  SparklesIcon
} from "./Icons";

export const NewArrivalBadge = () => {
  return (
    <>
      <div className="flex items-center w-fit gap-1 bg-blue-700 text-gray-100 mb-2 mx-[2px] h-7 px-2.5 py-0.5 rounded-xl">
        <SparklesIcon></SparklesIcon>
        <span className="text-sm font-semibold whitespace-nowrap">
          New Arrival
        </span>
      </div>
    </>
  );
};

export const BestSellerBadge = () => {
  return (
    <>
      <div className="flex items-center w-fit gap-1 bg-green-600 text-gray-100 mb-2 mx-[2px] h-7 px-2.5 py-0.5 rounded-xl">
        <ClickIcon></ClickIcon>
        <span className="text-sm font-semibold whitespace-nowrap">
          Best Seller
        </span>
      </div>
    </>
  );
};

export const SaleBadge = () => {
  return (
    <>
      <div className="flex items-center flex-w w-fit gap-1 bg-red-600 text-gray-100 mb-2 mx-[2px] h-7 px-2.5 py-0.5 rounded-xl">
        <BoltIcon></BoltIcon>
        <span className="text-sm font-semibold whitespace-nowrap">Sale</span>
      </div>
    </>
  );
};

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
