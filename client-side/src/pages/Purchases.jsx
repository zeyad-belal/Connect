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

  return (
    <>
              <div className="">
                <div className="">
                  {PurchasedItems.map((items, ind) =>
                    cart.items.map((item, index) => (
                      <div
                        className="flex justify-between my-1 border-b-[2px] py-1"
                        key={item.id}
                      >
                        <div className="flex">
                          <img
                            className="max-w-[140px]"
                            src={item.images[0].thumbnailUrl}
                            alt="Image not Found"
                          />
                          <div className="flex flex-col">
                            <h3 className="text-[13px] leading-4 font-bold">
                              {item.name}
                            </h3>
                            <div className="flex gap-2 flex-col">
                              <div className="text-secondary text-[13px]">
                                {quantities[ind][index]} pieces Purchased
                              </div>
                              <div className="me-1 text-bold">
                                {" "}
                                {quantities[ind][index] *
                                  item.new_price} LE{" "}
                              </div>
                              <button
                                className="bg-black text-white hover:bg-secHover text-[13px] px-2 py-1 rounded-lg"
                                onClick={() => addItemHandler(item)}
                              >
                                buy again!
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {!PurchasedItems.length > 0  && (
                  <p className="text-start pb-3 ml-6 text-gray-500 mt-4">
                    No purchased items found.
                  </p>
                )}
              </div>
    </>
  );
}

export default Purchases;
