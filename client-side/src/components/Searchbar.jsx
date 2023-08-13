/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useGlobalContext } from "../context/ServicesContext";
import { useNavigate } from "react-router-dom";
import { Transition } from "react-transition-group";

const Searchbar = (props) => {
  const { services } = useGlobalContext();
  const navigate = useNavigate();
  const searchBar = useRef();

  const filteredServices = services.filter((service) => {
    return service.name.toLowerCase().includes(props.searchText.toLowerCase());
  });

  const changeHandler = (e) => {
    props.setSearchText(e.target.value);
  };

  const navToService = (ID) => {
    navigate(`/services/${ID}`);
    props.setSearchText("");
    searchBar.current.value = "";
  };

  let searchBarClasses = props.searchBarIsVisible ? 
  "absolute z-40 top-[59px] left-0 w-full opacity-100 translate-y-0 transition-opacity ease-out " 
  :
  "absolute z-40 top-[59px] left-0 w-0 opacity-0 -translate-y-[-100px] -translate-x-[300px]   ease-out duration-300"



  return (
    <Transition in={props.searchBarIsVisible} 
    timeout={300}
    mountOnEnter
    unmountOnExit >
      {state => (
        <div className='absolute z-20 top-[59px] left-0 w-full'
          style={{
            transition: 'all 0.3s ease-in-out',
            transform: state === 'entering' || state === 'entered' ? 'translateY(0)' : 'translateY(-100%)'
          }}
        >
          <div className="flex items-center justify-center ">
            <input
              onChange={changeHandler}
              ref={searchBar}
              type="text"
              autoFocus
              className="realtive px-5 py-5 w-full text-secondary bg-white border rounded-lg shadow-gray-300  outline-none shadow-md"
              placeholder="Search..."
            />
          </div>
          
          {/* Filtered services Panel */}
          {props.searchText.length > 0 && (
            <div className="max-h-44 overflow-y-auto z-50 absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <div key={service.id} className="px-4 py-2 hover:bg-gray-100">
                    <div
                      onClick={() => navToService(service.id)}
                      className="text-black text-[10px] sm:text-xs cursor-pointer"
                    >
                      {service.name.slice(0, 90)}
                      {service.name.length > 90 ? "..." : ""}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-black text-md py-2">No matches</div>
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
