/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  totalAmount: 0,
  totalItemsNum: 0,
  changed: false
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action){
      const item = action.payload;
      const existingCartItemIndex = state.items.findIndex((cartItem) => cartItem.id === item.id);
      state.changed = true;
      if (existingCartItemIndex !== -1) {
        state.items[existingCartItemIndex].amount += item.amount;
      } else {
        state.items.push(item);
      }
      state.totalAmount += item.amount * item.price;
      state.totalItemsNum += item.amount;
    },
    remove(state, action){
      const id = action.payload;
      const existingCartItemIndex = state.items.findIndex( (cartItem) => cartItem.id === id );
      state.changed = true;
      if (existingCartItemIndex !== -1) {
        const existingCartItem = state.items[existingCartItemIndex];
        if (existingCartItem.amount === 1) {
          state.items.splice(existingCartItemIndex, 1);
        } else {
          existingCartItem.amount -= 1;
        }
        state.totalAmount -= existingCartItem.price;
        state.totalItemsNum -= 1;
      }
    },
    clear(state){
      state.items = [],
      state.totalAmount = 0,
      state.totalItemsNum = 0
    },
    replace(state,action){
      state.items = action.payload.items,
      state.totalAmount = action.payload.totalAmount,
      state.totalItemsNum = action.payload.totalItemsNum
    }
  }
})

export const cartActions = cartSlice.actions;

  // ---------------------sync cart with backend functions------------------------------------

export async function sendCartItems(cart, userID, userToken) {
  const sendRequest = async () => {
    const reqData = {
      cart_items: cart.items.map((item) => ({
        service: item.id,
        quantity: item.amount,
      })),
    };
    
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

//------------------------------------------
// custom action creator (thunk) 
export  function fetchCartItems(userID , userToken) {
  return async (dispatch) => {
    const sendRequest = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userID}`,
          { headers: { Authorization: userToken } }
        );

        const cartData = await response.data.user.cart_items;
        const quantities = cartData.map((item) => item.quantity);
        const cartItems = cartData.map((item) => item.service);
        const myItems = cartItems.map((item, index) => ({
          id: item.id,
          name: item.name,
          image: item.images[0].url,
          amount: quantities[index],
          price: item.new_price,
        }));

        const totalAmount = myItems.reduce(
          (sum, item) => sum + item.amount * item.price,
          0
        );
        const totalItemsNum = myItems.reduce((sum, item) => sum + item.amount, 0);
        const result = { myItems, totalAmount, totalItemsNum };
        return result;
    }
    try{
      const res = await sendRequest();
      dispatch(
        cartSlice.actions.replace({
          items: res.myItems || [],
          totalAmount: res.totalAmount || 0,
          totalItemsNum: res.totalItemsNum || 0,
        })
      )
    }catch(error){
      toast(error);
    }
    
  }
}

//------------------------------------------






