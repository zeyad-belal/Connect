/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useGlobalContext } from "../context/ServicesContext";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="absolute z-50 top-[50px] right-0">
      <div className="flex items-center justify-center gap-2  lg:w-[800px] md:w-[400px]">
        <input
          onChange={changeHandler}
          ref={searchBar}
          type="text"
          className="px-5 py-1  w-full text-orange-500 bg-white border rounded-lg focus:border-orange-400 focus:ring-orange-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
  );
};

export default Searchbar;
