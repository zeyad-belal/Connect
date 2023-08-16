/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar.jsx";
import { useEffect, useReducer, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BsFillBellFill, BsFillCollectionFill, BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import SubNav from "./SubNav";
import { MdAdd } from "react-icons/md";
import { BiSolidTruck } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { FaSignOutAlt } from "react-icons/fa";
import { Backdrop } from "../../UI/Modal";
import menuReducer, { ActionTypes } from "./menuReducer.js";
import { AiFillHome } from "react-icons/ai";
import { PiShoppingBagFill } from "react-icons/pi";
import { useDispatch , useSelector } from "react-redux"
import { signModalActions } from "../../store/signModalSlice.jsx";

const Navbar = (props) => {
  const totalItemsNum = useSelector((state)=> state.cart.totalItemsNum);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const userStatus = window.localStorage.getItem("logged");
  const [cookies, setCookie, removeCookie] = useCookies(["UserToken", "User"]);
  const [CurrUser, setCurrUser] = useState("");

  const [menuState, Mdispatch] = useReducer(menuReducer, {
    subIsVisible: false,
    isUserMenuVisible: false,
    isNotiMenuVisible: false,
    searchBarIsVisible: false,
  });

  function signoutHandler() {
    window.localStorage.removeItem("logged");
    removeCookie("UserToken");
    removeCookie("User");
    window.localStorage.removeItem("User");
    window.localStorage.removeItem("UserToken");
    navigate("/");
    window.location.reload();
  }

  useEffect(() => {
    if (cookies.User) {
      setCurrUser(cookies.User);
    }
  }, [cookies.User]);

  return (
    <>
      <nav
        id="MainNav"
        className=" relative border-b border-gray-300  top-0  bg-white my-30 h-15 w-full z-50 md:px-5 px-1 flex justify-between "
      >
        <ul className="flex ">
          {/* subnav icon  */}
          <li
            className={
              menuState.subIsVisible
                ? "mr-3 cursor-pointer text-lg flex lg:hidden items-center rounded-lg  px-2 my-2 mx-2 text-text1 bg-primary"
                : "mr-3 cursor-pointer  lg:hidden text-lg flex items-center rounded-lg  px-2 my-2 mx-2 text-text1 hover:bg-primary"
            }
            onClick={() => Mdispatch({ type: ActionTypes.TOGGLE_SUB_NAV })}
          >
            <FiMenu size={30} />
          </li>
          {/* Logo */}
          <Link
            to={"/"}
            className="md:flex hidden items-baseline py-2 mx-1 h-auto sm:w-56"
          >
            <li onClick={() => Mdispatch({ type: ActionTypes.CLOSE_ALL_MENUS })}>
              <img
                className="max-w-[200px]"
                src="/assets/logo/main-yellow-and-white.png"
                alt="Connect"
              />
            </li>
          </Link>
          <li className="text-md items-center rounded-lg lg:flex hidden  px-3 my-3 mx-2 text-text1 hover:bg-primary  cursor-pointer gap-2">
            <MdAdd /> Add service
          </li>
          <li className="text-md items-center rounded-lg lg:flex hidden  px-3 my-3 mx-2 text-text1 hover:bg-primary  cursor-pointer gap-2">
            <BsFillCollectionFill /> Categories
          </li>
          <li className="text-md items-center rounded-lg lg:flex hidden  px-3 my-3 mx-2 text-text1 hover:bg-primary  cursor-pointer gap-2">
            <BiSolidTruck size={22} /> Orders
          </li>
          <li className="text-md items-center rounded-lg lg:flex hidden  px-3 my-3 mx-2 text-text1 hover:bg-primary  cursor-pointer gap-2">
            <PiShoppingBagFill size={22} /> Purchases
          </li>
        </ul>

        {/* ----------------------------------------------------------------------------- */}
        <ul className="flex ">
          {/* home  */}
          <Link
            to={"/"}
            className="md:hidden flex items-center rounded-full px-3 my-3 mx-2 text-text1 hover:bg-primary  cursor-pointer gap-2"
          >
            <li onClick={() => Mdispatch({ type: ActionTypes.CLOSE_ALL_MENUS })}>
              <AiFillHome size={20} />
            </li>
          </Link>
          {/* Searchbar  */}
          <li
            className={
              menuState.searchBarIsVisible
                ? "search flex items-center rounded-full  px-3 my-3 mx-2 text-text1 bg-primary cursor-pointer"
                : "search flex items-center rounded-full  px-3 my-3 mx-2 text-text1  hover:bg-primary cursor-pointer"
            }
            onClick={() => Mdispatch({ type: ActionTypes.TOGGLE_SEARCH_BAR })}
          >
            <BsSearch size={20} />
          </li>
          {/* notifcations  */}
          <li
            className={
              menuState.isNotiMenuVisible
                ? "flex items-center rounded-full  px-3 my-3 mx-2 text-text1 bg-primary cursor-pointer"
                : "flex items-center rounded-full  px-3 my-3 mx-2 text-text1 hover:bg-primary cursor-pointer"
            }
            onClick={() => Mdispatch({ type: ActionTypes.TOGGLE_NOTI_MENU })}
          >
            <BsFillBellFill size={20} />
            {/* -------noti menu------- */}
            {menuState.isNotiMenuVisible && (
              <>
                <div className="relative z-30  ">
                  <ul className="flex flex-col  absolute bg-white rounded-br-lg rounded-bl-lg right-[-21px]   top-[30px] min-w-[150px]   shadow-md  border-gray-300">
                    {/* <div className="absolute  before:w-0  before:h-0  before:transform before:-rotate-45  before:border-white before:border-8 before:bg-white before:absolute before:top-[-3px] before:right-[-127px]"></div> */}
                    <li className="flex gap-2 border-b-2 border-primary items-center z-10 py-2 px-2  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer">
                      handle noti here
                    </li>
                    <li className="flex gap-2 border-b-2 border-primary items-center z-10 py-2 px-2  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer">
                      handle noti here
                    </li>
                    <li className="flex gap-2 border-b-2 border-primary items-center z-10 py-2 px-2  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer">
                      handle noti here
                    </li>
                  </ul>
                </div>
              </>
            )}
          </li>
          {/* cart  */}
          <Link
            className="text-text1 flex items-center relative hover:bg-primary rounded-full  px-3 my-3 mx-2"
            to="/cart"
          >
            <li
              className="flex items-center "
              onClick={() => Mdispatch({ type: ActionTypes.CLOSE_ALL_MENUS })}
            >
              <FaShoppingCart size={20} />
              {totalItemsNum > 0 && (
                <span className="ml-1 bg-text1 text-white rounded-full px-[7px] py-[1px] text-[14px] absolute right-[-20px] top-[-17px]">
                  {totalItemsNum}
                </span>
              )}
            </li>
          </Link>
          {/* user  */}
          <li className="flex items-center py-2 sm:px-6 px-0  text-text1  text-sm:10 ">
            {userStatus ? (
              <div
                className="relative max-w-[100px] cursor-pointer  border-text1 border-2 rounded-full"
                onClick={() => Mdispatch({ type: ActionTypes.TOGGLE_USER_MENU })}
              >
                <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={CurrUser.avatar}
                    alt="User Avatar"
                  />
                </div>
                {/* --------menu------ */}
                {menuState.isUserMenuVisible && (
                  <>
                    <div className="relative z-30">
                      <ul className="flex flex-col gap-3  absolute right-[-10px]   bottom-[-95px] min-w-[150px] bg-white  shadow-md ">
                        {/* <div className="absolute before:w-0  before:h-0  before:transform before:-rotate-45  before:border-white before:border-8 before:bg-white before:absolute before:top-[-3px] before:right-[-127px]"></div> */}

                        <li
                          className="flex gap-2 items-center z-10 py-2 pl-2 pr-6  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer"
                          onClick={() => navigate("/userInfo")}
                        >
                          {" "}
                          <RxAvatar size={22} /> {CurrUser.first_name}{" "}
                          {CurrUser.last_name}
                        </li>

                        <li
                          onClick={signoutHandler}
                          className=" flex gap-2 items-center py-2 pl-2 pr-6  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer"
                        >
                          <FaSignOutAlt className="ml-1" size={20} /> Sign Out{" "}
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                className="hover:text-text1 whitespace-nowrap text-[15px] ml-1"
                onClick={() => dispatch(signModalActions.toggleModal())} >
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>

      <Searchbar {...props} searchBarIsVisible={menuState.searchBarIsVisible} />
      {/* close overlay  */}
      {menuState.isNotiMenuVisible ||
      menuState.isUserMenuVisible ||
      menuState.searchBarIsVisible ? (
        <div
          className=" fixed top-0 left-0 w-full h-screen z-10 bg-opacity-40"
          onClick={() => Mdispatch({ type: ActionTypes.CLOSE_ALL_MENUS })}
        ></div>
      ) : (
        ""
      )}
      {/* -------------------------------------------------------------------------------------------------------------- */}
      {menuState.subIsVisible ? (
        <Backdrop
          toggleModal={() => Mdispatch({ type: ActionTypes.TOGGLE_SUB_NAV })}
        />
      ) : (
        ""
      )}
      <SubNav
        {...props}
        subIsVisible={menuState.subIsVisible}
        toggleSubNav={() => Mdispatch({ type: ActionTypes.TOGGLE_SUB_NAV })}
      />
    </>
  );
};

export default Navbar;
