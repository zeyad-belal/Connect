/* eslint-disable react/prop-types */
import ReactDom from "react-dom";

function Backdrop(props) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20 bg-black bg-opacity-75"
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

const modalDestintion = document.getElementById("overlayers");

function Modal(props) {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop toggleModal={props.toggleModal} />,
        modalDestintion
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        modalDestintion
      )}
    </>
  );
}

export default Modal;
