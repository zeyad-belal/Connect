/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import PayPal from "../components/PayPalButton.jsx";
import { useEffect, useRef, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";
import "react-toastify/dist/ReactToastify.css";
import {useSelector, useDispatch} from "react-redux"
import {cartActions} from "../store/cartSlice.jsx"
import { signModalActions } from "../store/signModalSlice.jsx";


const Checkout = () => {
  const cart = useSelector((state)=> state.cart);
  const dispatch = useDispatch()

  const {register,handleSubmit,formState: { errors }} = useForm();
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["User"]);
  const [paypalclass, setPaypalclass] = useState("hidden");
  const [cashclass, setCashclass] = useState("hidden");
  const form = useRef();

  emailjs.init("ieyQAv01RBSvsmGou");

  useEffect(() => {
    if (!window.localStorage.getItem("logged")) {
      dispatch(signModalActions.toggleModal())
      navigate("/Cart");
    }
  }, []);

  const onSubmit = async (data) => {
    data.paymentMethod === "Cash" ? setCashclass("") : setCashclass("hidden");
    data.paymentMethod === "PayPal"
      ? setPaypalclass("")
      : setPaypalclass("hidden");
    try {
      // updating user info
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
        { address: data.address },
        { headers: { Authorization: `${cookies.UserToken}` } }
      );
      // create order in the backend
      if (data.paymentMethod == "Cash") {
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
        // updating user order history 
        const response2 = await axios.post(
          `${import.meta.env.VITE_API_URL}/orders`,
          reqData,
          { headers: { Authorization: `${cookies.UserToken}` } }
        );

      // getting ids of the sellers
      const sellersIds = cart.items.map((item) => item.seller);

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
      

        emailjs.sendForm(
          "service_97xavkg",
          "template_6bes58a",
          form.current,
          "ieyQAv01RBSvsmGou"
        );

        dispatch(cartActions.clear());

        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
          { cart_items: [] },
          { headers: { Authorization: `${cookies.UserToken}` } }
        );
      }
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


  function closeHandler() {
    setCashclass("hidden");
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="bg-primary lg:mx-12 md:mx-6 mx-3  mt-[65px] pt-4 flex flex-col items-center">

      <div className=" rounded-lg my-2 bg-primary p-3 w-fit">
        The Total of Your Order is:{" "}
        <span className="text-bold">{cart.totalAmount}</span> LE{" "}
        <span className="text-secondary font-bold">OR</span>{" "}
        <span className="text-bold">
          {Math.round(cart.totalAmount / 30)}
        </span>{" "}
        $
      </div>

          <form
            ref={form}
            onSubmit={handleSubmit(onSubmit)}
            className=" mt-5 mx-3 px-3  min-w-[340px]" >
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Name:
              </label>
              <input
                id="name"
                {...register("name", { required: true })}
                defaultValue={`${cookies.User?.first_name} ${cookies.User?.last_name}`}
                className="w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2">
                Phone:
              </label>
              <input
                id="phone"
                defaultValue={`${cookies.User?.phone_number}`}
                {...register("phone", { required: true })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
              />
              {errors.phone && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email:
              </label>
              <input
                id="email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                defaultValue={`${cookies.User?.email}`}
                className="w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
              />
              {errors.email && (
                <span className="text-red-500">
                  Please enter a valid email address
                </span>
              )}
            </div>

            {/* items sent to email */}
            <input
              className="hidden"
              {...register("items")}
              defaultValue={`${cart.items?cart.items.map((item) => item.name).join("--- "): "" }`} />
            {/* total totalAmount sent to email */}
            <input
              className="hidden"
              {...register("totalAmount")}
              defaultValue={`${cart.totalAmount ? cart.totalAmount : ""}`} />

            <div className="mb-4">
              <label htmlFor="address" className="block mb-2">
                Address:
              </label>
              <input
                id="address"
                {...register("address", { required: true })}
                defaultValue={`${
                  cookies.User.address ? cookies.User.address : ""
                }`}
                className="w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
              />
              {errors.address && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block mb-2">
                Payment Method:
              </label>
              <select
                id="paymentMethod"
                {...register("paymentMethod", { required: true })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
              >
                <option value="">Select a payment method</option>
                <option value="PayPal">PayPal Or Credit Card</option>
                <option value="Cash">Cash On Delivery</option>
              </select>
              {errors.paymentMethod && (
                <span className="text-red-500 text-[14px] ml-1">
                  Please select a payment method
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 my-6 bg-secondary text-white rounded-md hover:bg-secHover focus:outline-none focus:ring focus:border-secondary transition-colors"
            >
              Proceed To Payment
            </button>

            <div className={paypalclass}>
              <PayPal form={form.current} />
            </div>

            {/* -------modal confirmation modal------  */}
            <div className={cashclass}>
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2  bg-slate-100 p-8 rounded-lg shadow-md z-30 animate-slide-down">
                <div className="flex justify-center m-auto items-center gap-2">
                  <BsFillCheckCircleFill size={30} color="green" />
                  <h3 className="text-center font-serif text-2xl text-green-700  my-2">
                    Order Successfully Placed
                  </h3>
                </div>
                <p className="text-center text-gray-600">
                  We have received your order and our team is preparing it as
                  soon as possible.
                </p>
                <p className="mx-auto max-w-fit p-2 rounded-lg text-secondary font-semibold mt-6 border-2 border-secondary">
                  {" "}
                  Kindly check your email !
                </p>
                <p></p>
                <button onClick={closeHandler}>
                  <img
                    className="fixed -top-10 -left-10 w-10 "
                    src="/x.png"
                    alt="close"
                  ></img>
                </button>
              </div>
            </div>
          </form>



        {/* Items */}
        {/* <div
          className="flex flex-wrap justify-center gap-4 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          {cart.items &&
            cart.items.map((service) => (
              <div
                key={service.id}
                className="max-w-[250px] my-2 rounded-lg overflow-hidden shadow-md bg-white"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-44 object-cover"
                />
                <div className="px-4 py-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {service.name.slice(0, 50)}...
                  </h2>
                  <div className="text-gray-700 text-sm">
                    {service.amount} pieces
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600 font-medium">
                      {service.price}LE
                    </div>
                    <div className="text-indigo-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 stroke-current stroke-2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 5l2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5z" />
                      </svg>
                      <div className="text-sm">{service.rate}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {!cart.items && <div className="text-gray-500">Cart Is Empty</div>}
        </div> */}
      <ToastContainer />
    </div>
  );
};

export default Checkout;
