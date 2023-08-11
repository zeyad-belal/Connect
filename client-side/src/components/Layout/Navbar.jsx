/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Login from "../Login";
import Signup from "../Signup";
import Searchbar from "../Searchbar.jsx";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { BsFillBellFill, BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

const Navbar = (props) => {
  const navigate = useNavigate();
  const userCTX = useContext(UserContext);
  const cartCTX = useContext(CartContext);
  const userStatus = window.localStorage.getItem("logged");
  const [cookies, setCookie, removeCookie] = useCookies(["UserToken", "User"]);
  const [CurrUser, setCurrUser] = useState("");



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

function closeTheSearchBar(e){
  if(!e.target.classList.contains("search")){
    props.closeSearchBar()
  }
}

  return (
    <>
      <nav
        id="MainNav"
        className="relative bg-primary text-white  my-30 h-15 w-full z-50 sm:px-7 px-4 flex justify-between "
        onClick={(e)=>closeTheSearchBar(e)}
      >
        <ul className="flex ">
        <li className=" mr-3 cursor-pointer text-lg flex items-center py-2 px-6 text-white hover:bg-gray-500">
        <FiMenu size={30} />
        </li>
        {/* Logo */}
        <Link to={"/"}>
          <li className="flex items-baseline py-3 mr-5 w-44 sm:w-56">
            <img
              className="mt-2 sm:mt-1"
              src="/assets/logo/main-yellow-and-white.png"
              alt="Electronix"
              />
          </li>
        </Link>
        <li className="text-lg flex items-center py-2 px-6 text-white hover:bg-gray-500  cursor-pointer">Add service </li>
        <li className="text-lg flex items-center py-2 px-6 text-white hover:bg-gray-500  cursor-pointer">Categories</li>
        <li className="text-lg flex items-center py-2 px-6 text-white hover:bg-gray-500  cursor-pointer">Orders</li>
        </ul>

        {/* sign in  */}
        {userCTX.modalIsShown && userCTX.loginModalStatus && <Login />}
        {userCTX.modalIsShown && userCTX.signUpModalStatus && <Signup />}

        {/* Navigation */}
        <ul className="flex ">
          {/* Searchbar  */}
          <li className={props.searchBarIsVisible ?
            "search flex items-center py-2 px-6 text-white bg-gray-500 relative hover:bg-gray-500 cursor-pointer" :
            "search flex items-center py-2 px-6 text-white relative hover:bg-gray-500 cursor-pointer"} onClick={props.toggleSearchBar}>
            <BsSearch size={22} />
          </li>
            {props.searchBarIsVisible && <Searchbar {...props} />}
          {/* notifcations  */}
          <li className="flex items-center py-2 px-6 text-white hover:bg-gray-500  cursor-pointer">
            <BsFillBellFill size={22} />
          </li>
          {/* cart  */}
            <Link
              className="text-white flex items-center relative hover:bg-gray-500 "
              to="/cart" >
                <li className="flex items-center py-2 px-6  ">
                <FaShoppingCart size={22} />
                {cartCTX.totalItemsNum > 0 && (
                  <span className="ml-1 bg-f37020 text-white rounded-full px-[7px] py-[1px] text-[14px] absolute right-[-20px] top-[-17px]">
                    {cartCTX.totalItemsNum}
                  </span>
                )}
                </li>
            </Link>
          {/* user  */}
          <li className="flex items-center py-2 px-6 text-white hover:bg-gray-500  text-sm:10 ">
            {userStatus ? (
              <div className="relative  border-black">
                <img
                  className="max-w-[40px] rounded-full cursor-pointer border-inner border-black"
                  src={CurrUser.avatar}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  alt="User Avatar"
                />

                {isDropdownVisible && (
                  <div
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                    className="absolute right-9 top-4  py-1 w-[100px] bg-white rounded-tl-full rounded-bl-full rounded-br-full shadow-lg"
                  >
                    <button
                      onClick={signoutHandler}
                      className="block w-full text-sm px-4 py-1 font-semibold text-gray-800 rounded-full hover:text-f37020"
                    >
                      Sign Out{" "}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="hover:text-gray-400 whitespace-nowrap text-[15px] ml-1"
                onClick={() => userCTX.toggleModal()}
              >
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
