const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SERVICES":
      return { ...state, services: action.payload };
    case "LOADING":
      return { ...state, loading: true };
    case "DISPLAY_SERVICES":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
