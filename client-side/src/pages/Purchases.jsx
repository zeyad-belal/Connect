/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { FilterIcon, HomeIcon, RightArrowIcon } from "../components/Icons";
import StatusFilter from "../components/StatusFilter";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { PiArrowSquareInBold } from "react-icons/pi";
import {  AiOutlineSmile, AiTwotoneStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";


function Purchases() {
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reviewMenu, setReviewMenu] = useState(false);
  const [currentStatus, setCurrentStatus] = useState([]);
  const navigate = useNavigate();


  const [LoadingState, setLoadingState] = useState(
    <div role="status " className=" flex justify-center items-center ">
    <svg aria-hidden="true" className="inline w-7 h-7 mr-2 text-gray-100 animate-spin dark:text-gray-400 fill-text1" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  </div>
  );

  const [rating, setRating] = useState(0); 

  const handleStarClick = (star) => {
    setRating(star); 
  };

  function  toggleReviewModal(e,item){
    if(item.reviewed == true){
      return
    }

    setReviewMenu(prev => !prev)
  }

  async function handleReviewSubmit(event,item) {
    event.preventDefault();
    if(rating< 1){
      toast.info("Must provide a star rate !", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      })
      return
    }
    
    try{
      const formData = new FormData();

      formData.append('review_title', event.target.review_title.value)
      formData.append('review_description', event.target.review_description.value)
      formData.append('rating', event.target.rating.value)
      formData.append('user_id', event.target.user_id.value)
      formData.append('service_id', item.service_id._id)
      formData.append('seller_id', item.seller._id)


      const response = await axios.post( `${import.meta.env.VITE_API_URL}/reviews`,
          formData,
        { headers: { Authorization: `${cookies.UserToken}` } }
        );

        await axios.patch( `${import.meta.env.VITE_API_URL}/orders/reviewed/${item.orderID}`,
          {reviewed: true},
        { headers: { Authorization: `${cookies.UserToken}` } }
        );

        toast.success(`review has been submited ! ${cookies.User.first_name}!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        toggleReviewModal()
        window.location.reload()
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }




  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  function handleStatusChange(e) {
    const id = e.target.id;
  
    if (e.target.checked) {
      setCurrentStatus((prevStatus) => [...prevStatus, id]);
    } else {
      setCurrentStatus((prevStatus) => prevStatus.filter((status) => status !== id));
    }
  }
  

  function startChatHandler(e, item) {
    if(item.status == "delivered"){
      return
    }
    const room = `${item.seller.id}${item.buyer.id}`;
    const sellerID = item.seller.id; 
    const buyerID = item.buyer.id; 
    navigate(`/chat/${room}?sellerID=${sellerID}&buyerID=${buyerID}&orderID=${item.orderID}`);
  }


  //get all orders
  useEffect(() => {
    async function getOrderHistory() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/buyer/${cookies.User._id}`,
        { headers: { Authorization: `${cookies.UserToken}` } }
      );
      const data = await response.data.order.map((order) => order)

      const allOrdersData = data.flatMap((ordersData) =>
      ordersData.items.map((item) => ({
        reviewed: ordersData.reviewed,
        orderID:ordersData._id,
        buyer: ordersData.buyer,
        created_at: ordersData.created_at,
        id: ordersData._id,
        quantity: item.quantity,
        name: item.service_id.name,
        avg_rating: item.service_id.avg_rating,
        service_id: item.service_id,
        description: item.service_id.description,
        image: item.service_id.images[0].url,
        seller: item.service_id.user_id,
        status: item.status,
        price: item.price,
        time: item.time,
        extras: item.extras,
      }))
    );
    
      setAllOrders(allOrdersData.flatMap((order) => order))

    }
    if (window.localStorage.getItem("logged")) {
      getOrderHistory();
    }
    setTimeout(()=>{
      setLoadingState(
      <div className="flex flex-col justify-center items-center gap-3">
        <p className=" self-center  text-md text-text1 flex items-center gap-3">no purchased items found</p>
      </div>
      )
    },2000)
  }, [ cookies.User._id, cookies.UserToken]);


  //filter orders by status
  useEffect(()=>{
    if(currentStatus.length < 1 ){
      return
    }
    let filteredOrders = allOrders
    .flatMap((order) => order) 
    .filter((item) => {
      return currentStatus.includes(item.status);
    });
  
    setFilteredOrders(filteredOrders);

  },[allOrders,currentStatus])

// console.log('allOrders',allOrders)

  
  return (
    <div className="bg-primary mt-[65px] py-6 px-6 relative">
      {/* ---------------------------filter icon------------------------*/}
      <div className="z-30 md:hidden fixed min-w-0 max-w-full block top-[90%] left-3 ">
        <button
          className=" rounded-full bg-secondary p-3 focus:outline-none"
          onClick={toggleMenu}>
          <FilterIcon />
        </button>
      </div>
      {/* ----------------------------route------------------------------*/}
      <div className="flex items-center text-gray-500">
          <Link to={'/'}  >
            <p className="ml-2 text-gray-500 text-sm cursor-pointer flex"> <HomeIcon />  </p>
          </Link>
          <RightArrowIcon className="text-gray-500" />
          <h1 className="text-lg ">Purchased items</h1>
      </div>


      <div className="gap-6 flex flex-col md:flex-row  ">
        {/* ----------------------------filter-------------------------------*/}
        <StatusFilter handleStatusChange={handleStatusChange} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* ------------------------------orders------------------------------------------ */}
        <div className="max-w-[1100px] w-full py-3 my-10 px-3 h-fit bg-white rounded-sm ">

        {/* -----------------------displaying orders if any ------------------------------ */}
          {allOrders.length > 0 && 
            <div className="py-3 text-gray-500 flex flex-col ">
              {(currentStatus.length ? filteredOrders : allOrders).map((item,index) => {
                  return (
                    <div className={`flex justify-between flex-col ${ allOrders.length == 1 || allOrders.length - 1 == index ? "" : "border-b" }`} key={index}>
                    <div
                      className={`text-text1 w-full flex flex-col  sm:flex-row justify-start  my-1 px-3 py-2`} >
                      <img
                        className="max-w-[220px]  h-auto mr-6 mb-2 sm:mb-0 self-center md:self-start"
                        src={item.image}
                        alt="Image not Found" />
                      <div className="mr-2 flex flex-col ">
                        <h5 className="sm:text-md text-sm font-semibold text-text1 mb-3">
                          {item.name}
                        </h5>

                        {item.status == "pending" && (
                          <span className=" w-fit mb-1 bg-gray-400 text-text1 px-[5px] py-[3px] text-xs font-medium rounded-lg">
                            pending
                          </span>
                        )}
                        {item.status == "inProgress" && (
                          <span className=" w-fit mb-1 bg-secondary text-text1 px-[5px] py-[3px] text-xs font-medium rounded-lg ">
                            in progress
                          </span>
                        )}
                        {item.status == "delivered" && (
                          <span className=" w-fit mb-1 bg-green-400 text-text1 px-[5px] py-[3px] text-xs font-medium rounded-lg ">
                            delivered
                          </span>
                        )}
                        {item.status == "canceled" && (
                          <span className=" w-fit mb-1 bg-red-400 text-text1 px-[5px] py-[3px] text-xs font-medium rounded-lg ">
                            canceled
                          </span>
                        )}

                        <div className="mr-3 font-semibold text-sm flex gap-4 relative mt-1">
                          <span>$ {item.price * item.quantity} </span>
                          <span> Q : {item.quantity}</span>
                        </div>
                        <span> seller : {item.seller.first_name} {item.seller.last_name}</span>

                        {item.extras[0] && (
                          <div className="mt-4 mb-1 text-xs text-gray-500 pb-2">
                            <h4 className="text-sm text-gray-600 mb-1">Extras</h4>
                            {item.extras.map((extra, index) => {
                              return <p key={index}>-{extra}</p>;
                            })}
                          </div>
                        )}

                        <div className="flex justify-between items-center ">
                          <p className=" text-gray-500 font-semibold text-[11px]  ">
                            purchased at :
                            {` ${new Date(item.created_at)
                              .getDate()
                              .toString()
                              .padStart(2, "0")}/${(
                              new Date(item.created_at).getMonth() + 1
                            )
                              .toString()
                              .padStart(2, "0")}/${new Date(
                              item.created_at
                            ).getFullYear()}`}
                          </p>

                        </div>
                      </div>
                    </div>
                    <div className={`flex ${item.status == "delivered"? "justify-between" : " justify-end"}  mb-2 mx-2`}>
                      {item.status == "delivered" ? <button onClick={(e)=>toggleReviewModal(e,item)} className={`${item.reviewed ==true ? 'bg-gray-400 cursor-not-allowed text-white ' : 'bg-secondary hover:bg-secHover'}  self-end sm:text-xs text-[0.6rem]   gap-1 text-text1 rounded-lg sm:p-2 p-1 font-semibold flex items-center sm:gap-2`}>
                      <PiArrowSquareInBold size={18} /> <span>  Write  a  review </span> </button> : null}
                      <button
                        className={`${item.status == "delivered" ? 'bg-gray-400 cursor-not-allowed': 'bg-green-400 hover:bg-green-600 '} flex sm:gap-2 gap-1 items-center font-semibold  text-white p-1 sm:p-2 sm:text-xs text-[0.6rem]   rounded-lg ml-3 self-end`}
                        onClick={(e) => startChatHandler(e,item)} >
                        <HiOutlineChatAlt2 size={18} /> Chat with the seller 
                      </button>
                    </div>
                    {reviewMenu ? (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        {/* Dark overlay */}
                        <div className="fixed inset-0 bg-black opacity-90 " onClick={toggleReviewModal}></div>
                      
                        {/* Modal content */}
                        <form onSubmit={(e)=>handleReviewSubmit(e,item)} className="relative w-[340px] sm:w-[500px] text-white p-12 rounded-lg shadow-lg flex flex-col gap-5">
                          
                          <div>
                            <div className="text-xl mb-2 font-semibold flex items-center gap-2">Rate the service <span className="text-secHover"> <AiOutlineSmile /> </span></div>
                            <div className="text-xs  text-gray-400 font-medium">We encourage leaving an honest review about the service and the seller to help other users determine whether its a sutiable one for them or not.</div>
                          {/* stars  */}
                          <div className="flex gap-1 mt-3 mx-auto w-fit">
                            {/* Render 5 stars */}
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                type="button"
                                key={star}
                                onClick={() => handleStarClick(star)}
                                className={`text-lg ${star <= rating ? 'text-yellow-500' : 'text-gray-300'} focus:outline-none`}>
                                <AiTwotoneStar size={22} />
                              </button>
                            ))}
                          </div>
                          </div>
                          <input type="text" name="review_title" required className="border-2 rounded-md font-semibold  p-1 pl-3 outline-none text-text1" placeholder="review title" />
                          <textarea name="review_description" required className="border-2 rounded-md font-semibold  p-3 h-[100px] outline-none text-text1"  placeholder="review description" ></textarea>
                          <input type="number" name="rating" required className="hidden" value={rating} />
                          <input type="text" name="service_id" className="hidden" defaultValue={item.id} />
                          <input type="text" name="user_id" className="hidden" defaultValue={cookies.User._id} />
                          <input type="text" name="seller_id" className="hidden" defaultValue={item} />
                            <button 
                              className="bg-secondary text-white px-4 py-2  rounded hover:bg-secHover">
                              submit
                            </button>
                        </form>
                      </div>
                      ) : null}
                  </div>
                
                
                
                
                
                );
              })}
            </div>
          }
          {/* ----------------------------no orders found message------------------------------------ */}
          {(!filteredOrders.length && !allOrders.length > 0 )  && LoadingState} 

   
        </div>
      </div>
      <ToastContainer />

    </div>
  );
}

export default Purchases;


