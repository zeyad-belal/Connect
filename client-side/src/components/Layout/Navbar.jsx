/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar.jsx";
import { useEffect, useState } from "react";
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
import { AiFillHome } from "react-icons/ai";
import { PiShoppingBagFill } from "react-icons/pi";
import { useDispatch , useSelector } from "react-redux"
import { signModalActions } from "../../store/signModalSlice.jsx";
import { menuActions } from "../../store/menuSlice.jsx";
import axios from "axios";



const Navbar = (props) => {
  const cart = useSelector((state)=> state.cart);
  const menu = useSelector((state)=> state.menu);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const userStatus = window.localStorage.getItem("logged");
  const [cookies, setCookie, removeCookie] = useCookies(["UserToken", "User"]);
  const [CurrUser, setCurrUser] = useState("");
  const [categories, setCategories] = useState([]);



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



  useEffect(()=>{
    async function getCategories(){
      const repsonse = await  axios.get( `${import.meta.env.VITE_API_URL}/categories`)
      setCategories(repsonse.data)
    }
    getCategories()
  },[])



  return (
    <>
      <nav
        id="MainNav"
        className=" relative border-b border-gray-300  top-0  bg-white  h-15 w-full z-50 lg:px-5 px-1  flex justify-between "
      >
        <ul className="flex ">
          {/* subnav icon  */}
          <li
            className={
              menu.isSubVisible
                ? " cursor-pointer text-lg flex lg:hidden items-center rounded-lg  px-5 py-3  text-text1 bg-primary"
                : " cursor-pointer  lg:hidden text-lg flex items-center rounded-lg  px-5 py-3  text-text1 hover:bg-primary"
            }
            onClick={() => dispatch(menuActions.toggleSubNav())} >
            <FiMenu size={30} />
          </li>
          {/* Logo */}
          <Link
            to={"/"}
            className="md:flex hidden items-center py-2 h-auto sm:w-56" >
            <li onClick={() => dispatch(menuActions.closeAllMenus())}>
              <img
                className="max-w-[160px] mb-[-8px] ml-4"
                src="/assets/logo/main-yellow-and-white.png"
                alt="Connect"
              />
            </li>
          </Link>
          {/* Add Service */}
          <li className="text-md items-center shrink-0  lg:flex hidden  px-5 py-3  text-text1 hover:bg-primary  cursor-pointer gap-2"
          onClick={()=>navigate('/addService')} >
            <MdAdd /> Add service
          </li>
          {/* Catgories */}
          <li
            className={menu.isCatgMenuVisible
              ? "relative hidden lg:flex items-center  px-5 py-3  text-text1 bg-primary cursor-pointer gap-2"
              : "relative hidden lg:flex items-center  px-5 py-3  text-text1 hover:bg-primary cursor-pointer gap-2"}
              onClick={() => dispatch(menuActions.toggleCategories())}  >
            <BsFillCollectionFill /> Categories
            {menu.isCatgMenuVisible && 
            <div className="bottom-[-225%] right-[-250%] rounded-md  z-40 absolute mt-2 w-[500%] text-center  bg-white  shadow-lg">
              <ul className="flex flex-wrap">
                {categories.map(category =>{
                  return <li
                  onClick={()=>navigate(`/services?category=${category.category_name}`)}
                  className="border border-gray-100 cursor-pointer text-sm hover:bg-primary rounded-md  px-5 py-6 w-[25%]"
                  key={category.id}>{category.category_name.toUpperCase()}</li>
                })}
              </ul>
            </div>}
          </li>
          {/* Orders */}
          <li className="text-md items-center  lg:flex hidden  px-5 py-3   text-text1 hover:bg-primary  cursor-pointer gap-2"
          onClick={()=>navigate('/orders')}>
            <BiSolidTruck size={22} /> Orders
          </li>
          {/* Purchases */}
          <li className="text-md items-center  lg:flex hidden  px-5 py-3   text-text1 hover:bg-primary  cursor-pointer gap-2"
          onClick={()=>navigate('/purchases')}>
            <PiShoppingBagFill size={22} /> Purchases
          </li>
        </ul>

        {/* ----------------------------------------------------------------------------- */}
        <ul className="flex ">
          {/* home  */}
          <Link
            to={"/"}
            className="md:hidden flex items-center rounded-full px-1 my-3 mx-2 text-text1 hover:bg-primary  cursor-pointer gap-2"
          >
            <li onClick={() => dispatch(menuActions.closeAllMenus())}>
              <AiFillHome size={22} />
            </li>
          </Link>
          {/* Searchbar  */}
          <li
            className={
              menu.isSearchBarVisible
                ? "search flex items-center px-5 py-3 text-text1 bg-primary cursor-pointer"
                : "search flex items-center px-5 py-3 text-text1  hover:bg-primary cursor-pointer"}
            onClick={() => dispatch(menuActions.toggleSearchBar())} >
            <BsSearch size={20} />
          </li>
          {/* notifcations  */}
          <li
            className={
              menu.isNotiMenuVisible
                ? "flex items-center  px-5 py-3 text-text1 bg-primary cursor-pointer"
                : "flex items-center  px-5 py-3 text-text1 hover:bg-primary cursor-pointer" }
            onClick={() => dispatch(menuActions.toggleNotiMenu())} >
            <BsFillBellFill size={20} />
            {/* -------noti menu------- */}
            {menu.isNotiMenuVisible && (
              <>
                <div className="relative z-30  ">
                  <ul className="flex flex-col rounded-br-md rounded-bl-md  overflow-hidden absolute bg-white  right-[-21px]   top-[30px] min-w-[150px]   shadow-md  border-gray-300">
                    <li className="flex gap-2 rounded-md     border-primary items-center z-10 py-2 px-2  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer">
                      handle noti here
                    </li>
                    <li className="flex gap-2 rounded-md   border-t-2 border-primary items-center z-10 py-2 px-2  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer">
                      handle noti here
                    </li>
                    <li className="flex gap-2 rounded-md    border-t-2  border-primary items-center z-10 py-2 px-2  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer">
                      handle noti here
                    </li>
                  </ul>
                </div>
              </>
            )}
          </li>
          {/* cart  */}
          <Link
            className="text-text1 flex items-center relative hover:bg-primary px-5 py-3"
            to="/cart">
            <li
              className="flex items-center"
              onClick={() => dispatch(menuActions.closeAllMenus())}>
              <FaShoppingCart size={20} />
              {cart.totalItemsNum > 0 && (
                <span className="ml-1 bg-text1 text-white rounded-full px-[6px] text-[12px]  absolute right-[-1px] top-[7px]">
                  {cart.totalItemsNum}
                </span>
              )}
            </li>
          </Link>
          {/* user  */}
          <li className="flex items-center py-2 sm:px-6 px-1  text-text1  text-sm:10 ">
            {userStatus ? (
              <div
                className="relative max-w-[100px] cursor-pointer  border-text1 border-2 rounded-full"
                onClick={() => dispatch(menuActions.toggleUserMenu())} >
                <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={CurrUser.avatar}
                    alt="User Avatar" />
                </div>
                {/* --------menu------ */}
                {menu.isUserMenuVisible && (
                  <>
                    <div className="relative z-30">
                      <ul className="flex flex-col gap-1 rounded-br-md rounded-bl-md absolute right-[-10px]   bottom-[-87px] min-w-[150px] bg-white  shadow-md ">
                        <li
                          className="flex gap-2 items-center z-10 py-2 pl-2 pr-6  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer"
                          onClick={() => navigate("/userInfo")}>
                          {" "}
                          <RxAvatar size={22} /> {CurrUser.first_name}{" "}
                          {CurrUser.last_name}
                        </li>

                        <li
                          onClick={signoutHandler}
                          className=" flex gap-2 items-center py-2 pl-2 pr-6  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer">
                          <FaSignOutAlt className="ml-1" size={20} /> Sign Out{" "}
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                className="text-text1 transition-all whitespace-nowrap text-[15px] rounded-md font-semibold border-2 hover:text-white hover:bg-text1 border-text1 px-3 py-2"
                onClick={() => dispatch(signModalActions.toggleModal())} >
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>

      <Searchbar {...props} isSearchBarVisible={menu.isSearchBarVisible} />
      {/* close overlay  */}
      {menu.isNotiMenuVisible ||
      menu.isUserMenuVisible ||
      menu.isCatgMenuVisible ||
      menu.isSearchBarVisible ? (
        <div
          className=" fixed top-0 left-0 w-full h-screen z-10 bg-opacity-40"
          onClick={() => dispatch(menuActions.closeAllMenus())}
        ></div>
      ) : ""}
      {/* -------------------------------------------------------------------------------------------------------------- */}
      {menu.isSubVisible ? (
        <Backdrop
          toggleModal={() => dispatch(menuActions.toggleSubNav())}
        />
      ) : (
        ""
      )}
      <SubNav
        {...props}
        isSubVisible={menu.isSubVisible}
      />
    </>
  );
};

export default Navbar;
