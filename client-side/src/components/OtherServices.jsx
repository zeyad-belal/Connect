import { useState } from "react";
import { FaTruckPickup } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { Link } from "react-router-dom";

export default function OtherServices() {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };
  // declare their routes in App
  return (
    <div className="flex max-w-[900px] m-auto px-12 my-12 justify-around flex-wrap">
      <Link to="/Techservices">
        <div
          className={`flex items-center font-bold bg-black hover:bg-orange-500 text-white ${
            isHovered1 ? "bg-orange-500 text-white" : ""
          } w-[270px] cursor-pointer rounded-md px-4 justify-center mx-5 my-1 transition duration-300 py-3`}
          onMouseEnter={handleMouseEnter1}
          onMouseLeave={handleMouseLeave1}
        >
          {isHovered1 ? "Learn more" : "Technical Service"}
          <MdOutlineMiscellaneousServices
            className="ml-3"
            size={32}
            color="white"
          />
        </div>
      </Link>

      <Link to="/Freeshipping">
        <div
          className={`flex items-center font-bold bg-black hover:bg-orange-500 text-white ${
            isHovered2 ? "bg-orange-500 text-white" : ""
          } w-[270px] cursor-pointer rounded-md px-4 justify-center mx-5 my-1 transition duration-300 py-3`}
          onMouseEnter={handleMouseEnter2}
          onMouseLeave={handleMouseLeave2}
        >
          {isHovered2 ? "Learn more" : "Free Shipping"}
          <FaTruckPickup className="ml-3" size={32} color="white" />
        </div>
      </Link>
    </div>
  );
}
