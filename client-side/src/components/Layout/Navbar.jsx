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




const categoriesData = [
  {
    category_name: "Design",
      image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    id: 1,
  },
  {
    category_name: "Code",
      image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    id: 2,
  },
  {
    category_name: "Translition",
      image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    id: 3,
  },
  {
    category_name: "Ai",
      image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    id: 4,
  },
  {
    category_name: "automation",
    id: 5,
  },
  {
    category_name: "Graphic",
      image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    id: 6,
  },
  {
    category_name: "Marketing",
      image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    id: 7,
  },
  {
    category_name: "consult",
      image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    id: 8,
  }
];



const Navbar = (props) => {
  const cart = useSelector((state)=> state.cart);
  const menu = useSelector((state)=> state.menu);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const userStatus = window.localStorage.getItem("logged");
  const [cookies, setCookie, removeCookie] = useCookies(["UserToken", "User"]);
  const [CurrUser, setCurrUser] = useState("");
  const [categories, setCategories] = useState(categoriesData);



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




  // useEffect(()=>{
  //   const data = axios.get(`${import.meta.env.VITE_API_URL}/categories`)
  //   setCategories(data)
  // },[])



  return (
    <>
      <nav
        id="MainNav"
        className=" relative border-b border-gray-300  top-0  bg-white my-30 h-15 w-full z-50 md:px-5 px-1 py-1 flex justify-between "
      >
        <ul className="flex ">
          {/* subnav icon  */}
          <li
            className={
              menu.isSubVisible
                ? " cursor-pointer text-lg flex lg:hidden items-center rounded-lg  px-2 my-2 mx-1  text-text1 bg-primary"
                : " cursor-pointer  lg:hidden text-lg flex items-center rounded-lg  px-2 my-2 mx-1  text-text1 hover:bg-primary"
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
          <li className="text-md items-center shrink-0  rounded-lg lg:flex hidden  px-3 my-3  text-text1 hover:bg-primary  cursor-pointer gap-2"
          onClick={()=>navigate('/addService')} >
            <MdAdd /> Add service
          </li>
          {/* Catgories */}
          <li
            className={menu.isCatgMenuVisible
                ? "relative hidden lg:flex items-center rounded-full  px-3 my-3 mx-2 text-text1 bg-primary cursor-pointer gap-2"
                : "relative hidden lg:flex items-center rounded-full  px-3 my-3 mx-2 text-text1 hover:bg-primary cursor-pointer gap-2"}
            onClick={() => dispatch(menuActions.toggleCategories())} >
            <BsFillCollectionFill /> Categories
            {menu.isCatgMenuVisible && 
            <div className="bottom-[-540%] right-[-250%] z-40 absolute mt-2 w-[500%] text-center  bg-white rounded-lg shadow-lg">
              <ul className="flex flex-wrap">
                {categories.map(category =>{
                  return <li
                  onClick={()=>navigate(`/services/category=${category.category_name}`)}
                  className="cursor-pointer  hover:bg-primary px-6 py-7 w-[25%]"
                  key={category.id}>{category.category_name}</li>
                })}
              </ul>
            </div>}
          </li>
          <li className="text-md items-center rounded-lg lg:flex hidden  px-3 my-3 mx-2 text-text1 hover:bg-primary  cursor-pointer gap-2"
          onClick={()=>navigate('/orders')}>
            <BiSolidTruck size={22} /> Orders
          </li>
          {/* Purchases */}
          <li className="text-md items-center rounded-lg lg:flex hidden  px-3 my-3 mx-2 text-text1 hover:bg-primary  cursor-pointer gap-2"
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
                ? "search flex items-center rounded-full  px-3 my-3 mx-2 text-text1 bg-primary cursor-pointer"
                : "search flex items-center rounded-full  px-3 my-3 mx-2 text-text1  hover:bg-primary cursor-pointer"
            }
            onClick={() => dispatch(menuActions.toggleSearchBar())}
          >
            <BsSearch size={20} />
          </li>
          {/* notifcations  */}
          <li
            className={
              menu.isNotiMenuVisible
                ? "flex items-center rounded-full  px-3 my-3 mx-2 text-text1 bg-primary cursor-pointer"
                : "flex items-center rounded-full  px-3 my-3 mx-2 text-text1 hover:bg-primary cursor-pointer"
            }
            onClick={() => dispatch(menuActions.toggleNotiMenu())}
          >
            <BsFillBellFill size={20} />
            {/* -------noti menu------- */}
            {menu.isNotiMenuVisible && (
              <>
                <div className="relative z-30  ">
                  <ul className="flex flex-col overflow-hidden absolute bg-white rounded-br-lg rounded-bl-lg right-[-21px]   top-[30px] min-w-[150px]   shadow-md  border-gray-300">
                    <li className="flex gap-2  border-primary items-center z-10 py-2 px-2  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer">
                      handle noti here
                    </li>
                    <li className="flex gap-2 border-t-2 border-primary items-center z-10 py-2 px-2  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer">
                      handle noti here
                    </li>
                    <li className="flex gap-2 border-t-2  border-primary items-center z-10 py-2 px-2  text-sm font-semibold text-text1 hover:bg-primary cursor-pointer">
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
              onClick={() => dispatch(menuActions.closeAllMenus())}
            >
              <FaShoppingCart size={20} />
              {cart.totalAmount > 0 && (
                <span className="ml-1 bg-text1 text-white rounded-full px-[7px] py-[1px] text-[14px] absolute right-[-20px] top-[-17px]">
                  {cart.totalAmount}
                </span>
              )}
            </li>
          </Link>
          {/* user  */}
          <li className="flex items-center py-2 sm:px-6 px-0  text-text1  text-sm:10 ">
            {userStatus ? (
              <div
                className="relative max-w-[100px] cursor-pointer  border-text1 border-2 rounded-full"
                onClick={() => dispatch(menuActions.toggleUserMenu())}
              >
                <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={CurrUser.avatar}
                    alt="User Avatar"
                  />
                </div>
                {/* --------menu------ */}
                {menu.isUserMenuVisible && (
                  <>
                    <div className="relative z-30">
                      <ul className="flex flex-col gap-3  absolute right-[-10px]   bottom-[-95px] min-w-[150px] bg-white  shadow-md ">
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
