/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Transition } from "react-transition-group";
import {useDispatch, useSelector} from "react-redux"
import { menuActions } from "../store/menuSlice";

const Searchbar = (props) => {
  const [searchText, setSearchText] = useState("");
  const services = useSelector((state)=> state.services.services);
  const navigate = useNavigate();
  const searchBar = useRef();
  const dispatch = useDispatch()
  const filteredServices = services.filter((service) => {
    return service.name.toLowerCase().includes(searchText.toLowerCase());
  });

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
  

  const navToService = (ID) => {
    dispatch(menuActions.closeAllMenus())
    navigate(`/services/${ID}`);
    setSearchText("");
    searchBar.current.value = "";
  };

  return (
    <Transition
      in={props.isSearchBarVisible}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div
          className="absolute z-20 top-[63px] left-0 w-full"
          style={{
            transition: "all 0.3s ease-in-out",
            transform:
              state === "entering" || state === "entered"
                ? "translateY(0)"
                : "translateY(-100%)",
          }}
        >
          <div className="flex items-center justify-center ">
            <input
              onChange={changeHandler}
              ref={searchBar}
              type="text"
              autoFocus
              className="realtive px-5 py-5 w-full text-text1 bg-white border-2 border-primary   outline-none  "
              placeholder="Search..."
            />
          </div>

          {/* Filtered services Panel */}
          {searchText.length > 0 && (
            <div className="max-h-44 overflow-y-auto z-50 absolute mt-2 w-full bg-white rounded-lg shadow-lg">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <div key={service.id} className="px-4 py-2 hover:bg-gray-100">
                    <div
                      onClick={() => navToService(service.id)}
                      className="text-text1 text-[10px] sm:text-xs cursor-pointer" >
                      {service.name.slice(0, 90)}
                      {service.name.length > 90 ? "..." : ""}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-text1 text-md py-2">No matches</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Transition>
  );
};

export default Searchbar;
