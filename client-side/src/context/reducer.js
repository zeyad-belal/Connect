const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "LOADING":
      return { ...state, loading: true };
    case "DISPLAY_PRODUCTS":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
