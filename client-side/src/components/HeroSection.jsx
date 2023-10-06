/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  const searchBar = useRef();
  const [searchText, setSearchText] = useState("");


  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }


  const changeHandler = debounce((e) => {
    setSearchText(e.target.value.toLowerCase())
  }, 900);
  

  const navToResults = () => {
    navigate(`/services?keyword=${searchText}`);
    setSearchText("");
    searchBar.current.value = "";
  };

  return (
    <div
      className=" bg-cover bg-center min-h-screen min-w-full   flex flex-col justify-center items-center  "
      style={{
        backgroundImage: `url(./main.png)`,
        
      }} >
      <div className="z-10 flex flex-col items-center text-center ">
        <div className="mx-6">
            <h1 className="text-bold text-white text-3xl  lg:text-[40px] md:text-4xl mb-5">Where Talent Meets Opportunity </h1>
            <p className="text-semibold text-white text-sm  md:text-lg  mb-12 md:max-w-[600px] max-w-[400px]  mx-auto  ">Join a Community of Talented Freelancers and Connect with Clients Worldwide.</p>
        </div>
        <div className="relative mx-5 ">
          <input 
            name="text"
            type="text"
            ref={searchBar}  
            onChange={changeHandler}
            className="rounded-md w-[340px] sm:w-[450px] md:w-[600px] lg:w-[700px] py-6  pl-18 mb-0  pl-2 pr-12 focus:outline-none focus:ring-2 focus:ring-secHover"
            placeholder="Try : logo desgin or web .."
            />
          <button
          className="absolute right-2 primaryBtn rounded-md   top-1/2 transform -translate-y-1/2 h-53"
          onClick={navToResults}
          > search</button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
