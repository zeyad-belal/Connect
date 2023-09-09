/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { FilterIcon, HomeIcon, RightArrowIcon } from "../components/Icons";
import StatusFilter from "../components/StatusFilter";

function Purchases() {
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
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
  


  //get all orders
  useEffect(() => {
    async function getOrderHistory() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/user/${cookies.User._id}`,
        { headers: { Authorization: `${cookies.UserToken}` } }
      );
      const data = await response.data.order.map((order) => order)

      const allOrdersData = data.flatMap((ordersData) =>
      ordersData.items.map((item) => ({
        id: ordersData._id,
        buyer: ordersData.user_id,
        quantity: item.quantity,
        status: item.status,
        created_at: ordersData.created_at,
        name: item.service_id.name,
        avg_rating: item.service_id.avg_rating,
        description: item.service_id.description,
        image: item.service_id.images[0].url,
        price: item.service_id.price,
        time: item.service_id.time,
        extras: item.service_id.extras,
        seller: item.service_id.user_id,
      }))
    );
    
      setAllOrders(allOrdersData.flatMap((order) => order))

    }
    if (window.localStorage.getItem("logged")) {
      getOrderHistory();
    }
  }, [ cookies.User._id, cookies.UserToken]);


  //filter services by status
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


      <div className="gap-6 flex flex-col md:flex-row  ">
        {/* ----------------------------filter-------------------------------*/}
        <StatusFilter handleStatusChange={handleStatusChange} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* ------------------------------orders------------------------------------------ */}
        <div className="max-w-[1100px] w-full py-3 my-10 px-3 h-fit bg-white rounded-sm ">

        {/* -----------------------displaying orders if any ------------------------------ */}
          {allOrders.length > 0 && 
            <div className="py-3 text-gray-500 flex flex-col items-start">
              {(currentStatus.length ? filteredOrders : allOrders).map((item,index) => {
                  return(  
                  <div 
                    className="text-text1 w-full flex flex-col sm:flex-row justify-start items-center my-1 border-b px-3 py-4"
                    key={index} >
                    <img
                      className="max-w-[220px]  h-auto mr-6 mb-2 sm:mb-0 self-center"
                      src={item.image}
                      alt="Image not Found" />
                    <div className="mr-2 flex flex-col ">
                      <h5 className="text-md font-semibold text-text1 mb-3">{item.name}</h5>

                        {item.status == 'pending' && <span className=' w-fit mb-1 bg-gray-400 text-text1 px-[4px] py-[2px] text-xs font-medium rounded-lg'>pending</span>}
                        {item.status == 'inProgress' && <span className=' w-fit mb-1 bg-secondary text-text1 px-[4px] py-[2px] text-xs font-medium rounded-lg '>in progress</span>}
                        {item.status == 'waitingForDelivery' && <span className=' w-fit mb-1 bg-secHover text-text1 px-[4px] py-[1px] text-xs font-medium rounded-lg '>waiting for delivery</span>}
                        {item.status == 'delivered' && <span className=' w-fit mb-1 bg-green-400 text-text1 px-[4px] py-[1px] text-xs font-medium rounded-lg '>delivered</span>}
                        {item.status == 'canceled' && <span className=' w-fit mb-1 bg-red-400 text-text1 px-[4px] py-[1px] text-xs font-medium rounded-lg '>canceled</span>}

                      <div className="mr-3 font-semibold text-sm flex gap-4 relative">
                        <span>$ {item.price * item.quantity} </span>
                        <span> Q : {item.quantity}</span>

                      </div>  
                      <p className="mt-2 text-gray-500 font-semibold text-xs">
                        purchased at : 
                        {` ${new Date(item.created_at).getDate().toString().padStart(2, '0')}/${(new Date(item.created_at).getMonth() + 1).toString().padStart(2, '0')}/${new Date(item.created_at).getFullYear()}` }
                      </p>
                    </div>
                  </div>)
              })}
            </div>
          }
          {/* ----------------------------no orders found message------------------------------------ */}
          {(!filteredOrders.length && !allOrders.length > 0 )  && (
            <p className="flex justify-center items-center py-3 text-gray-500 ">
              No purchased items found.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default Purchases;


