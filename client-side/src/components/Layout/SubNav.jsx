/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BiSolidTruck } from "react-icons/bi";
import { BsFillCollectionFill, BsSearch } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdAdd, MdDragIndicator } from "react-icons/md";
import { useRef, useState } from "react";
import { Transition } from "react-transition-group";
import { Link, useNavigate } from "react-router-dom";
import { PiShoppingBagFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "../../store/menuSlice";

function SubNav(props) {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu);
  const searchBar = useRef();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");



  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }


  const changeHandler = debounce((e) => {
    setSearchText(e.target.value)
  }, 900);
  

  const navToResults = () => {
    dispatch(menuActions.closeAllMenus())
    setSearchText("");
    navigate(`/services?keyword=${searchText}`);
    searchBar.current.value = "";
  };

  function navToChoosenCatg(catg){
    dispatch(menuActions.closeAllMenus())
    navigate(`/services?category=${catg}`)
  }

  return (
    <>
      <Transition
        in={menu.isSubVisible}
        timeout={300}
        mountOnEnter
        unmountOnExit >
        {(state) => (
          <ul
            style={{
              transition: "all 0.3s ease-in-out",
              transform: state === "entering" || state === "entered" ? "translateX(0)": "translateX(-100%)",
            }}
            className="py-3  bg-white w-[200px] md:w-[240px] h-screen  absolute text-text1 z-[51] shadow-md">
              {/* ---------searchbar------  */}
            <li className="relative  mb-5 flex">
              <input
                onChange={changeHandler}
                ref={searchBar}
                type="text"
                className="realtive mx-3 px-5 py-3 w-full text-text1 bg-primary border-2 border-transparent focus:border-text1 rounded-lg shadow-primary  outline-none "
                placeholder="Search..." />
              <BsSearch
                size={22}
                className="absolute right-5 top-3  cursor-pointer"
                onClick={navToResults}
                />
            </li>

            <Link to={"/addService"}
              onClick={() => dispatch(menuActions.closeAllMenus())} >
              <li className="hover:bg-primary cursor-pointer text-md md:text-lg py-3 pl-4 flex justify-start items-center gap-2">
                <MdAdd /> Add Service
              </li>
            </Link>

            <Link to={"/cart"}
              onClick={() => dispatch(menuActions.closeAllMenus())} >
              <li className="hover:bg-primary cursor-pointer text-md md:text-lg py-3 pl-4 flex justify-start items-center gap-2">
                <FaShoppingCart /> Cart
              </li>
            </Link>

            <Link to={"/incomingOrders"}
              onClick={() => dispatch(menuActions.closeAllMenus())} >
              <li
                className="hover:bg-primary cursor-pointer text-md md:text-lg py-3 pl-4 flex justify-start items-center gap-2"
                onClick={() => navigate("/orders")} >
                {" "}
                <BiSolidTruck size={22} /> Incoming Orders
              </li>
            </Link>

            {/* ----------catgories-------- */}
            <li 
            className="hover:bg-primary cursor-pointer text-md md:text-lg py-3 pl-4 flex justify-start items-center gap-2"
            onClick={()=>dispatch(menuActions.toggleSubCategories())} >
              <BsFillCollectionFill /> Categories
            </li>

            <Transition
              in={menu.isCatgSubMenuVisible}
              timeout={300}
              mountOnEnter
              unmountOnExit >
                {(state) => (
              <ul 
              className="cursor-pointer mx-5  text-xs md:text-sm py-2 text-start flex flex-col justify-start  gap-1"
              style={{
                transition: "all 0.3s ease-in-out",
                transform:
                  state === "entering" || state === "entered"
                    ? "translateX(0)"
                    : "translateX(-100%) ",
                    opacity:
                  state === "entering" || state === "entered"
                    ? "opacity-1"
                    : "opacity-0 ",
              }} >
                <li onClick={() =>navToChoosenCatg(`Code`)} className="font-[400] pb-2 hover:bg-primary flex items-center gap-2"> <MdDragIndicator /> <span> Code </span> </li>
                <li onClick={() =>navToChoosenCatg(`Design`)} className="font-[400] pb-2 hover:bg-primary flex items-center gap-2"> <MdDragIndicator /> <span> Design </span> </li>
                <li onClick={() =>navToChoosenCatg(`Digital Marketing`)} className="font-[400] pb-2 hover:bg-primary flex items-center gap-2"> <MdDragIndicator /> <span> Digital Marketing </span> </li>
                <li onClick={() =>navToChoosenCatg(`Business`)} className="font-[400] pb-2 hover:bg-primary flex items-center gap-2"> <MdDragIndicator /> <span> Business </span> </li>
                <li onClick={() =>navToChoosenCatg(`Online Learning`)} className="font-[400] pb-2 hover:bg-primary flex items-center gap-2"> <MdDragIndicator /> <span> Online Learning </span> </li>
                <li onClick={() =>navToChoosenCatg(`translation`)} className="font-[400] pb-2 hover:bg-primary flex items-center gap-2"> <MdDragIndicator /> <span> translation </span> </li>
                <li onClick={() =>navToChoosenCatg(`Sounds`)} className="font-[400] pb-2 hover:bg-primary flex items-center gap-2"> <MdDragIndicator /> <span> Sounds </span> </li>
                <li onClick={() =>navToChoosenCatg(`Video Editing`)} className="font-[400] pb-2 hover:bg-primary flex items-center gap-2"> <MdDragIndicator /> <span> Video Editing </span> </li>
              </ul> )}
              </Transition>

            <Link to={"/purchases"}
              onClick={() => dispatch(menuActions.closeAllMenus())} > 
              <li
                className="hover:bg-primary cursor-pointer text-md md:text-lg py-3 pl-4 flex justify-start items-center gap-2">
                <PiShoppingBagFill size={22} /> Purchases
              </li>
            </Link>
          </ul>
        )}
      </Transition>
    </>
  );
}

export default SubNav;
