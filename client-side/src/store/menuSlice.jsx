/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSubVisible: false,
  isUserMenuVisible: false,
  isNotiMenuVisible: false,
  isSearchBarVisible: false,
  isCatgMenuVisible: false,
};

export const menuSlice = createSlice({
  name:'menu',
  initialState,
  reducers :{
    toggleUserMenu(state){
      state.isUserMenuVisible = !state.isUserMenuVisible
      state.isNotiMenuVisible = false;
      state.isSearchBarVisible = false;
      state.isSubVisible = false;
      state.isCatgMenuVisible = false;
    },
    toggleNotiMenu(state){
      state.isNotiMenuVisible = !state.isNotiMenuVisible
      state.isUserMenuVisible = false;
      state.isSearchBarVisible = false;
      state.isSubVisible = false;
      state.isCatgMenuVisible = false;
    },
    toggleSearchBar(state){
      state.isSearchBarVisible = !state.isSearchBarVisible
      state.isNotiMenuVisible = false;
      state.isUserMenuVisible = false;
      state.isSubVisible = false;
      state.isCatgMenuVisible = false;
    },
    toggleSubNav(state){
      state.isSubVisible = !state.isSubVisible
      state.isNotiMenuVisible = false;
      state.isSearchBarVisible = false;
      state.isUserMenuVisible = false;
      state.isCatgMenuVisible = false;
    },
    toggleCategories(state){
      state.isCatgMenuVisible = !state.isCatgMenuVisible
      state.isNotiMenuVisible = false;
      state.isSearchBarVisible = false;
      state.isUserMenuVisible = false;
      state.isSubVisible = false;
    },
    closeAllMenus(state){
      state.isSubVisible = false
      state.isNotiMenuVisible = false;
      state.isSearchBarVisible = false;
      state.isUserMenuVisible = false;
      state.isCatgMenuVisible = false;
    }
  }
})

export  const menuActions = menuSlice.actions 