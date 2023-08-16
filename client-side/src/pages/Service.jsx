/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceImageCarousel from "../components/Service/ServiceImageCarousel";
import ServiceDetails from "../components/Service/ServiceDetails";
import ServicePanels from "../components/Service/ServicePanels";
import ServiceRoute from "../components/Service/ServiceRoute";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cartActions, updatedStock }  from "../store/cartSlice";
import {useSelector, useDispatch} from "react-redux"
import { signModalActions } from "./../store/signModalSlice"


const ServicePage = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state)=> state.cart);

  const [service, setService] = useState(null);
  const [count, setCount] = useState(1);
  const { id } = useParams();




  const handleAddItemToCart = (service) => {
    if (service.stock_count >= count) {
      if (window.localStorage.getItem("logged")) {
        dispatch(cartActions.add({
          key: service._id,
          id: service._id,
          name: service.name,
          image: service.images[0].url,
          amount: count,
          price: service.new_price ?? service.price,
        }))
        updatedStock("add", count, service);
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
    } else {
      toast.info(`Only ${service.stock_count} left in stock!`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // handleCounterDecrement
  const handleCounterDecrement = () => {
    if (count > 1) {
      setCount((prevState) => prevState - 1);
    }
  };
  // handleCounterIncrement
  const handleCounterIncrement = () => {
    setCount((prevState) => prevState + 1);
  };

  // HERE INSTEAD OF FETCHING THE DATA, MAKE USE OF THE ONE IN THE GLOBAL CONTEXT
  // AND DON'T FORGET ABOUT THE LOADING FUNCTIONALITY! (-_-)
  useEffect(() => {
    async function getService() {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/services/${id}`
      );
      setService(data);
    }

    try {
      getService();
    } catch (error) {
      // console.log(error)
      toast.info("something went wrong !", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [cart]);

  // console.log(service)
  return (
    <>
      <div>
        <div className="flex flex-col gap-5 bg-gray-100 p-5">
          {service && (
            <>
              <div className="bg-white flex px-5">
                <ServiceRoute service={service} />
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-5 bg-white p-10">
                <ServiceImageCarousel ServiceImages={service.images} />
                <ServiceDetails
                  service={service}
                  count={count}
                  handleCounterDecrement={handleCounterDecrement}
                  handleCounterIncrement={handleCounterIncrement}
                  handleAddItemToCart={handleAddItemToCart}
                />
              </div>
              <div className="bg-white  px-5">
                <ServicePanels service={service} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ServicePage;
