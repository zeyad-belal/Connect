/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux"
import { signModalActions } from "./../store/signModalSlice"
import { cartActions } from "./../store/cartSlice"

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state)=> state.cart);

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const [showPurchasedItems, setShowPurchasedItems] = useState(false);
  const [PurchasedItems, setPurchasedItems] = useState([]);
  const [quantities, setQuantities] = useState([]);

  const togglePurchasedItems = () => {
    setShowPurchasedItems(!showPurchasedItems);
  };

  async function removeItemHandler(id) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/services/${id}`
    );
    
    dispatch(cartActions.remove(id));
  }

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

  function checkoutHandler() {
    const cartIsNotEmpty = cart.totalItemsNum ? true : false;
    const userStatus = window.localStorage.getItem("logged");

    if (userStatus && cartIsNotEmpty) {
      navigate("/checkout");
    } else if (!userStatus) {
      dispatch(signModalActions.toggleModal());
      toast(`Please Sign First!`);
    } else if (!cartIsNotEmpty) {
      toast(`The Cart Is Empty ${cookies.User["first_name"]}!`);
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
      <div className="container mx-11 my-10">
        <div className="grid grid-cols-5 gap-4">
          <section className="col-span-4 lg:col-span-3 mr-4">
            {/* cart header */}
            <div className="relative p-6 border-b-2">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <span className="absolute right-5">Price</span>
            </div>
            {/* cartcart.items */}
            {cart.items.length !== 0 ? (
             cart.items.map((item) => (
                <CartItem
                  item={item}
                  key={item.id}
                  onAdd={() => addItemHandler(item)}
                  onRemove={() => removeItemHandler(item.id)}
                />
              ))
            ) : (
              <p className="mx-auto max-w-fit py-1 px-2 font-semibold text-xl my-3 rounded-full">
                Cart is empty!
              </p>
            )}
          </section>
          <aside className="col-span-5 lg:col-span-2">
            <div className="py-6 bg-gray-50 flex flex-col px-5">
              <h6 className="font-semibold text-xl">Subtotal</h6>
              <span>
                {cart.totalItemsNum}cart.items:
                <span className="font-bold"> {cart.totalAmount} LE</span>
              </span>
              <button
                onClick={checkoutHandler}
                className="bg-secondary px-2 max-w-[200px] rounded block"
              >
                Checkout
              </button>
              <button
                className="mt-4 bg-black text-white py-2 px-4 rounded-md max-w-[200px] shadow-md hover:bg-orange-600 focus:outline-none"
                onClick={togglePurchasedItems}
              >
                Recently Purchased
              </button>
            </div>

            {showPurchasedItems && PurchasedItems && (
              <div className="purchased-container max-w-[340px] border border-spacing-x-4 mr-3 p-1">
                <div className="purchased-items">
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
                                className="bg-black text-white hover:bg-orange-600 text-[13px] px-2 py-1 rounded-lg"
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
                {!PurchasedItems.length > 0 && showPurchasedItems && (
                  <p className="text-start pb-3 ml-6 text-gray-500 mt-4">
                    No purchasedcart.items found.
                  </p>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
};

export default Cart;
