/* eslint-disable react/prop-types */
import { BiSolidTruck } from "react-icons/bi";
import { BsFillCollectionFill, BsSearch } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useRef } from "react";
import { Transition } from 'react-transition-group';
import { Link } from "react-router-dom";

function SubNav(props) {
  const searchBar = useRef();

  const changeHandler = (e) => {
    props.setSearchText(e.target.value);
  };


  return (
    <>
      <Transition in={props.subIsVisible} 
        timeout={300}
        mountOnEnter
        unmountOnExit >
          {state => (
            <ul
              style={{
                transition: 'all 0.3s ease-in-out',
                transform: state === 'entering' || state === 'entered' ? 'translateX(0)' : 'translateX(-100%)'
              }}
              className='py-3 px-5 bg-gray-200 w-[270px] h-screen  absolute text-primary z-[51]'>
              <li className="relative  mb-5 flex">
              <input
                  onChange={changeHandler}
                  ref={searchBar}
                  type="text"
                  autoFocus
                  className="realtive px-5 py-3 w-full text-secondary bg-white border rounded-lg shadow-gray-300  outline-none shadow-md"
                  placeholder="Search..."
                />
                <BsSearch size={22} className="absolute right-3 top-3 hover:text-green-600 cursor-pointer" />
              </li>
              <li className="hover:text-green-600 cursor-pointer text-lg my-5 flex justify-start items-center gap-2"><MdAdd /> Add Service</li>
              <Link to={'/cart'} onClick={props.toggleSubNav} >
              <li className="hover:text-green-600 cursor-pointer text-lg my-5 flex justify-start items-center gap-2"><FaShoppingCart  /> Cart</li>
              </Link>
              <li className="hover:text-green-600 cursor-pointer text-lg my-5 flex justify-start items-center gap-2"> <BiSolidTruck size={22} /> Incoming Orders</li>
              <li className="hover:text-green-600 cursor-pointer text-lg my-5 flex justify-start items-center gap-2"><BsFillCollectionFill /> Categories</li>
            </ul>
          )}
      </Transition>
    </>
  )
}


export default SubNav
