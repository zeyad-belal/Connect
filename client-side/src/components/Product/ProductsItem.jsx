/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import {
  BestSellerBadge,
  NewArrivalBadge,
  RatingBadge,
  SaleBadge
} from "../Badges";
import { CartIcon } from "../Icons";
import UserContext from "../../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCartContext } from "../../context/CartProvider";
import axios from "axios";



const ProductsItem = ({ item }) => {
  const myCart = useContext(CartContext);
  const userCTX = useContext(UserContext)
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
          price: product.new_price ?? product.price
        })
        updatedStock("add", 1, response.data)

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
          userCTX.toggleModal()
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

  return (
    <>
      <div className="p-3 m-2 border border-slate rounded-lg hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col justify-between text-center h-full">
          <Link to={`/products/${item.id}`}>
            <div className={`relative -z-30`}>
              <img
                src={item.images[0].url}
                alt="Image Not Found"
                className="w-full rounded"
              />
              <div className="absolute top-0 left-0">
                {item.bestseller && <BestSellerBadge />}

                {item.new_arrival && <NewArrivalBadge />}

                {item.new_price !== 0 && <SaleBadge />}
              </div>
            </div>

            <h3 className="font-light my-2 hover:text-orange-500">
              {item.name.length > 40
                ? `${item.name.slice(0, 41)}...`
                : item.name}
            </h3>
          </Link>
          <div className="flex flex-col justify-center items-center">
            <RatingBadge avg_rating={item.avg_rating} />

            {!item.new_price && (
              <>
                <div className="flex gap-1 justify-center items-center">
                  <span className="my-2 text-gray-700 text-center text-lg">
                    EGP{item.price}
                  </span>
                </div>
              </>
            )}
            {item.new_price !== 0 && (
              <>
                <div className="flex gap-1 justify-center items-center">
                  <span className="my-2 line-through text-gray-400 text-center text-sm">
                    EGP{item.price}
                  </span>
                  <span className="my-2 text-gray-700 text-center text-lg">
                    EGP{item.new_price}
                  </span>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => addItemToCart(item)}
            className="flex justify-center items-center border border-slate rounded-lg p-2 bg-gray-100 hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            <CartIcon />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductsItem;
