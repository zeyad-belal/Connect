/* eslint-disable no-unused-vars */
import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './cartSlice';

const store = configureStore({
  reducer: cartSlice.reducer
})

export default store;