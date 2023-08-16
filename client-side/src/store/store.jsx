/* eslint-disable no-unused-vars */
import {configureStore} from '@reduxjs/toolkit'
import {cartSlice} from './cartSlice';
import {signModalSlice} from './signModalSlice';

const store = configureStore({
  reducer: {
    cart :cartSlice.reducer,
    signModal :signModalSlice.reducer
  }
})

export default store;