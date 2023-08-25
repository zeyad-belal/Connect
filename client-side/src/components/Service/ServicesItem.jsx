/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {RatingBadge} from "../Badges";
import { CartIcon } from "../Icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch} from "react-redux"
import { signModalActions } from "./../../store/signModalSlice"
import { cartActions } from "../../store/cartSlice"

const ServicesItem = ({ item }) => {
  const dispatch = useDispatch()


  async function addItemToCart(service) {
    if (window.localStorage.getItem("logged")) {
      dispatch(cartActions.add({
        key: service._id,
        id: service._id,
        name: service.name,
        image: service.images[0].url,
        amount: 1,
        price: service.price,
      }))

      toast.success("Item added to cart !", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
      });
    } else {
      toast.info("Sign in first !", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
      });
      dispatch(signModalActions.toggleModal());
    }
  }

  
  return (
    <>
      <div className="py-1 m-2  transition-shadow duration-300">
        <div className="flex flex-col justify-between h-full">
          <Link to={`/services/${item.id}`}>
            <div className={`relative`}>
              <img
                src={item.images[0].url}
                alt="Image Not Found"
                className="w-full " />
              <div className="absolute bottom-2 left-2 w-[30px] h-[30px] bg-white p-[1px] shadow-md rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={item.user_id.avatar}
                    alt="User Avatar"
                  />
                </div>
            </div>
          
            <div className=" mt-1 flex flex-col justify-start">
                <h3 className="text-text1 my-2 text-left hover:text-secHover font-semibold self-start">
                  {item.name}
                </h3>
              <div className="flex flex-col ">
                <RatingBadge avg_rating={item.avg_rating ? item.avg_rating : 0} />
                <div className="flex  my-1 text-gray-700 text-md">
                      starts from <span className="font-bold ml-1"> ${item.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => addItemToCart(item)}
                  className="flex justify-center items-center border border-slate text-white rounded-lg p-2 bg-secondary hover:bg-secHover hover:text-text1 transition-all duration-300" >
                  <CartIcon />
                  <span>Add to Cart</span>
                </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ServicesItem;
