/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar.jsx";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { BsFillBellFill, BsFillCollectionFill, BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import SubNav from "./SubNav";
import { MdAdd } from "react-icons/md";
import { BiSolidTruck } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { FaSignOutAlt } from "react-icons/fa";
import { Backdrop } from "../../UI/Modal";

const Navbar = (props) => {
  const navigate = useNavigate();
  const userCTX = useContext(UserContext);
  const cartCTX = useContext(CartContext);
  const userStatus = window.localStorage.getItem("logged");
  const [cookies, setCookie, removeCookie] = useCookies(["UserToken", "User"]);
  const [CurrUser, setCurrUser] = useState("");
  const [subIsVisible, setSubIsVisible] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [isNotiMenuVisible, setIsNotiMenuVisible] = useState(false);
  const [searchBarIsVisible, setSearchBarIsVisible] = useState(false);


  const toggleUserMenu = () => {
    setIsNotiMenuVisible(false)
    setSearchBarIsVisible(false)
    setSubIsVisible(false);
    setIsUserMenuVisible(prevValue => !prevValue);
  };
  const toggleNotiMenu = () => {
    setIsUserMenuVisible(false)
    setSearchBarIsVisible(false)
    setSubIsVisible(false);
    setIsNotiMenuVisible(prevValue => !prevValue);
  };
  
  function toggleSubNav(){
    setIsUserMenuVisible(false);
    setIsNotiMenuVisible(false);
    setSubIsVisible(prevValue => !prevValue)
  }
  
  function toggleSearchBar(){
    setIsUserMenuVisible(false);
    setIsNotiMenuVisible(false);
    setSubIsVisible(false);
    setSearchBarIsVisible(prevState => !prevState)
  }

  
  function closeAllMenus(){
    setIsNotiMenuVisible(false);
    setIsUserMenuVisible(false);
    setSearchBarIsVisible(false);
    setSubIsVisible(false);
  }


  useEffect(() => {
    if (cookies.User) {
      setCurrUser(cookies.User);
    }
  }, [cookies.User]);

  function signoutHandler() {
    window.localStorage.removeItem("logged");
    removeCookie("UserToken");
    removeCookie("User");
    window.localStorage.removeItem("User");
    window.localStorage.removeItem("UserToken");
    navigate("/");
    window.location.reload();
  }


  return (
    <>
      <nav
        id="MainNav"
        className=" relative  top-0  bg-primary text-white  my-30 h-15 w-full z-50 sm:px-7 px-4 flex justify-between " >
        <ul className="flex ">
        <li className=" mr-3 cursor-pointer text-lg flex items-center py-2 px-6 text-white hover:bg-gray-500" onClick={toggleSubNav}>
        <FiMenu size={30} />
        </li>
        {/* Logo */}
        <Link to={"/"}>
          <li className="flex items-baseline py-2 mr-4 w-44 sm:w-56" onClick={closeAllMenus}>
            <img
              className="max-w-[220px]"
              src="/assets/logo/main-yellow-and-white.png"
              alt="Connect"
              />
          </li>
        </Link>
        <li className="text-md flex items-center py-2 px-4 text-white hover:bg-gray-500  cursor-pointer gap-2"> <MdAdd /> Add service </li>
        <li className="text-md flex items-center py-2 px-4 text-white hover:bg-gray-500  cursor-pointer gap-2"><BsFillCollectionFill /> Categories</li>
        <li className="text-md flex items-center py-2 px-4 text-white hover:bg-gray-500  cursor-pointer gap-2"><BiSolidTruck size={22} /> Orders</li>
        </ul>
        
      {/* ----------------------------------------------------------------------------- */}
        <ul className="flex ">
          {/* Searchbar  */}
          <li className={searchBarIsVisible ?
            "search flex items-center py-2 px-6 text-white bg-gray-500  hover:bg-gray-500 cursor-pointer" :
            "search flex items-center py-2 px-6 text-white  hover:bg-gray-500 cursor-pointer"} onClick={toggleSearchBar}>
            <BsSearch size={20} />
          </li>

          {/* notifcations  */}
          <li className="flex items-center py-2 px-6 text-white hover:bg-gray-500  cursor-pointer" onClick={toggleNotiMenu}>
            <BsFillBellFill size={20} />

            {isNotiMenuVisible && (
              <>
              <div className="relative z-30">
                      <ul className="flex flex-col gap-3 absolute right-[-21px]   bottom-[-117px] min-w-[150px] bg-white  shadow-md border border-gray-300">
                        <div className="absolute before:w-0  before:h-0  before:transform before:-rotate-45  before:border-white before:border-8 before:bg-white before:absolute before:top-[-3px] before:right-[-127px]"></div>
                          
                          <li className="flex gap-2 items-center z-10 py-2 pl-2 pr-6  text-sm font-semibold text-primary hover:bg-gray-300 cursor-pointer" 
                          > <RxAvatar size={22} /> {CurrUser.first_name} {CurrUser.last_name}</li>
                          <li
                            onClick={signoutHandler}
                            className=" flex gap-2 items-center py-2 pl-2 pr-6  text-sm font-semibold text-primary hover:bg-gray-300 cursor-pointer" >
                            <FaSignOutAlt className="ml-1" size={20} /> Sign Out{" "}
                          </li>
                        </ul>
              </div>
              {/* <div className=" fixed top-0 left-0 w-full h-screen z-20 bg-opacity-40"></div> */}
              </>
                )}
          </li>
          {/* cart  */}
            <Link
              className="text-white flex items-center relative hover:bg-gray-500 "
              to="/cart" >
                <li className="flex items-center py-2 px-6  ">
                <FaShoppingCart size={20} onClick={closeAllMenus} />
                {cartCTX.totalItemsNum > 0 && (
                  <span className="ml-1 bg-f37020 text-white rounded-full px-[7px] py-[1px] text-[14px] absolute right-[-20px] top-[-17px]">
                    {cartCTX.totalItemsNum}
                  </span>
                )}
                </li>
            </Link>
          {/* user  */}
          <li className="flex items-center py-2 px-6 text-white  text-sm:10 " >
            {userStatus ? (
              <div className="relative  border-black" onClick={toggleUserMenu}>
                <img
                  className="max-w-[40px] rounded-full cursor-pointer border-inner border-black"
                  src={CurrUser.avatar}
                  alt="User Avatar"
                />

                {isUserMenuVisible && (
                  <>
                    <div className="relative z-30">
                      <ul className="flex flex-col gap-3  absolute right-[-10px]   bottom-[-97px] min-w-[150px] bg-white  shadow-md border border-gray-300">
                        <div className="absolute before:w-0  before:h-0  before:transform before:-rotate-45  before:border-white before:border-8 before:bg-white before:absolute before:top-[-3px] before:right-[-127px]"></div>
                          
                          <li className="flex gap-2 items-center z-10 py-2 pl-2 pr-6  text-sm font-semibold text-primary hover:bg-gray-300 cursor-pointer" 
                          > <RxAvatar size={22} /> {CurrUser.first_name} {CurrUser.last_name}</li>
                          <li
                            onClick={signoutHandler}
                            className=" flex gap-2 items-center py-2 pl-2 pr-6  text-sm font-semibold text-primary hover:bg-gray-300 cursor-pointer" >
                            <FaSignOutAlt className="ml-1" size={20} /> Sign Out{" "}
                          </li>
                        </ul>
                      </div>
                      {/* <div className=" fixed top-0 left-0 w-full h-screen z-20 bg-opacity-40"></div> */}
                  </>
                )}
              </div>
            ) : (
              <button
                className="hover:text-gray-400 whitespace-nowrap text-[15px] ml-1"
                onClick={() => userCTX.toggleModal()} >
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>
      <Searchbar {...props} searchBarIsVisible={searchBarIsVisible} />
      {isNotiMenuVisible || isUserMenuVisible || searchBarIsVisible ? <div className=" fixed top-0 left-0 w-full h-screen z-20 bg-opacity-40" onClick={closeAllMenus}></div>: ''}
{/* -------------------------------------------------------------------------------------------------------------- */}
        {subIsVisible? <Backdrop  toggleModal={toggleSubNav} /> : ''}
        <SubNav {...props} subIsVisible={subIsVisible} toggleSubNav={toggleSubNav} />
    </>
  );
};

export default Navbar;
