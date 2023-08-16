/* eslint-disable react/prop-types */
import { useReducer } from "react";

import UserContext from "./UserContext";

//--------------------------------Reducer-------------------------------------------



const defaultUserState = {
  modalIsShown: false,
  loginModalStatus: true,
  signUpModalStatus: false,
};

function UserReducer(state, action) {
  if (action.type === "TOGGLEMODAL") {

    return {
      ...state,
        modalIsShown: !state.modalIsShown,
    };
  }

  if (action.type === "TOGGLEMODALCONTENT") {

    return {
      ...state,
        loginModalStatus: !state.loginModalStatus,
        signUpModalStatus: !state.signUpModalStatus,
    };
  }


  return defaultUserState;
}

//--------------------------------Provider-------------------------------------------

function UserProvider(props) {
  const [UserState, UserDispatch] = useReducer(UserReducer, defaultUserState);

  const UserContextValue = {
    modalIsShown: UserState.modalIsShown,
    loginModalStatus: UserState.loginModalStatus,
    signUpModalStatus : UserState.signUpModalStatus ,
    toggleModal:toggleModal,
    toggleModalContent:toggleModalContent
  };

  function toggleModal() {
    UserDispatch({ type: "TOGGLEMODAL"});
  }

  function toggleModalContent() {
    UserDispatch({ type: "TOGGLEMODALCONTENT"});
  }



  return (
    <UserContext.Provider value={UserContextValue}>
      {props.children}
    </UserContext.Provider>
  );
}


export default UserProvider;