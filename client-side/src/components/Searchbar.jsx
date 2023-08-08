/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useGlobalContext } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";

const Searchbar = (props) => {
  const { products } = useGlobalContext();
  const navigate = useNavigate();
  const searchBar = useRef();


  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(props.searchText.toLowerCase());
  });

  const changeHandler = (e) => {
    props.setSearchText(e.target.value);
  };

  const navToProduct = (ID)=>{
    navigate(`/products/${ID}`);
    props.setSearchText('')
    searchBar.current.value =''
  }


  return (
    <div className="relative z-50 ">
      <div className="flex items-center justify-center gap-2  lg:w-[600px] md:w-[400px]">
        <input
          onChange={changeHandler}
          ref={searchBar}
          type="text"
          className="px-5 py-1  w-full text-orange-500 bg-white border rounded-lg focus:border-orange-400 focus:ring-orange-400 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
        />
      </div>
      {/* Filtered Products Panel */}
      {props.searchText.length > 0 && (
        <div className="max-h-44 overflow-y-auto z-50 absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {filteredProducts.length > 0 ? filteredProducts.map((product) => (
            <div key={product.id} className="px-4 py-2 hover:bg-gray-100">
              <div onClick={()=> navToProduct(product.id)} className="text-black text-[10px] sm:text-xs cursor-pointer">
              {product.name.slice(0,90)}{product.name.length > 90 ? '...': ''}
              </div>
            </div>
          ))
          : 
          <div className="flex items-center justify-center h-full">
          <div className="text-black text-md py-2">No matches</div>
          </div>
          }
        </div>
      )}
    </div>
  );
};

export default Searchbar;
