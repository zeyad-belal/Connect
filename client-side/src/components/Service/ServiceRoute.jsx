/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { HomeIcon, RightArrowIcon } from "../Icons";

const ServiceRoute = ({ service }) => {
  // console.log(service);
  return (
    <>
      <div className="flex flex-wrap text-sm font-semibold text-gray-500  lg:justify-center lg:items-center p-2">
        <Link to="/">
          <HomeIcon />
        </Link>

        <RightArrowIcon />

        <Link to={`/services?category=${service.category_id.category_name}`}>
          <span className="pb-[2px]">{service.category_id.category_name}</span>
        </Link>

        <RightArrowIcon />

        <span className=" break-words">{service.name}</span>
      </div>
    </>
  );
};

export default ServiceRoute;
