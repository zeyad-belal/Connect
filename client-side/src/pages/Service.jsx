/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceImageCarousel from "../components/Service/ServiceImageCarousel";
import ServiceDetails from "../components/Service/ServiceDetails";
import ServicePanels from "../components/Service/ServicePanels";
import ServiceRoute from "../components/Service/ServiceRoute";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cartActions }  from "../store/cartSlice";
import {useDispatch} from "react-redux"
import { signModalActions } from "./../store/signModalSlice"
import axios from "axios";
import { CartIcon } from "./../components/Icons";
import Counter from "../components/Counter";

const Service = () => {
  const dispatch = useDispatch()
  const [service, setService] = useState(null);
  const [extrasCost, setExtrasCost] = useState(0);

  const [count, setCount] = useState(1);
  const { id } = useParams();
  const cartSectionRef = useRef(null);

  const handleAddItemToCart = (service) => {
      if (window.localStorage.getItem("logged")) {
        dispatch(cartActions.add({
          key: service._id,
          id: service._id,
          name: service.name,
          image: service.images[0].url,
          amount: count,
          price: service.new_price ?? service.price,
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




  useEffect(()=>{
    async function getService(){
      try{
        const repsonse = await  axios.get( `${import.meta.env.VITE_API_URL}/services/${id}`)
        setService(repsonse.data)
      }catch(error){
        toast.error(error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    }
    getService()
  },[])

  
  return (
    <>
        <div className="flex flex-col gap-5 bg-gray-100 p-7">
          {service && (
            <>
              <div className=" flex flex-col items-start">
                <ServiceRoute service={service} />
                <div className="flex flex-col lg:flex-row justify-between w-full items-start lg:items-center">
                  <h1 className="text-2xl mb-4 px-2 font-semibold text-text1">{service.name}</h1>
                  <button
                    onClick={() => cartSectionRef.current.scrollIntoView({ behavior: "smooth" }) }
                    className="bg-secondary border-2 border-transparent  text-white hover:bg-transparent hover:text-secondary transition-all hover:border-secondary focus:outline-none font-medium rounded text-md px-3 py-1 text-center inline-flex items-center ">
                    <CartIcon></CartIcon> Buy the service </button>
                </div>
              </div>

              <div className="flex gap-7">
                <div className="flex items-start gap-12  bg-white p-4 w-[80%]">
                    <div>
                  <ServiceImageCarousel  serviceImages={service.images} />
                    <p className="text-sm text-text1 lg:tracking-2xl my-8" >{service.description}</p>
                    </div>
                </div>

                <div className="flex flex-col items-start  bg-white  h-fit w-[30%]">
                  <ServiceDetails
                    service={service}
                    count={count}
                    handleCounterDecrement={handleCounterDecrement}
                    handleCounterIncrement={handleCounterIncrement}
                    handleAddItemToCart={handleAddItemToCart} />
                </div>
              </div>
              <div className="bg-white  px-5 max-w-[80%] flex flex-col items-start">
                <ServicePanels service={service} setExtrasCost={setExtrasCost} />
              </div>

              <div ref={cartSectionRef} className="bg-white flex flex-col justify-center items-center p-10">
                <h2 className="self-start text-2xl text-text1">Buy the service</h2>
                <div className="border-t w-full flex flex-col items-center mt-3 pt-3">
                  <div className="flex items-center gap-4 py-4 ">
                  <Counter
                    count={count}
                    handleCounterDecrement={handleCounterDecrement}
                    handleCounterIncrement={handleCounterIncrement} />
                  <span className="text-lg font-semibold"> subtotal: {(service.price * count) + extrasCost} </span>
                  </div>
                  <button
                    onClick={() => handleAddItemToCart(service)}
                    type="button"
                    className="bg-secondary border-2 border-transparent text-white hover:bg-transparent hover:text-secondary transition-all hover:border-secondary focus:outline-none font-medium rounded text-md px-3 py-2 text-center inline-flex items-center ">
                    <CartIcon></CartIcon> add to cart 
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
    </>
  );
};

export default Service;
