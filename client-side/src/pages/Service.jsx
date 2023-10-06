/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceImageCarousel from "../components/Service/ServiceImageCarousel";
import ServiceDetails from "../components/Service/ServiceDetails";
import ServicePanels from "../components/Service/ServicePanels";
import ServiceRoute from "../components/Service/ServiceRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cartActions }  from "../store/cartSlice";
import {useDispatch} from "react-redux"
import { signModalActions } from "./../store/signModalSlice"
import axios from "axios";
import { CartIcon } from "./../components/Icons";
import Counter from "../components/Counter";
import { FaRegSadTear } from "react-icons/fa";
import { BiHappyAlt } from "react-icons/bi";
import Slider from "../UI/Slider";
import { useCookies } from "react-cookie";

const Service = () => {
  const [userLogged, setUserLogged] = useState(window.localStorage.getItem("logged"));
  const dispatch = useDispatch()
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState(null);
  const [extrasChosen, setExtrasChosen] = useState([]);
  const [extrasCost, setExtrasCost] = useState(0);
  const [extrasTime, setExtrasTime] = useState("");
  const [period, setPeriod] = useState("");
  const [LoadingState, setLoadingState] = useState(
    <div role="status " className="self-center mt-[90px]">
      <svg aria-hidden="true" className="inline w-12 h-12 mr-2 text-gray-100 animate-spin dark:text-gray-400 fill-text1" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>
  );
  const [cookies, setCookies] = useCookies(["User"]);

  const [count, setCount] = useState(1);
  const { id } = useParams();
  const cartSectionRef = useRef(null);

  const handleAddItemToCart = (service) => {

      if (window.localStorage.getItem("logged")) {
        if(service.user_id == cookies.User._id){
          return
        }

        dispatch(cartActions.add({
          key: service._id,
          id: service._id,
          name: service.name,
          image: service.images[0].url,
          amount: count,
          price: (service.price * count) + (extrasCost* count),
          extras: extrasChosen,
          time: period,
          seller:service.user_id
        }))
        toast.success("Item added to cart !", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
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
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(signModalActions.toggleModal());
      }
  };

  const handleCounterDecrement = () => {
    if (count > 1) {
      setCount((prevState) => prevState - 1);
    }
  };

  const handleCounterIncrement = () => {
    setCount((prevState) => prevState + 1);
  };


  const wordToNumber ={
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
  }
  const conversions ={
    "day" :1,
    "days" :1,
    "week": 7,
    "month" :30
  }

  function convertWordToNumber(word){
    return wordToNumber[word];
  }

  function convertToDays(input) {
    const parts = input.split(" ");
    const value = convertWordToNumber(parts[0]);
    const unit = parts[1];
    return value * conversions[unit];
  }

// handle service days
  useEffect(() => {
    if (extrasTime && extrasTime.length > 0) {
      let totalExtraDays = 0;
      extrasTime.forEach((extra) => {
        totalExtraDays += convertToDays(extra.time);
      });

      setPeriod(convertToDays(service.time) + totalExtraDays);
    }else{
      service? setPeriod(convertToDays(service.time)) :''
    }
  }, [extrasTime, service]);

// get service
  useEffect(()=>{
    async function getService(){
      try{
        const repsonse = await  axios.get( `${import.meta.env.VITE_API_URL}/services/${id}`)
        setService(repsonse.data)
        setPeriod(convertToDays(repsonse.data.extras[2][2]))
      }catch(error){
        toast.error(error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    }
    getService()
    setTimeout(()=>{
      setLoadingState(
      <>
      <h3 className="text-text1 self-center mt-[90px] font-bold text-6xl mb-[-10px]">OOPS !</h3>
      <p className=" self-center font-semibold text-2xl text-text1 flex items-center gap-3">Item not found <FaRegSadTear /></p>
      <button className="bg-secondary self-center w-[20%] rounded-md text-white font-medium py-1 hover:bg-secHover flex items-center justify-center gap-3 text-lg min-w-fit px-5"
      onClick={()=>location.reload()}
      >Retry  <BiHappyAlt size={22} /> ? </button>
      </>
      )
    },7000)
  },[id])

  // get related services
  useEffect(()=>{
    async function getRelatedServices(){
      const repsonse = await  axios.get( `${import.meta.env.VITE_API_URL}/services/filtered/${service.category_id._id}`)
      setRelatedServices(repsonse.data)
    }

    try{
      service ? getRelatedServices() : ''
    }catch(error){
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
    
  },[service])







// console.log('service',service)

  return (
    <>
        <div className="mt-[65px] flex flex-col min-h-[60vh] gap-5  bg-gray-100 p-3 md:p-10">
          {service && service.id == id ? (
            <>
              <div className=" flex flex-col items-start">
                <ServiceRoute service={service} />
                <div className="flex flex-col lg:flex-row justify-between w-full items-start lg:items-center">
                  <h1 className="lg:text-2xl md:text-lg sm:text-md text-md mb-4 px-2 font-semibold text-text1">{service.name}</h1>
                  <button onClick={() => cartSectionRef.current.scrollIntoView({ behavior: "smooth" }) }
                    className="bg-secondary border-2 border-transparent  text-white hover:bg-transparent hover:text-secondary transition-all hover:border-secondary focus:outline-none font-medium rounded text-md px-3 py-1 text-center inline-flex items-center ">
                    <CartIcon></CartIcon> Buy the service </button>
                </div>
              </div>
              {/* SERVICES IMAGES  */}
              <div className="flex flex-col lg:flex-row gap-5 justify-between">
                <div className="flex items-center gap-12  bg-white p-4 lg:w-[65%]">
                    <div className="max-w-full flex flex-col items-center p-2 ">
                      <ServiceImageCarousel  serviceImages={service.images} />
                      <p className="text-sm text-text1 lg:text-md my-8 px-1 " >{service.description}</p>
                    </div>
                </div>
                {/* SERVICES DETAILS  */}
                <div className="flex flex-col  bg-white  h-fit lg:w-[33%] p-2">
                  <ServiceDetails
                    service={service}
                    count={count}
                    handleCounterDecrement={handleCounterDecrement}
                    handleCounterIncrement={handleCounterIncrement}
                    handleAddItemToCart={handleAddItemToCart} />
                </div>
              </div> 
              {/* SERVICES PANELS  */}
              <div id="panels" className="bg-white  px-5 lg:max-w-[65%] flex flex-col items-start">
                <ServicePanels 
                  service={service}
                  setExtrasCost={setExtrasCost}
                  setExtrasTime={setExtrasTime}
                  setExtrasChosen={setExtrasChosen}
                />
              </div>
              {/* buy the service  */}
              <div ref={cartSectionRef} className="bg-white flex flex-col justify-center items-center p-10 lg:max-w-[65%]">
                <h2 className="self-start text-lg sm:text-2xl text-text1">Buy the service</h2>
                <div className="border-t w-full flex flex-col items-center mt-3 pt-3">
                  <div className="flex items-center gap-4 py-4 ">
                  <Counter
                    count={count}
                    handleCounterDecrement={handleCounterDecrement}
                    handleCounterIncrement={handleCounterIncrement} />
                  <span className="text-lg font-semibold"> subtotal: {(service.price * count) + (extrasCost* count)}$</span>
                  </div>
                  <div className="text-md italic mb-5">this service will take up to : {period} days</div>
                  <button
                    onClick={() => handleAddItemToCart(service)}
                    type="button"
                    className={`${service.user_id == ( userLogged && cookies.User._id) ? 'bg-gray-400 cursor-not-allowed': 'bg-secondary hover:bg-transparent hover:text-secondary hover:border-secondary'}  border-2 border-transparent text-white  transition-all  focus:outline-none font-medium rounded text-md px-3 py-2 text-center inline-flex items-center `}>
                    <CartIcon></CartIcon> add to cart 
                  </button>
                </div>
              </div>
              {/* related services  */}
              <div className="my-3 sm:my-6 md:my-8 lg:my-12">
                <h1 className="text-2xl font-medium mb-6 ml-2">Related services</h1>
                {relatedServices && <Slider services={relatedServices} />}
              </div>
            </>
          )
          :
          // loader 
          <div role="status " className="self-center mt-[90px]">
            <svg aria-hidden="true" className="inline w-12 h-12 mr-2 text-gray-100 animate-spin dark:text-gray-400 fill-text1" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          </div>
        }
        {!service && LoadingState}
        </div>
      <ToastContainer />

    </>
  );
};

export default Service;
