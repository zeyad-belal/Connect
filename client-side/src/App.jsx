/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Footer from "../src/components/Layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./components/Layout/Navbar.jsx";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound.jsx";
import Services from "./pages/Services.jsx";
import ServicePage from "./pages/Service.jsx";
import About from "./pages/About.jsx";
import { useGlobalContext } from "./store/ServicesContext.jsx";
import { useCookies } from "react-cookie";
import { fetchCartItems, sendCartItems }  from "./store/cartSlice.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import UserContext from "./store/UserContext.jsx";
import UserInfo from "./pages/UserInfo.jsx";
import {useSelector, useDispatch} from "react-redux"


let firstRender =true;

function App() {
  const [searchText, setSearchText] = useState("");
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const { fetchServices } = useGlobalContext();
  const userCTX = useContext(UserContext);

  const cart = useSelector((state)=> state.cart);
  const dispatch = useDispatch()

  // FETCHING SERVICES
  useEffect(() => {
    fetchServices();
    window.localStorage.setItem("User", JSON.stringify(cookies.User));
    window.localStorage.setItem("UserToken", cookies.UserToken);
  }, []);

  // FETCHING CART ITEMS
  useEffect(() => {
    if (window.localStorage.getItem("logged")) {
      dispatch(fetchCartItems(cookies.User.id , cookies.UserToken));
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
    <div className="bg-primary">
      {/* sign in Modals */}
      {userCTX.modalIsShown && userCTX.loginModalStatus && <Login />}
      {userCTX.modalIsShown && userCTX.signUpModalStatus && <Signup />}

      <div className="sticky block top-0 z-50">
        <Navbar searchText={searchText} setSearchText={setSearchText} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/services" element={<Services />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/services/:id" element={<ServicePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
