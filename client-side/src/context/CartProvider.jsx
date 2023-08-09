/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useReducer } from "react";

import CartContext from "./CartContext";
import axios from "axios";
import { useCookies } from "react-cookie";
//--------------------------------Reducer-------------------------------------------


const defaultCartState = {
  items:  [],
  totalAmount:  0,
  totalItemsNum:  0
};



function CartReducer(state, action) {
  if (action.type === "ADD") {
      const updatedTotalAmount =
        state.totalAmount + action.item.amount * action.item.price;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      let updatedTotalItemsNum;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      updatedTotalItemsNum = updatedItems.reduce((total, item) => {
        return total + item.amount;
      }, 0);

      
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalItemsNum: updatedTotalItemsNum
      };
    }
  

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    let updatedTotalItemsNum;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    updatedTotalItemsNum = updatedItems.reduce((total, item) => {
      return total + item.amount;
    }, 0);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      totalItemsNum: updatedTotalItemsNum
    };
  }

  if (action.type === "CLEAR") {
    return {
      items: [],
      totalAmount: 0,
      totalItemsNum: 0
    };
  }

  if (action.type === "REPLACE") {
    return {
      items: action.items,
      totalAmount: action.totalAmount,
      totalItemsNum: action.totalItemsNum
    };
  }

  return defaultCartState;
}

//--------------------------------Provider-------------------------------------------

function CartProvider(props) {
  const [cookies, setCookie] = useCookies(['UserToken','User']);
  const [cartState, cartDispatch] = useReducer(CartReducer, defaultCartState);

  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    totalItemsNum: cartState.totalItemsNum,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler
  };

  function addItemHandler(item) {
    cartDispatch({ type: "ADD", item: item });
  }

  function removeItemHandler(id) {
    cartDispatch({ type: "REMOVE", id: id });
  }

  function clearCartHandler() {
    cartDispatch({ type: "CLEAR" });
  }

  // ---------------------sync cart with backend methods------------------------------------

  async function sendCartItems(cart, userID,userToken) {
    const sendRequest = async () => {
      const reqData = {
        cart_items:  cart.items.map((item) => ({
          service: item.id,
          quantity: item.amount
        }))
      };
      // console.log(reqData)
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userID}`,
        reqData,
        { headers: { Authorization: userToken } }
      );
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  }

//---------------------


async function fetchCartItems() {
  async function sendReq(){
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${cookies.User.id}`,
      { headers: { Authorization: cookies.UserToken } }
      );
      
      const cartData = await response.data.user.cart_items;
      const quantities = cartData.map((item) => item.quantity);
      const cartItems = cartData.map((item) => item.service);
      const myItems = cartItems.map((item, index) => ({
        id: item.id,
        name: item.name,
        image: item.images[0].url,
        amount: quantities[index],
        price: item.new_price
      }));

      const totalAmount = myItems.reduce((sum, item) => sum + item.amount * item.price,0);
      const totalItemsNum = myItems.reduce((sum, item) => sum + item.amount, 0);
      const result ={ myItems,totalAmount,totalItemsNum}
      return result
    }
    const res = await sendReq()
    // console.log(res)

    cartDispatch({
      type: "REPLACE",
      items: res.myItems || [],
      totalAmount: res.totalAmount || 0 ,
      totalItemsNum: res.totalItemsNum || 0
    });
  
}


async function updatedStock(action, amount ,service){
  if (action == "add"){
    try{
      axios.put(`${import.meta.env.VITE_API_URL}/services/${service.id}`,{
        stock_count : service.stock_count - (amount?? 1)
      })
    }catch(error){
      console.log(error)
    }
    
  }else if(action == "remove"){
    try{
      axios.put(`${import.meta.env.VITE_API_URL}/services/${service.id}`,{
        stock_count : service.stock_count + (amount?? 1)
      })
    }catch(error){
      console.log(error)
    }

  }
}

  return (
    <CartContext.Provider value={{...cartContextValue , fetchCartItems,sendCartItems,updatedStock}}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;

export const useCartContext = () => {
  return useContext(CartContext);
};