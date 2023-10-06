/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Import Swiper React components
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Grid, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "react-toastify/dist/ReactToastify.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";


import { FilledRatingStarIcon } from "../components/Icons";

// import required modules

const Slider = ({ services }) => {

  const [slidesPerView, setSlidesPerView] = useState(5);

  // control slides num 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSlidesPerView(5);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(3);
      }else if (window.innerWidth >= 515) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="">
      <Swiper
        style={{
          "--swiper-navigation-color": "black",
          "--swiper-pagination-color": "black"
        }}
        slidesPerView={slidesPerView}
        grid={{
          rows: 1
        }}
        spaceBetween={20}
        navigation={true}
        modules={[Grid, Navigation]} >

        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col border mx-auto px-2 py-3 max-h-[300px] max-w-[260px] bg-white rounded-lg">
              <Link
                to={`/service/${service._id}`}
                className="flex flex-col justify-between items-center gap-2 min-h-[255px] " >
                <figure className="relative max-w-[230px] ">
                  <img src={service.images[0]?.url} />
                </figure>

                <span className="font-semibold tracking-tight text-center text-sm text-gray-800">
                  {service.name.slice(0, 50)}...
                </span>
                <div className="flex items-center border-2 bg-gray-50 border-yellow-500 rounded-full w-fit px-2">
                  <FilledRatingStarIcon />
                  <span className="text-yellow-500 font-semibold ml-1 ">
                    {service.avg_rating || 0}
                  </span>
                </div>
                  <span className="text-gray-500 ">starts from ${service.price}</span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
