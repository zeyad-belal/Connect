/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowIcon, CloseIcon, FilterIcon, HomeIcon, RightArrowIcon } from "./Icons";


const Filter = () => {
  // Filter Functionalities ///////////////////////////////////
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenOrderBy, setIsOpenOrderBy] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);

  const [selectedOrderBy, setSelectedOrderBy] = useState(
    searchParams.get("orderBy") ? searchParams.get("orderBy") : "bestSeller"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ? searchParams.get("category") : "All"
  );
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("min") ? searchParams.get("min") : "",
    max: searchParams.get("max") ? searchParams.get("max") : ""
  });

  // Data /////////////////////////////////////////////////////
  const [categories, setCategories] = useState(null);



  useEffect(() => {
    async function getAllCategories() {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories`
      );

      setCategories(data);
    }
    getAllCategories();
  }, []);

  // Togglers ////////////////////////////////////////////////////////
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleOrderBySection = () => {
    setIsOpenOrderBy(!isOpenOrderBy);
  };

  const toggleCategorySection = () => {
    setIsOpenCategory(!isOpenCategory);
  };


  const togglePriceSection = () => {
    setIsOpenPrice(!isOpenPrice);
  };

  // Handlers ////////////////////////////////////////////////////
  const handleBackdropClick = () => {
    setIsMenuOpen(false);
  };

  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    setPriceRange({ ...priceRange, [type]: value });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleOrderByChange = (order) => {
    setSelectedOrderBy(order);
  };

  const applyFilters = () => {
    const data = {};

    if (selectedCategory) {
      data.category = selectedCategory;
    }
    if (selectedOrderBy) {
      data.orderBy = selectedOrderBy;
    }
    for (let key in priceRange) {
      if (priceRange[key] !== "") {
        data[key] = priceRange[key];
      }
    }

    setSearchParams(data);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="z-30 md:hidden fixed min-w-0 max-w-full block top-[90%] left-3 ">
        <button
          className=" rounded-full bg-secondary p-3 focus:outline-none"
          onClick={toggleMenu}
        >
          <FilterIcon />
        </button>
      </div>

      <div className="md:px-2 pt-7 h-fit ">
        {/* route  */}
        <div className="flex mb-5 items-center text-gray-500">
        <Link to={'/'}  >
          <p className="ml-2 text-gray-500 text-sm cursor-pointer flex"> <HomeIcon />  </p>
        </Link>
        <RightArrowIcon className="text-gray-500" />
          <h1 className="text-xl ">Services</h1>
        </div>

      <div className={
            !isMenuOpen
              ? "min-w-0 max-w-full hidden md:block md:w-72 p-4 sticky top-12"
              : "fixed z-[900] left-0 top-0 h-screen w-64 p-4 bg-white shadow-lg" } >
        {/* Add Close Button to Menu */}
        {isMenuOpen && (
          <div className="flex justify-end pb-3">
            <span className="cursor-pointer" onClick={toggleMenu}>
              <CloseIcon />
            </span>
          </div>
        )}
        {/* ------------------------------------- Order By ------------------------------- */}
        <button
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left bg-gray-200 focus:outline-none focus:bg-gray-300 rounded-md"
          onClick={toggleOrderBySection}
        >
          Order By
          <ArrowIcon isOpen={isOpenOrderBy} />
        </button>
        {isOpenOrderBy && (
          <div className="mt-4">
            <div className="space-x-2">
              <input
                type="radio"
                checked={selectedOrderBy === "rating"}
                onChange={() => handleOrderByChange("rating")}
                name="rating"
              />
              <label htmlFor="rating">Rating</label>
            </div>
          </div>
        )}
        {/* ------------------------------------- Categories ------------------------------- */}
        <button
          className="flex items-center justify-between w-full mt-4 px-4 py-2 text-sm font-medium text-left bg-gray-200 focus:outline-none focus:bg-gray-300 rounded-md"
          onClick={toggleCategorySection}
        >
          Category
          <ArrowIcon isOpen={isOpenCategory} />
        </button>
        {isOpenCategory && (
          <div className="mt-4">
            <div className="space-x-2">
              <input
                type="radio"
                checked={selectedCategory === "All"}
                onChange={() => handleCategoryChange("All")}
                name="all-categories"
              />
              <label htmlFor="all-categories">All</label>
            </div>
            {categories &&
              categories.map((category) => (
                <div key={category._id} className="space-x-2">
                  <input
                    type="radio"
                    checked={selectedCategory === category.category_name}
                    onChange={() =>
                      handleCategoryChange(category.category_name)
                    }
                    name={category.category_name}
                  />
                  <label htmlFor={category.category_name}>
                    {category.category_name}
                  </label>
                </div>
              ))}
          </div>
        )}
        <button
          className="flex items-center justify-between w-full px-4 py-2 mt-4 text-sm font-medium text-left bg-gray-200 focus:outline-none focus:bg-gray-300 rounded-md"
          onClick={togglePriceSection}
        >
          Price Range
          <ArrowIcon isOpen={isOpenPrice} />
        </button>
        {isOpenPrice && (
          <div className="mt-4">
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                min={0}
                value={priceRange.min}
                onChange={(e) => handlePriceChange(e, "min")}
                className="w-1/2 px-2 py-1 text-sm border rounded-md"
              />
              <input
                type="number"
                placeholder="Max"
                min={0}
                value={priceRange.max}
                onChange={(e) => handlePriceChange(e, "max")}
                className="w-1/2 px-2 py-1 text-sm border rounded-md"
              />
            </div>
          </div>
        )}
        <button
          className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-secondary rounded-md hover:bg-secHover"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
    {isMenuOpen && (
      <div
        className="fixed z-[900] inset-y-0 right-0 w-[calc(100%-16rem)] bg-gray-900 opacity-50"
        onClick={handleBackdropClick}
      />
    )}
  </>
  );
};



export default Filter;
