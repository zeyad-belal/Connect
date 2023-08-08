/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Footer from "../src/components/Layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import FreeShipping from "./pages/FreeShipping.jsx";
import TechServices from "./pages/TechServices.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./components/Layout/Navbar.jsx";
import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound.jsx";
import Products from "./pages/Products.jsx";
import ProductPage from "./pages/Product.jsx";
import About from "./pages/About.jsx";
import Subnav from "./components/Layout/Subnav.jsx";
import { useGlobalContext } from "./context/ProductsContext.jsx";
import CartContext from "./context/CartContext.jsx";
import { useCookies } from 'react-cookie';
import { useCartContext } from "./context/CartProvider.jsx";


function App() {
  const [searchText, setSearchText] = useState("");
  const [cookies, setCookie] = useCookies(['UserToken','User']);
  const { fetchProducts } = useGlobalContext();
  const myCart = useContext(CartContext)
  const {fetchCartItems,sendCartItems} = useCartContext()
  const initialRenderRef = useRef(true);
  // FETCHING PRODUCTS 
  useEffect(() => {
      fetchProducts();
      window.localStorage.setItem('User',JSON.stringify(cookies.User))
      window.localStorage.setItem('UserToken',cookies.UserToken)
  }, [] );

  // UPDATING cart items in backend on change
  useEffect(() => {
    async function sendData(){
      sendCartItems(myCart, cookies.User.id, cookies.UserToken);
    }
    // console.log("intial :" , initialRenderRef.current)
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }
      if(window.localStorage.getItem('logged')){
        sendData()
      }
    
  }, [myCart]);
  

  // getting cart items FROM backend AFTER refresh
  useEffect(() => {
    if(window.localStorage.getItem('logged')){  
      fetchCartItems()
    }
  }, []);
  

  return (
    <>
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <div className="sticky block top-0 z-40">
        <Subnav />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Techservices" element={<TechServices />} />
        <Route path="/Freeshipping" element={<FreeShipping />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

