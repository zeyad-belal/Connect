/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import {useSelector, useDispatch} from "react-redux"
import {cartActions} from "../../store/cartSlice"
import emailjs from "emailjs-com";
import { useCookies } from "react-cookie";
import axios from "axios";

const ButtonWrapper = ({ form, currency, showSpinner }) => {
  const items = useSelector((state)=> state.cart.items);
  const totalAmount = useSelector((state)=> state.cart.totalAmount);
  const dispatch = useDispatch()

  const [{ options, isPending }, Pdispatch] = usePayPalScriptReducer();
  const [amount, setAmount] = useState("");
  const style = { layout: "vertical" };
  const [cookies, setCookies] = useCookies(["User"]);
  emailjs.init("ieyQAv01RBSvsmGou");

  useEffect(() => {
    Pdispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
    setAmount(Math.round(totalAmount / 30));
  }, [currency, showSpinner]);

  async function sendEmail(data) {
    try {
      await emailjs.sendForm(
        "service_97xavkg",
        "template_6bes58a",
        form,
        "ieyQAv01RBSvsmGou"
      );
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={async function (data, actions) {
          await actions.order.capture();
          sendEmail(data);
          const reqData = {
            order: items.map((item) => ({
              service_id: item.id,
              quantity: item.amount,
            })),
          };
          const response2 = await axios.post(
            `${import.meta.env.VITE_API_URL}orders`,
            reqData,
            { headers: { Authorization: `${cookies.UserToken}` } }
          );
          dispatch(cartActions.clear());
          window.localStorage.setItem("totalAmount", "").then(
            (result_2) => {
              console.log(result_2.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
        }}
      />
    </>
  );
};

export default function PayPal({ form }) {
  const currency = "USD";

  return (
    <div className="w-full px-4  max-w-md mx-auto xl:m-10 md:m-10 sm:my-10">
      <PayPalScriptProvider
        options={{
          clientId: "test",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper form={form} currency={currency} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
