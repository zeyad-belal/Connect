/* eslint-disable no-unused-vars */
import {configureStore} from '@reduxjs/toolkit'
import {cartSlice} from './cartSlice';
import {signModalSlice} from './signModalSlice';
import { menuSlice } from './menuSlice';
import { servicesSlice } from './servicesSlice';

const store = configureStore({
  reducer: {
    cart :cartSlice.reducer,
    signModal :signModalSlice.reducer,
    menu :menuSlice.reducer,
    services :servicesSlice.reducer,
  }
})

export default store;