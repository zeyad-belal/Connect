/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PaginatedItems from "../components/Service/PaginatedItems";
import axios from "axios";
import { useCookies } from "react-cookie";
import { cartActions } from "../store/cartSlice";
import { toast } from "react-toastify";

function Purchases() {
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const [PurchasedItems, setPurchasedItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const cart = useSelector((state)=> state.cart);
  const dispatch = useDispatch()


  async function addItemHandler(item) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/services/${item.id}`
      );

        dispatch(cartActions.add({
          id: item.id,
          name: item.name,
          image: item.image ? item.image : item.images[0].url,
          price: item.price,
          amount: 1,
        }));
        

    } catch (error) {
      console.log(error);
      toast.info("Something went wrong !", {
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
  }




  useEffect(() => {
    async function getOrderHistory() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/user/${cookies.User._id}`,
        { headers: { Authorization: `${cookies.UserToken}` } }
      );
      const orders = await response.data.order.map((item) =>
        item.order.map((orderItem) => orderItem.service_id)
      );
      setPurchasedItems(orders);
      const quantities = await response.data.order.map((item) =>
        item.order.map((orderItem) => orderItem.quantity)
      );
      setQuantities(quantities);
    }
    if (window.localStorage.getItem("logged")) {
      getOrderHistory();
    }
  }, []);


console.log(PurchasedItems)

  return (
    <div className="flex gap-3 p-12">
      {/* -----------------------purchased items----------------------------  */}
      <div className="bg-primary min-w-[70%]">
        <div className=" bg-white py-3 text-gray-500">
          {PurchasedItems.map((item) => (
            item.map((item)=> (
              <div
              className="text-text1 flex flex-col md:flex-row justify-between items-center my-1 border-b px-3 py-4"
              key={item.id}>
              <div className="flex">
                <img
                  className="max-w-[180px] md:max-w-[250px] h-auto mr-6 self-center"
                  src={item.images[0].url}
                  alt="Image not Found" />
                <div className="flex flex-col mr-2">
                  <h5 className="text-sm md:text-[17px] max-w-[400px] font-semibold text-text1 mb-3">{item.name}</h5>
                  <span> $ {item.price }</span>  
                </div>
              </div>

              <div className="flex  gap-8 my-5  self-end md:self-center justify-between items-center h-full min-w-[30%]">
                <div className="text-bold ">
                  purchased at : 
                </div>
              </div>
            </div>
          ))
            ))}
        </div>
        {!PurchasedItems.length > 0  && (
          <p className="flex justify-center items-center  bg-white py-3 text-gray-500 ">
            No purchased items found.
          </p>
        )}
      </div>
      {/* ----------------------------filter---------------------------------- */}
      <div className="bg-primary w-full min-w-[25%]">
          this is filter
      </div>


    </div>
  );
}

export default Purchases;
