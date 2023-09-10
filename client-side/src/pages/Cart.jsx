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
          extras: item.extras,
          time: item.time,
          amount: 1,
        }));
        

    } catch (error) {
      // console.log(error);
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



  return (
    <div className="bg-primary">
        <div className="flex flex-col px-2 md:px-11 py-10 justify-between gap-4">
          <section className="">
            {/* cart header */}
            <div className="relative p-6 border-b-2">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
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
          <aside className="w-[300px] self-end ">
            <div className="py-6  flex flex-col gap-5 px-5">
              <div className="flex flex-col font-semibold gap-2 ">
                <div className="flex justify-between">
                  <span>Sub-total: </span> <span>$ {cart.totalAmount}</span>
                </div>
                <div className="flex justify-between border-b border-t pt-1 pb-1">
                  <span>Site fees: </span>  <span>$ 10</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-lg">Total: </span>  <span>$ {cart.totalAmount + 10} </span>
                </div>
              </div>
              <button
                onClick={checkoutHandler}
                className="bg-secondary hover:bg-secHover my-1 px-2 max-w-[200px] rounded block">
                Checkout
              </button>
            </div>
          </aside>
        </div>
    </div>
  );
};

export default Cart;
