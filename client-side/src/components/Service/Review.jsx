/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const Review = ({ review, flag }) => {
const [helpful, setHelpful] = useState(Math.ceil(Math.random()*10))
const [helpfulClicked, setHelpfulClicked] = useState(false)
const [reportClicked, setReportClicked] = useState(false)

  function reportHandler(){
    if(reportClicked){
      return
    }
    toast.info("review has been reported", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    setReportClicked(true)
  }

  function incrementHelpful(){
    if(helpfulClicked){
      return
    }
    setHelpful(prev => prev +1)
    setHelpfulClicked(true)
  }

  return (
    <> {review? 
      <article className="py-4">
        <div className="flex items-center  flex-wrap mb-4 sm:space-x-4">
          <div className="flex justify-center items-center w-11 h-11  font-semibold bg-secondary rounded-full">
            {review.user_id.first_name[0].toUpperCase()}
          </div>
          <div className="space-y-1 font-medium ">
            {`${review.user_id.first_name}  ${review.user_id.last_name}`}
            <p className="block text-sm text-gray-500">
              Reviewed on{" "}
              <time dateTime="2017-03-03 19:00">{`${new Date(
                review.created_at
                ).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric"
              })}`}</time>
            </p>
          </div>
        </div>
        <div className="flex items-center mb-1">
          {!review.rating && (
            <>
              <EmptyRatingStarIcon />
              <EmptyRatingStarIcon />
              <EmptyRatingStarIcon />
              <EmptyRatingStarIcon />
              <EmptyRatingStarIcon />
            </>
          )}
          {review.rating < 2 && (
            <>
              <FilledRatingStarIcon />
              <EmptyRatingStarIcon />
              <EmptyRatingStarIcon />
              <EmptyRatingStarIcon />
              <EmptyRatingStarIcon />
            </>
          )}
          {review.rating < 3 && review.rating >= 2 && (
            <>
              <FilledRatingStarIcon />
              <FilledRatingStarIcon />
              <EmptyRatingStarIcon />
              <EmptyRatingStarIcon />
              <EmptyRatingStarIcon />
            </>
          )}
          {review.rating < 4 && review.rating >= 3 && (
            <>
              <FilledRatingStarIcon />
              <FilledRatingStarIcon />
              <FilledRatingStarIcon />
              <EmptyRatingStarIcon />
              <EmptyRatingStarIcon />
            </>
          )}
          {review.rating < 5 && review.rating >= 4 && (
            <>
              <FilledRatingStarIcon />
              <FilledRatingStarIcon />
              <FilledRatingStarIcon />
              <FilledRatingStarIcon />
              <EmptyRatingStarIcon />
            </>
          )}
          {review.rating == 5 && (
            <>
              <FilledRatingStarIcon />
              <FilledRatingStarIcon />
              <FilledRatingStarIcon />
              <FilledRatingStarIcon />
              <FilledRatingStarIcon />
            </>
          )}
          <h3 className="ml-2 text-sm font-semibold text-gray-900">
            {review.review_title}
          </h3>
        </div>
        <p className="mb-2 text-gray-500">{review.review_description}</p>
        {!flag &&  <aside>
          <p className="mt-1 text-xs text-green-500">
            {helpful} people found this helpful
          </p>
          <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
            <a
              onClick={incrementHelpful}
              className={` text-gray-900 ${helpfulClicked ? 'bg-white ': 'bg-gray-100 cursor-pointer border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 '} borderfont-medium rounded-lg text-xs px-2 py-1.5 `}
            >
              Helpfull
            </a>
            <a onClick={reportHandler} className={` pl-4 text-xs font-medium ${reportClicked ? 'text-gray-400 ': 'text-blue-600 hover:underline dark:text-blue-500 cursor-pointer'} `}>
              Report abuse
            </a>
          </div>
        </aside>}
      </article>
    : null}
    </>
  );
};

const FilledRatingStarIcon = () => {
  return (
    <>
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-yellow-500"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Rating star</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    </>
  );
};

const EmptyRatingStarIcon = () => {
  return (
    <>
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-gray-300"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Empty rating star</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    </>
  );
};

export default Review;
