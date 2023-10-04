/* eslint-disable react/prop-types */
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Review from "./Service/Review"


const ReviewSlider = ({userReviews}) => {



  return (
    <div className=" md:max-w-[400px] max-w-[90%] rounded-lg overflow-hidden">

      {userReviews ? 
      <Swiper
        className=" min-w-[100%] "
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          width: "10%",
          margin: "0 auto"
        }}
        spaceBetween={5}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >

        {userReviews.map((review,i) => (
          <SwiperSlide key={i} className="sm:px-3 py-4 w-[100%]">
            <Review review ={review} flag={true} />
          </SwiperSlide>
        ))}
      </Swiper>: 
      <p>nothing here </p>}
    </div>
  );
};

export default ReviewSlider;
