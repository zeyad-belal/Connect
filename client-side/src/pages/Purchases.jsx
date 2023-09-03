/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function Purchases() {
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const [PurchasedItems, setPurchasedItems] = useState([]);




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
    <div className="bg-primary flex gap-3 p-12">
      {/* ----------------------------filter---------------------------------- */}
      <div className="w-full min-w-[25%] border-r">
          <form className="flex flex-col justify-around items-start">
            <label htmlFor="pending" className="my-2 mx-2 text-text1">
              <input type="radio" id="pending" className="mr-2 my-4" checked/>
              pending
            </label>
            <label htmlFor="inProgress" className="my-2 mx-2 text-text1">
              <input type="radio" id="inProgress" className="mr-2 my-4" />
              in progress
            </label>
            <label htmlFor="waitingForDelivery" className="my-2 mx-2 text-text1">
              <input type="radio" id="waitingForDelivery" className="mr-2 my-4" />
              waiting for delivery
            </label>
            <label htmlFor="delivered" className="my-2 mx-2 text-text1">
              <input type="radio" id="delivered" className="mr-2 my-4" />
              delivered
            </label>
            <label htmlFor="canceled" className="my-2 mx-2 text-text1">
              <input type="radio" id="canceled" className="mr-2 my-4" />
              canceled
            </label>
          </form>
      </div>
      {/* -----------------------purchased items----------------------------  */}
      <div className="min-w-[70%]">
        <div className="  py-3 text-gray-500">
          {PurchasedItems.map((item) => (
            item.order.map((order)=> (
              <div className="text-text1 flex flex-col md:flex-row justify-between items-center my-1 border-b px-3 py-4"
                key={order.service_id.id}>
                <div className="flex">
                  <img
                    className="max-w-[170px] md:max-w-[220px] h-auto mr-6 self-center"
                    src={order.service_id.images[0].url}
                    alt="Image not Found" />
                  <div className="mr-2">
                    <h5 className="text-md font-semibold text-text1 mb-3">{order.service_id.name}</h5>
                    <span className="mr-3 font-semibold text-sm"> $ {order.service_id.price * order.quantity}</span>  
                    <span className="font-semibold text-sm"> Q : {order.quantity}</span>  
                    <p className="mt-2 text-gray-500 font-semibold text-xs">
                      purchased at : 
                      {` ${new Date(item.created_at).getDate().toString().padStart(2, '0')}/${(new Date(item.created_at).getMonth() + 1).toString().padStart(2, '0')}/${new Date(item.created_at).getFullYear()}` }
                    </p>
                  </div>
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
  );
}

export default Purchases;
