import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ads = [
  "https://smhttp-ssl-73217.nexcesscdn.net/pub/media/wysiwyg/june_2023/anker_mainbanner_web_en.jpg",
  "/intel_mainbanner_web_ar_new.jpg",
  "/bank_mainbanner_ar_web_new.jpg",
  "/intelbanner_web_ar.jpg"
];

const AdsSlider = () => {
  return (
    <div className="container mx-auto mt-24 max-w-[1100px]">
      <Swiper
        className="ads-slider"
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          width: "90%",
          margin: "0 auto"
        }}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {ads.map((ad) => (
          <SwiperSlide key={Math.random()}>
            <img className="w-full" src={ad} alt="Image not Found" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsSlider;
