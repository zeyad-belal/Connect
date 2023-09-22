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
import emailjs from "emailjs-com";

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state)=> state.cart);
  emailjs.init("ieyQAv01RBSvsmGou");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const [LoadingState, setLoadingState] = useState(
    <div role="status " className=" flex justify-center items-center ">
    <svg aria-hidden="true" className="inline w-7 h-7 mr-2 text-gray-100 animate-spin dark:text-gray-400 fill-text1" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  </div>
  );



  async function removeItemHandler(id) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/services/${id}`
    );
    
    dispatch(cartActions.remove(id));
  }

  async function addItemHandler(item) {
    dispatch(cartActions.add({
      id: item.id,
      name: item.name,
      image: item.image ? item.image : item.images[0].url,
      price: item.price,
      extras: item.extras,
      time: item.time,
      amount: 1,
      seller: item.seller,
    }));

  }
console.log(cart.items)
  function checkoutHandler() {
    const cartIsNotEmpty = cart.totalItemsNum ? true : false;
    const userStatus = window.localStorage.getItem("logged");

    if (userStatus && cartIsNotEmpty) {
      const checkout = async () => {
        try {
          // -------------------stripe--------------------------
          const paymentData = {
            items: cart.items.map((item) => ({
              name: item.name,
              price: item.price * 100,
              quantity: item.amount,
            })),
          };
          // nav to checkout
          const payRes = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`,
            paymentData,
            { headers: { Authorization: `${cookies.UserToken}` } }
          );
    
          // create order in the backend
            const reqData = {
              items: cart.items.map((item) => ({
                service_id: item.id,
                quantity: item.amount,
                extras:item.extras,
                time:item.time,
                price:item.price,
                seller:item.seller,
              })),
            };
            const orderRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/orders`,
              reqData,
              { headers: { Authorization: `${cookies.UserToken}` } }
            );
    
          // getting ids of the sellers
          const sellersIds = cart.items.map((item) => item.seller.id);
            console.log(sellersIds)
          sellersIds.forEach((ID) => {
            const sellerItems = {
              items: cart.items
                .filter((item) => item.seller === ID)
                .map((item) => ({
                  service_id: item.id,
                  quantity: item.amount,
                  extras: item.extras,
                  time: item.time,
                  price: item.price,
                  seller: item.seller,
                })),
            };
    
            axios.post(
                `${import.meta.env.VITE_API_URL}/incomingOrders/${ID}`,
                sellerItems,
                { headers: { Authorization: `${cookies.UserToken}` } }
              )
          });
          
    
            // emailjs.sendForm(
            //   "service_97xavkg",
            //   "template_6bes58a",
            //   form.current,
            //   "ieyQAv01RBSvsmGou"
            // );
    
            dispatch(cartActions.clear());
    
            const response = await axios.patch(
              `${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
              { cart_items: [] },
              { headers: { Authorization: `${cookies.UserToken}` } }
            );
            window.location.href = payRes.data.sessionUrl;
          
        } catch (error) {
          toast.error(error, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      };

      checkout()
    console.log(cart.items)






    } else if (!userStatus) {
      dispatch(signModalActions.toggleModal());
      toast(`Please Sign First!`);
    } else if (!cartIsNotEmpty) {
      toast(`The Cart Is Empty ${cookies.User["first_name"]}!`);
    }
  }

useEffect(()=>{
  setTimeout(()=>{
    setLoadingState(
    <div className="flex flex-col justify-center items-center gap-3">
      <p className=" self-center  text-md text-text1 flex items-center gap-3">Cart is empty </p>
    </div>
    )
  },2000)
},[])

  return (
    <div className="bg-primary  mt-[65px]">
        <div className="flex flex-col px-2 md:px-11 py-10 justify-between gap-4">
          <section >
            {/* cart header */}
            <div className="relative p-6 border-b-2">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            </div>
            {/* cart items */}
            {cart.items.length !== 0 &&
              cart.items.map((item) => (
                <CartItem
                  item={item}
                  key={item.id}
                  onAdd={() => addItemHandler(item)}
                  onRemove={() => removeItemHandler(item.id)} />
              ))}
          </section>
              {(!cart || cart.items.length < 1)  && LoadingState }
          {/* -----------info------------- */}
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
