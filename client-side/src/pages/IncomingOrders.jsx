/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FilterIcon, HomeIcon, RightArrowIcon } from "../components/Icons";
import { Link } from "react-router-dom";
import StatusFilter from "../components/StatusFilter";
import { BsChatFill } from "react-icons/bs";


function IncomingOrders() {
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const [allIncomingOrders, setAllIncomingOrders] = useState([]);
  const [filteredIncomingOrders, setFilteredIncomingOrders] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState([]);


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

  function startChatHandler(e){
    console.log(e.target)
  }

  //get all Incoming orders for this user
  useEffect(() => {
    async function getIncomingOrderHistory() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/incomingOrders/user/${cookies.User._id}`,
        { headers: { Authorization: `${cookies.UserToken}` } }
      );
      const data = await response.data.incomingOrder.map((order) => order)
      const allIncomingOrdersData = data.flatMap((ordersData) =>
      ordersData.items.map((item) => ({
        id: ordersData._id,
        buyer: ordersData.user_id,
        quantity: item.quantity,
        created_at: ordersData.created_at,
        name: item.service_id.name,
        avg_rating: item.service_id.avg_rating,
        description: item.service_id.description,
        image: item.service_id.images[0].url,
        seller: item.service_id.user_id,
        status: item.status,
        price: item.price,
        time: item.time,
        extras: item.extras,
      }))
    );
    
      setAllIncomingOrders(allIncomingOrdersData.flatMap((order) => order))

    }
    if (window.localStorage.getItem("logged")) {
      getIncomingOrderHistory();
    }
  }, [ cookies.User._id, cookies.UserToken]);


  //filter orders by status
  useEffect(()=>{
    if(currentStatus.length < 1 ){
      return
    }
    let filteredOrders = allIncomingOrders
    .flatMap((order) => order) 
    .filter((item) => {
      return currentStatus.includes(item.status);
    });
  
    setFilteredIncomingOrders(filteredOrders);

  },[allIncomingOrders,currentStatus])




  return (
    <div className="bg-primary py-6 px-6 relative">
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


      <div className="gap-6 lg:gap-12 flex flex-col md:flex-row  lg:ml-8 ">
        {/* ----------------------------filter-------------------------------*/}
        <StatusFilter handleStatusChange={handleStatusChange} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* ------------------------------orders------------------------------------------ */}
        <div className="max-w-[850px] w-full py-3 my-10 px-3 h-fit bg-white rounded-sm ">

        {/* -----------------------displaying orders if any ------------------------------ */}
          {allIncomingOrders.length > 0 && 
            <div className="py-3 text-gray-500 flex flex-col items-start ">
              {(currentStatus.length ? filteredIncomingOrders : allIncomingOrders).map((item,index) => {
                return(  
                  <div 
                    className={`text-text1 w-full flex flex-col  sm:flex-row justify-start  my-1 ${allIncomingOrders.length == 1 || allIncomingOrders.length -1 == index ? '' : 'border-b'} px-3 py-2`}
                    key={index} >
                    <img
                      className="max-w-[220px]  h-auto mr-6 mb-2 sm:mb-0 self-center md:self-start"
                      src={item.image}
                      alt="Image not Found" />
                    <div className="mr-2 flex flex-col ">
                      <h5 className="text-md font-semibold text-text1 mb-3">{item.name}</h5>

                      {item.status == 'pending' &&
                        <span className=' w-fit mb-1 bg-gray-400 text-text1 px-[5px] py-[3px] text-xs font-medium rounded-lg'>pending</span>}
                      {item.status == 'inProgress' &&
                        <span className=' w-fit mb-1 bg-secondary text-text1 px-[5px] py-[3px] text-xs font-medium rounded-lg '>in progress</span>}
                      {item.status == 'waitingForDelivery' &&
                        <span className=' w-fit mb-1 bg-secHover text-text1 px-[5px] py-[3px] text-xs font-medium rounded-lg '>waiting for delivery</span>}
                      {item.status == 'delivered' &&
                        <span className=' w-fit mb-1 bg-green-400 text-text1 px-[5px] py-[3px] text-xs font-medium rounded-lg '>delivered</span>}
                      {item.status == 'canceled' &&
                        <span className=' w-fit mb-1 bg-red-400 text-text1 px-[5px] py-[3px] text-xs font-medium rounded-lg '>canceled</span>}

                      <div className="mr-3 font-semibold text-sm flex gap-4 relative mt-1">
                        <span>$ {item.price * item.quantity} </span>
                        <span> Q : {item.quantity}</span>
                      </div>  

                      {item.extras[0] &&<div className="mt-4 mb-1 text-xs text-gray-500 pb-2">
                        <h4 className="text-sm text-gray-600 mb-1">Extras</h4>
                        {item.extras.map((extra, index)=>{
                          return (
                            <p key={index} >-{extra}</p>
                          )
                        })}
                      </div>}

                      <div className="flex justify-between items-center ">
                        <p className=" text-gray-500 font-semibold text-[11px]  ">
                          purchased at : 
                          {` ${new Date(item.created_at).getDate().toString().padStart(2, '0')}/${(new Date(item.created_at).getMonth() + 1).toString().padStart(2, '0')}/${new Date(item.created_at).getFullYear()}` }
                        </p>

                        <button 
                        className="bg-green-400  hover:bg-green-600 text-white p-4 text-2xl rounded-full"
                        onClick={(e)=>startChatHandler(e)} >
                          <BsChatFill />
                        </button>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>
          }
          {/* ----------------------------no orders found message------------------------------------ */}
          {(!filteredIncomingOrders.length && !allIncomingOrders.length > 0 )  && (
            <p className="flex justify-center items-center py-3 text-gray-500 ">
              No purchased items found.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default IncomingOrders;
