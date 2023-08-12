/* eslint-disable react/prop-types */

import { Transition } from "react-transition-group";

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
    <div className="fixed z-[51] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white px-5 py-10 rounded-lg shadow-md animate-slide-down">
      {props.children}
    </div>
  );
}


function Modal(props) {
  return (
    <>
    <Transition in={props.subIsVisible} 
        timeout={400}
        mountOnEnter
        unmountOnExit >
          {state => (
            <div
              style={{
                transition: 'opacity 0.4s ease-in-out',
                opacity: state === 'entering' || state === 'entered' ? '1' : '0'
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
