/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  services: [],
  loading: true
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setLoading(state){
      state.loading = true
    },
    displayServices(state){
      state.loading = false
    },
    setServices(state,action){
      state.loading = false
      state.services = action.payload
    },
  }
})

export const servicesActions = servicesSlice.actions


export function fetchServices(){
  return async (dispatch)=>{
    try{
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/services`)
      dispatch(servicesActions.setServices(res.data));
      dispatch(servicesActions.displayServices());
    }catch(error){
      console.log(error)
    }
  } 
}