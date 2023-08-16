
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalIsShown: false,
  loginModalStatus: true,
  signUpModalStatus : false
};

export const signModalSlice = createSlice({
  name :'sign',
  initialState,
  reducers: {
    toggleModal(state){
      state.modalIsShown = !state.modalIsShown
    },
    toggleModalContent(state){
      state.loginModalStatus = !state.loginModalStatus
      state.signUpModalStatus = !state.signUpModalStatus
    }
  }
})

export const signModalActions = signModalSlice.actions;