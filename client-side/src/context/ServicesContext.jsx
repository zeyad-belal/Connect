/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";

// define the initial state
const initialState = {
  loading: true,
  services: []
};

// create the context
export const ServiceContext = createContext();

// create the context provider
export const ServiceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch services from the database
  const fetchServices = async () => {
    dispatch({ type: "LOADING" });
    await axios
      .get(`${import.meta.env.VITE_API_URL}/services`)
      .then((res) => {
        dispatch({ type: "SET_SERVICES", payload: res.data });
      })
      .catch((err) => console.log(err.message));
    dispatch({ type: "DISPLAY_SERVICES" });
  };

  return (
    <ServiceContext.Provider value={{ ...state, fetchServices }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(ServiceContext);
};
