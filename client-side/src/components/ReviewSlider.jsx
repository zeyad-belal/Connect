/* eslint-disable react/prop-types */
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Review from "./Service/Review"


const ReviewSlider = ({userReviews, seller}) => {

console.log('sslidd',userReviews)


  return (
    <div className="bg-  max-w-[400px] rounded-lg overflow-hidden">
          <h1 className="mb-3 font-medium">what does they say about <span className="font-bold text-secondary "> {seller.first_name} </span> ? </h1>

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
          <SwiperSlide key={i} className="px-3 py-2 w-[100%]">
            <Review review ={review} flag={true} />
          </SwiperSlide>
        ))}
      </Swiper>: 
      <p>nothing here </p>}
    </div>
  );
};

export default ReviewSlider;
