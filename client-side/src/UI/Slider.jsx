/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Import Swiper React components
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CartContext from "../context/CartContext";
import UserContext from "../context/UserContext";
import { Grid, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "react-toastify/dist/ReactToastify.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";

import { CartIcon, FilledRatingStarIcon } from "../components/Icons";
import {
  BestSellerBadge,
  NewArrivalBadge,
  SaleBadge
} from "../components/Badges";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useCartContext } from "../context/CartProvider";
import axios from "axios";
// import { useGlobalContext } from "../context/ProductsContext";

// import required modules

const Slider = ({ products }) => {
  // you will need this variable to return a loading indicator  while fetching the products
  // const { loading } = useGlobalContext();

  const myCart = useContext(CartContext);
  const userCTX = useContext(UserContext);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const {updatedStock} = useCartContext()


  async function addItemToCart(product) {
    try{
      const response =  await axios.get(`${import.meta.env.VITE_API_URL}/products/${product.id}`)

      if(response.data.stock_count > 0){
        if (window.localStorage.getItem("logged")) {
          myCart.addItem({
            key: product._id,
            id: product._id,
            name: product.name,
            image: product.images[0].url,
            amount: 1,
            price: product.new_price ? product.new_price : product.price
          })
          updatedStock("add", 1 , response.data)
          toast.success("Item added to cart !",{
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          })
        } else {
          toast.info("Sign in first !", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
          userCTX.toggleModal();
        }
      }else{
        toast.info("Item out of stock !", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSlidesPerView(5);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(2);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="my-12">
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
        modules={[Grid, Navigation]}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col border px-4 py-3 bg-white rounded-lg">
              <Link
                to={`products/${product._id}`}
                className="flex flex-col justify-center items-center gap-2"
              >
                <figure className="relative max-w-[150px]">
                  <img src={product.images[0]?.url} />

                  <div className="absolute top-2 left-0">
                    {product.bestseller && <BestSellerBadge />}

                    {product.new_arrival && <NewArrivalBadge />}

                    {product.new_price !== 0 && <SaleBadge />}
                  </div>
                </figure>

                <span className="font-semibold tracking-tight text-center text-gray-800">
                  {product.name.slice(0, 45)}...
                </span>
                <div className="flex items-center border-2 bg-gray-50 border-yellow-500 rounded-full w-fit px-2">
                  <FilledRatingStarIcon />
                  <span className="text-yellow-500 font-semibold ml-1">
                    {product.avg_rating}
                  </span>
                </div>
                {product.new_price === 0 && (
                  <span className="text-gray-500">EGP{product.price}</span>
                )}
                {product.new_price != 0 && (
                  <div className=" flex gap-2">
                    <span className="line-through text-gray-500">
                      EGP{product.price}
                    </span>
                    <span className=" font-semibold text-gray-800">
                      EGP{product.new_price}
                    </span>
                  </div>
                )}
              </Link>
              <button
                onClick={() => addItemToCart(product)}
                className="flex justify-center items-center border border-slate rounded-lg p-2 mt-3 bg-gray-100 hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <CartIcon />
                <span className="text-xs sm:text-sm">Add to Cart</span>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
