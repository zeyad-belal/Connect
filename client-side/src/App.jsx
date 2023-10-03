/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Cart from "./pages/Cart.jsx";
import Footer from "../src/components/Layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import { useEffect, useState } from "react";
import Navbar from "./components/Layout/Navbar.jsx";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound.jsx";
import Services from "./pages/Services.jsx";
import Service from "./pages/Service.jsx";
import About from "./pages/About.jsx";
import { useCookies } from "react-cookie";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import UserInfo from "./pages/UserInfo.jsx";
import { fetchCartItems, sendCartItems } from "./store/cartSlice.jsx";
import { fetchServices } from "./store/servicesSlice.jsx";
import { useSelector, useDispatch } from "react-redux";
import Purchases from "./pages/Purchases.jsx";
import AddService from "./pages/AddService.jsx";
import Seller from "./pages/Seller.jsx";
import IncomingOrders from "./pages/IncomingOrders.jsx";
import "./App.css";
import { menuActions } from "./store/menuSlice.jsx";
import Chat from "./pages/Chat.jsx";
import io from 'socket.io-client';
import axios from "axios";
import { toast } from "react-toastify";


let firstRender = true;

function App() {
  const [cookies, setCookies] = useCookies(["UserToken", "User"]);

  const signModal = useSelector((state) => state.signModal);
  const cart = useSelector((state) => state.cart);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const socket = io(import.meta.env.VITE_API_URL);
  const [noti, setNoti] = useState([])
  const [userStatus, setUserStatus] = useState(window.localStorage.getItem("logged")|| false);


  // FETCHING SERVICES
  useEffect(() => {
    dispatch(fetchServices());

  }, []);

  // FETCHING CART ITEMS
  useEffect(() => {
    if (window.localStorage.getItem("logged")) {
      cookies.User
        ? dispatch(fetchCartItems(cookies.User.id, cookies.UserToken))
        : "";
    }
  }, []);

  // UPDATING CART ITEMS IN THE BACKEND ON CHANGE
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }
    if (window.localStorage.getItem("logged") && cart.changed) {
      sendCartItems(cart, cookies.User.id, cookies.UserToken);
    }
  }, [cart]);



  //handle socket
  useEffect(() => {
    socket.on('connect', () => {
      console.log(`You are connected on ${socket.id}`)
      socket.emit("join-room", 'global')
      console.log(`front joined room global`)
    });

    // Listen for incoming chat messages from the server
    socket.on('receive-noti', (message) => {
      message?
      setNoti(prevMessages => [...prevMessages, message] )
      : ''
    });

    // Clean up the socket event listener before the component unmounts and send the chat history to backend
    return () => {
      socket.off('connect');
      socket.off('receive-noti');
    };
  }, [socket.id]);




  // useEffect(() => {
  //   const userId = cookies.User ? cookies.User._id : localStorage.getItem("userID");
  //   const userToken = cookies.UserToken || localStorage.getItem("UserToken");

  //   console.log('userToken from app',userToken)
  //   console.log('userId from app',userId)
  //   async function getUserData() {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_API_URL}/users/${userId}`,
  //         { headers: { Authorization: userToken } } );
          
  //       setCookies("User", response.data.user);
  //       setCookies("UserToken", response.data.token);
  //       setUserStatus(true)
  //     } catch (error) {
  //       setUserStatus(false)
  //       console.error(error);
  //       toast.info("Something went wrong !", {
  //         position: "top-right",
  //         autoClose: 1500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light"
  //       });
  //     }
  //   }

  //   if (userId && userToken) {
  //       getUserData();
  //       console.log('getUserData fired')
  //     }else {
  //       window.localStorage.removeItem("logged")
  //       setUserStatus(false)
      
  //   }
  // }, []);







  // get noti history
  // useEffect(()=>{
  //   async function getNotiHistory(){
  //     const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
  //     { headers: { Authorization: `${cookies.UserToken}` } })
  //     console.log(res.data.user.noti)
  //     setNoti(res.data.user.noti)
  //   }
    
  //   try{
  //     localStorage.getItem('logged') ?getNotiHistory() : ''
  //   }catch(error){
  //     console.log('cannot get chat history', error)
  //   }
  // },[])


  useEffect(()=>{
    if(!cookies.User || !cookies.USerToken){
      window.localStorage.removeItem("logged")
    }
  },[])


  return (
    <div className="app">
      {menu.isSubVisible ? (
        <div
          className="bg-black opacity-30 min-w-full min-h-full fixed z-[9] top-0 left-0"
          onClick={() => dispatch(menuActions.toggleSubNav())}
        ></div>
      ) : (
        ""
      )}
      {/* sign in Modals */}
      {signModal.modalIsShown && signModal.loginModalStatus && <Login />}
      {signModal.modalIsShown && signModal.signUpModalStatus && <Signup />}

      <div className="sticky block top-0 z-50">
        <Navbar noti={noti} userStatus={userStatus} setUserStatus={setUserStatus} />
      </div>
      <Routes>
        <Route path="/" element={<Home setUserStatus={setUserStatus} />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<Service />} />
        <Route path="/addService" element={<AddService />} />
        <Route path="/incomingOrders" element={<IncomingOrders />} />
        <Route path="/chat/:room" element={<Chat />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/about" element={<About />} />
        <Route path="/seller/:id" element={<Seller />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
