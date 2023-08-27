/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Counter from "../Counter";

import { RatingBadge } from "../Badges";

const ServiceDetails = ({
  count,
  handleCounterDecrement,
  handleCounterIncrement,
  handleAddItemToCart,
  service
}) => {
  return (
    <>
      <div className="md:max-w-[50%] min-w-0 border-l-2 px-5 lg:ml-12">
        <div className="border-b pb-4">
          {/* Tags */}     
            <div className="flex items-center">
              <RatingBadge avg_rating={service.avg_rating}></RatingBadge>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
              <a
                href="#reviews"
                className="text-md mb-[2px] font-medium text-gray-900 underline hover:no-underline" >
                {service.reviews.length} reviews
              </a>
            </div>
          
        </div>
        <div className="flex flex-wrap items-center gap-5 border-b py-4">
          <div className="flex items-end gap-2 text-text1">
            <span>Price starts from:</span>

              <div className="text-xl font-bold whitespace-nowrap">
                ${service.price}
              </div>
          </div>
        </div>
          <p className="border-b py-4">Delivery Period: {service.time}</p>
          <div className="flex items-center gap-4 py-4">
            <Counter
              count={count}
              handleCounterDecrement={handleCounterDecrement}
              handleCounterIncrement={handleCounterIncrement} />

          </div>
      </div>
    </>
  );
};

export default ServiceDetails;
