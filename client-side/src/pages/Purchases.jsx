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
  const [allPurchasedItems, setAllPurchasedItems] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('pending');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //get all orders
  useEffect(() => {
    async function getOrderHistory() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/user/${cookies.User._id}`,
        { headers: { Authorization: `${cookies.UserToken}` } }
      );
      const data = await response.data.order.map((order) => order)

      let allPurchasedItemsData =[];
      data.map((orderData)=>{
        allPurchasedItems.push({
          id: orderData.id,
          status:orderData.status,
          user:orderData.user_id,
          order: orderData.order.map((order)=>{ 
            return {
              quantity:order.quantity,
              name:order.service_id.name,
              avg_rating :order.service_id.avg_rating,
              description :order.service_id.description,
              image: order.service_id.images[0].url,
              price: order.service_id.price,
              time: order.service_id.time,
              extras:order.service_id.extras
            }
          })
        })
      })
      setAllPurchasedItems(allPurchasedItemsData)
      console.log(allPurchasedItems)

    }
    if (window.localStorage.getItem("logged")) {
      getOrderHistory();
    }
  }, [ cookies.User._id, cookies.UserToken]);

//filter services by status
useEffect(()=>{
  let filteredOrders = allPurchasedItems.filter((order)=>{ order.status == currentStatus })

  setFilteredOrders(filteredOrders);
},[currentStatus])

// setCurrentStatus use this to store the current selected status 
console.log(allPurchasedItems)


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
        <StatusFilter isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        {/* -------------------------purchased items-------------------------*/}
        <div className="md:min-w-[500px] py-3 my-10 px-3 h-fit bg-white rounded-sm ">
          {filteredOrders.length >0 && <div className="py-3 text-gray-500 flex flex-col items-start">
            {filteredOrders.map((item) => (
                <div className="text-text1 flex flex-col sm:flex-row justify-between items-center my-1 border-b px-3 py-4"
                  key={item.id}>
                    <img
                      className="max-w-[170px] lg:max-w-[220px] h-auto mr-6 mb-2 sm:mb-0 self-start sm:self-center"
                      src={item.images[0].url}
                      alt="Image not Found" />
                    <div className="mr-2 flex flex-col ">
                      <h5 className="text-md font-semibold text-text1 mb-3">{item.name}</h5>
                      <div className="mr-3 font-semibold text-sm flex gap-4 relative">
                        <span>$ {item.price * item.quantity} </span>
                        <span> Q : {item.quantity}</span>
                        {item.status == 'pending' && <span className='absolute right-0 top-[30%] bg-gray-400 text-text1 px-[4px] py-[2px] text-xs font-medium rounded-lg'>pending</span>}
                        {item.status == 'inProgress' && <span className='absolute right-0 top-[30%] bg-secondary text-text1 px-[4px] py-[2px] text-xs font-medium rounded-lg '>inProgress</span>}
                        {item.status == 'waitingForDelivery' && <span className='absolute right-0 top-[30%] bg-secHover text-text1 px-[4px] py-[1px] text-xs font-medium rounded-lg '>waiting for delivery</span>}
                        {item.status == 'delivered' && <span className='absolute right-0 top-[30%] bg-green-400 text-text1 px-[4px] py-[1px] text-xs font-medium rounded-lg '>delivered</span>}
                        {item.status == 'canceled' && <span className='absolute right-0 top-[30%] bg-red-400 text-text1 px-[4px] py-[1px] text-xs font-medium rounded-lg '>canceled</span>}

                      </div>  
                      <p className="mt-2 text-gray-500 font-semibold text-xs">
                        purchased at : 
                        {` ${new Date(item.created_at).getDate().toString().padStart(2, '0')}/${(new Date(item.created_at).getMonth() + 1).toString().padStart(2, '0')}/${new Date(item.created_at).getFullYear()}` }
                      </p>
                    </div>
              </div>
              ))}
          </div>}
          
          {!filteredOrders.length > 0  && (
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


