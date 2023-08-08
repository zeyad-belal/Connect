/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";

// define the initial state
const initialState = {
  loading: true,
  products: []
};

// create the context
export const ProductContext = createContext();

// create the context provider
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch products from the database
  const fetchProducts = async () => {
    dispatch({ type: "LOADING" });
    await axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        dispatch({ type: "SET_PRODUCTS", payload: res.data });
      })
      .catch((err) => console.log(err.message));
    dispatch({ type: "DISPLAY_PRODUCTS" });
  };

  return (
    <ProductContext.Provider value={{ ...state, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(ProductContext);
};
