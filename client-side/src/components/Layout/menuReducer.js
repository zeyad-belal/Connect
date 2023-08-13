export const ActionTypes = {
  TOGGLE_USER_MENU: "TOGGLE_USER_MENU",
  TOGGLE_NOTI_MENU: "TOGGLE_NOTI_MENU",
  TOGGLE_SUB_NAV: "TOGGLE_SUB_NAV",
  TOGGLE_SEARCH_BAR: "TOGGLE_SEARCH_BAR",
  CLOSE_ALL_MENUS: "CLOSE_ALL_MENUS",
};


const  menuReducer = (state, action)=> {
  switch (action.type) {
    case ActionTypes.TOGGLE_USER_MENU:
      return {
        isUserMenuVisible: !state.isUserMenuVisible,
        isNotiMenuVisible: false,
        searchBarIsVisible: false,
        subIsVisible: false,
      };
    case ActionTypes.TOGGLE_NOTI_MENU:
      return {
        isNotiMenuVisible: !state.isNotiMenuVisible,
        isUserMenuVisible: false,
        searchBarIsVisible: false,
        subIsVisible: false,
      };
    case ActionTypes.TOGGLE_SUB_NAV:
      return {
        subIsVisible: !state.subIsVisible,
        isUserMenuVisible: false,
        isNotiMenuVisible: false,
        searchBarIsVisible: false,
      };
    case ActionTypes.TOGGLE_SEARCH_BAR:
      return {
        searchBarIsVisible: !state.searchBarIsVisible,
        isUserMenuVisible: false,
        isNotiMenuVisible: false,
        subIsVisible: false,
      };
    case ActionTypes.CLOSE_ALL_MENUS:
      return {
        subIsVisible: false,
        isUserMenuVisible: false,
        isNotiMenuVisible: false,
        searchBarIsVisible: false,
      };
    default:
      return state;
  }
};

export default menuReducer