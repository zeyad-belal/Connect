/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Counter from "../Counter";

import { RatingBadge } from "../Badges";

const ServiceDetails = ({service}) => {
  return (
    <div className="py-3 pl-3">
        <div className=" pb-4 ">
          <h3 className="text-lg font-medium text-text1 mb-6 border-b pb-3 ">Service Details</h3>
          {/* Tags */}     
            <div className="flex items-center">
              <RatingBadge avg_rating={service.avg_rating}></RatingBadge>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
              <a
                href="#panels"
                className="text-md mb-[2px] font-medium text-gray-900 underline hover:no-underline" >
                {service.reviews.length} reviews
              </a>
            </div>
          
        </div>
        <div className="flex flex-wrap items-center gap-5  py-4">
          <div className="flex items-end gap-2 text-text1">
            <span>Price starts from:</span>

              <div className="text-xl font-semibold whitespace-nowrap">
                ${service.price}
              </div>
          </div>
        </div>
          <p className="py-4">Delivery Period: <span className="font-semibold"> {service.time} </span> </p>
    </div>
  );
};

export default ServiceDetails;
