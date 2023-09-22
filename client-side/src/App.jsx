/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Cart from "./pages/Cart.jsx";
import Footer from "../src/components/Layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import { useEffect } from "react";
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
import { fetchCartItems, sendCartItems }  from "./store/cartSlice.jsx";
import { fetchServices }  from "./store/servicesSlice.jsx";
import {useSelector, useDispatch} from "react-redux"
import Purchases from "./pages/Purchases.jsx";
import AddService from "./pages/AddService.jsx";
import Seller from "./pages/Seller.jsx";
import IncomingOrders from "./pages/IncomingOrders.jsx";
import "./App.css"
import { menuActions } from "./store/menuSlice.jsx";

let firstRender =true;

function App() {
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);

  const signModal = useSelector((state)=> state.signModal);
  const cart = useSelector((state)=> state.cart);
  const menu = useSelector((state)=> state.menu);
  const dispatch = useDispatch()
  // FETCHING SERVICES
  useEffect(() => {
    dispatch(fetchServices());
    window.localStorage.setItem("User", JSON.stringify(cookies.User));
    window.localStorage.setItem("UserToken", cookies.UserToken);
  }, []);

  // FETCHING CART ITEMS
  useEffect(() => {
    if (window.localStorage.getItem("logged")) {
      cookies.User?
      dispatch(fetchCartItems(cookies.User.id , cookies.UserToken)) : ''
    }
  }, []);

  // UPDATING CART ITEMS IN THE BACKEND ON CHANGE
  useEffect(() => {
    if (firstRender) {
      firstRender= false;
      return;
    }
    if (window.localStorage.getItem("logged") && cart.changed) {
      sendCartItems(cart, cookies.User.id, cookies.UserToken);
    }
  }, [cart]);



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
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<Service />} />
        <Route path="/addService" element={<AddService />} />
        <Route path="/incomingOrders" element={<IncomingOrders />} />
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
