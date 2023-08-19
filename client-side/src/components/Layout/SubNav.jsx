/* eslint-disable react/prop-types */
import { BiSolidTruck } from "react-icons/bi";
import { BsFillCollectionFill, BsSearch } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useRef } from "react";
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

  const changeHandler = (e) => {
    props.setSearchText(e.target.value);
  };

  return (
    <>
      <Transition
        in={menu.isSubVisible}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <ul
            style={{
              transition: "all 0.3s ease-in-out",
              transform:
                state === "entering" || state === "entered"
                  ? "translateX(0)"
                  : "translateX(-100%)",
            }}
            className="py-3  bg-white w-[240px] h-screen  absolute text-text1 z-[51] shadow-lg shadow-primary"
          >
            <li className="relative  mb-5 flex">
              <input
                onChange={changeHandler}
                ref={searchBar}
                type="text"
                className="realtive mx-3 px-5 py-3 w-full text-text1 bg-primary border-2 border-transparent focus:border-text1 rounded-lg shadow-primary  outline-none "
                placeholder="Search..."
              />
              <BsSearch
                size={22}
                className="absolute right-5 top-3  cursor-pointer"
              />
            </li>
            <li className="hover:bg-primary cursor-pointer text-lg py-3 pl-4 flex justify-start items-center gap-2">
              <MdAdd /> Add Service
            </li>
            <Link
              to={"/cart"}
              onClick={() => dispatch(menuActions.closeAllMenus())}
            >
              <li className="hover:bg-primary cursor-pointer text-lg py-3 pl-4 flex justify-start items-center gap-2">
                <FaShoppingCart /> Cart
              </li>
            </Link>
            <li
              className="hover:bg-primary cursor-pointer text-lg py-3 pl-4 flex justify-start items-center gap-2"
              onClick={() => navigate("/orders")}
            >
              {" "}
              <BiSolidTruck size={22} /> Incoming Orders
            </li>
            <li className="hover:bg-primary cursor-pointer text-lg py-3 pl-4 flex justify-start items-center gap-2">
              <BsFillCollectionFill /> Categories
            </li>
            <li
              className="hover:bg-primary cursor-pointer text-lg py-3 pl-4 flex justify-start items-center gap-2"
              onClick={() => navigate("/purchases")}
            >
              <PiShoppingBagFill size={22} /> Purchases
            </li>
          </ul>
        )}
      </Transition>
    </>
  );
}

export default SubNav;
