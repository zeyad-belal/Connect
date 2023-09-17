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
  isCatgSubMenuVisible: false,
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
      state.isCatgSubMenuVisible = false;
    },
    toggleNotiMenu(state){
      state.isNotiMenuVisible = !state.isNotiMenuVisible
      state.isUserMenuVisible = false;
      state.isSearchBarVisible = false;
      state.isSubVisible = false;
      state.isCatgMenuVisible = false;
      state.isCatgSubMenuVisible = false;
    },
    toggleSearchBar(state){
      state.isSearchBarVisible = !state.isSearchBarVisible
      state.isNotiMenuVisible = false;
      state.isUserMenuVisible = false;
      state.isSubVisible = false;
      state.isCatgMenuVisible = false;
      state.isCatgSubMenuVisible = false;
    },
    toggleSubNav(state){
      state.isSubVisible = !state.isSubVisible
      state.isNotiMenuVisible = false;
      state.isSearchBarVisible = false;
      state.isUserMenuVisible = false;
      state.isCatgMenuVisible = false;
      state.isCatgSubMenuVisible = false;
    },
    toggleCategories(state){
      state.isCatgMenuVisible = !state.isCatgMenuVisible
      state.isCatgSubMenuVisible = false;
      state.isNotiMenuVisible = false;
      state.isSearchBarVisible = false;
      state.isUserMenuVisible = false;
      state.isSubVisible = false;
    },
    toggleSubCategories(state){
      state.isCatgSubMenuVisible = !state.isCatgSubMenuVisible;
      state.isCatgMenuVisible = false;
      state.isNotiMenuVisible = false;
      state.isSearchBarVisible = false;
      state.isUserMenuVisible = false;
    },
    closeAllMenus(state){
      state.isSubVisible = false
      state.isNotiMenuVisible = false;
      state.isSearchBarVisible = false;
      state.isUserMenuVisible = false;
      state.isCatgMenuVisible = false;
      state.isCatgSubMenuVisible = false;
    }
  }
})

export  const menuActions = menuSlice.actions 