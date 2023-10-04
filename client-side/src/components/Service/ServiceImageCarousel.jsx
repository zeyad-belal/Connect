/* eslint-disable react/prop-types */
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/zoom";

import "./ServiceImageCarousel.css";

// import required modules
import { FreeMode, Navigation, Pagination, Thumbs, Zoom } from "swiper";

const ServiceImageCarousel = ({ serviceImages }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="relative w-[100%] flex justify-center items-center">
      <div className="flex gap-2 flex-shrink-0 flex-grow-0 basis-1/2 w-[90%]  h-auto mb-3">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction={"vertical"}
          slidesPerView={4}
          spaceBetween={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="first-swiper" >
          {serviceImages.map((image) => {
            return (
              <SwiperSlide key={image.fileId} >
                <div className="box-border border-2 border-gray-300 rounded-md cursor-pointer h-auto overflow-hidden w-full flex justify-center items-center transition-all duration-200 ease-in-out">
                  <div className="relative pb-[56%] pl-[73.327%] w-full ">
                    <div className="absolute inset-0 flex flex-col ">
                      <img src={image.url} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Swiper
          style={{
            "--swiper-navigation-size": "25px",
            "--swiper-navigation-color": "black",
            "--swiper-pagination-color": "grey"
          }}
          zoom={true}
          spaceBetween={5}
          navigation={true}
          pagination={{ clickable: true }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
          }}
          modules={[FreeMode, Navigation, Pagination, Zoom, Thumbs]}
          className="second-swiper"
        >
          {serviceImages.map((image) => {
            return (
              <SwiperSlide key={image.fileId}>
                <div className="swiper-zoom-container h-auto">
                  <img src={image.url} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ServiceImageCarousel;
