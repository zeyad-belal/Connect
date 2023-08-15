/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Transition } from "react-transition-group";
import UserContext from "../context/UserContext";

export function Backdrop(props) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20 bg-black bg-opacity-40"
      onClick={props.toggleModal}
    ></div>
  );
}


function ModalOverlay(props) {
  return (
      <div className="fixed z-[51] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white mx-1 py-5 rounded-lg shadow-md animate-slide-down">
        {props.children}
      </div>
  );
}


function Modal(props) {
  const userCTX = useContext(UserContext);
  return (
    <>
      <Transition in={userCTX.modalIsShown} 
      timeout={1000}
      mountOnEnter
      unmountOnExit >
          {state => (
            <div
              style={{
                transition: 'opacity 1s ease-in-out',
                opacity: state === 'entered' || state === 'entering' ? '1' : '0'
              }}
              
            >
              <Backdrop toggleModal={props.toggleModal} />
              <ModalOverlay>{props.children}</ModalOverlay>
            </div>
          )}
      </Transition>
    </>
  );
}


export default Modal;
