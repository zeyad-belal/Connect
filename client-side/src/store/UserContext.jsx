/* eslint-disable no-unused-vars */

import React from "react"

const UserContext = React.createContext({
  modalIsShown: false,
  loginModalStatus: true,
  signUpModalStatus : false,
  toggleModal:()=>{},
  toggleModalContent:()=>{}
})

export default UserContext