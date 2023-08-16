/* eslint-disable no-unused-vars */
import {configureStore} from '@reduxjs/toolkit'
import {cartSlice} from './cartSlice';
import {signModalSlice} from './signModalSlice';
import { menuSlice } from './menuSlice';

const store = configureStore({
  reducer: {
    cart :cartSlice.reducer,
    signModal :signModalSlice.reducer,
    menu :menuSlice.reducer
  }
})

export default store;