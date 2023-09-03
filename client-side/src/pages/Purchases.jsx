/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { FilterIcon, HomeIcon, RightArrowIcon } from "../components/Icons";
import StatusFilter from "../components/StatusFilter";

function Purchases() {
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const [PurchasedItems, setPurchasedItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    async function getOrderHistory() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/user/${cookies.User._id}`,
        { headers: { Authorization: `${cookies.UserToken}` } }
      );
      const orders = await response.data.order.map((order) => order)
      
    console.log(orders)

      setPurchasedItems(orders);

    }
    if (window.localStorage.getItem("logged")) {
      getOrderHistory();
    }
  }, [cookies.User._id, cookies.UserToken]);


// console.log(PurchasedItems)





  return (
    <div className="bg-primary py-6 px-6">
      <div className="z-30 md:hidden fixed min-w-0 max-w-full block top-[90%] left-3 ">
        <button
          className=" rounded-full bg-secondary p-3 focus:outline-none"
          onClick={toggleMenu}>
          <FilterIcon />
        </button>
      </div>
        {/* ----------route---------*/}
        <div className="flex items-center text-gray-500">
          <Link to={'/'}  >
            <p className="ml-2 text-gray-500 text-sm cursor-pointer flex"> <HomeIcon />  </p>
          </Link>
          <RightArrowIcon className="text-gray-500" />
          <h1 className="text-lg ">Purchased items</h1>
        </div>


{/* ---------------------page-content-------------------------  */}
      <div className="gap-6 flex flex-col md:flex-row  min-h-[83vh]">

        {/* ----------------------------filter---------------------------------- */}
        <StatusFilter isMenuOpen={isMenuOpen} />
        {/* -----------------------purchased items----------------------------  */}
        <div className="md:min-w-[500px] py-3 my-10 px-3 h-fit bg-white rounded-sm ">
          <div className="py-3 text-gray-500 flex flex-col items-start">
            {PurchasedItems.map((item) => (
              item.order.map((order)=> (
                <div className="text-text1 flex flex-col sm:flex-row justify-between items-center my-1 border-b px-3 py-4"
                  key={order.service_id.id}>
                    <img
                      className="max-w-[170px] lg:max-w-[220px] h-auto mr-6 mb-2 sm:mb-0 self-start sm:self-center"
                      src={order.service_id.images[0].url}
                      alt="Image not Found" />
                    <div className="mr-2 flex flex-col ">
                      <h5 className="text-md font-semibold text-text1 mb-3">{order.service_id.name}</h5>
                      <div className="mr-3 font-semibold text-sm flex gap-4">
                        <span>$ {order.service_id.price * order.quantity} </span>
                        <span> Q : {order.quantity}</span>
                      </div>  
                      <p className="mt-2 text-gray-500 font-semibold text-xs">
                        purchased at : 
                        {` ${new Date(item.created_at).getDate().toString().padStart(2, '0')}/${(new Date(item.created_at).getMonth() + 1).toString().padStart(2, '0')}/${new Date(item.created_at).getFullYear()}` }
                      </p>
                    </div>
              </div>
            ))
              ))}
          </div>
          {!PurchasedItems.length > 0  && (
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


