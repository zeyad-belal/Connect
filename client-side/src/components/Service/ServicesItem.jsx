/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import {RatingBadge} from "../Badges";


const ServicesItem = ({ item }) => {
  const navigate = useNavigate();

  function handleSellerNavigate(e){
    e.preventDefault()
    e.stopPropagation()
    navigate(`/seller/${item.user_id.id}`)
    
  }

  function handleServiceNavigate(e){
    e.preventDefault()

    navigate(`/services/${item.id}`)
  }
  


  return (
    <>
      <div className="py-1 m-2 transition-shadow duration-300 min-h-[325px] cursor-pointer ">
        <div className="flex flex-col justify-between ">
            <div className='relative' 
              onClick={(e)=> handleServiceNavigate(e)} id="service" >
              <img
                src={item.images[0].url}
                id="avatar"
                alt="Image Not Found"
                className="w-full " />
                {/* ---------seller avatar---------*/}
              <div 
                className="hover:border-2  absolute bottom-2 left-2 w-[30px] h-[30px] bg-white  shadow-md rounded-full overflow-hidden"
                onClick={(e)=> handleSellerNavigate(e)} >
                  <img
                    className="w-full h-full object-cover"
                    src={item.user_id.avatar}
                    alt="Seller Avatar"
                  />
              </div>
            </div>
          
            <div className=" mt-1 flex flex-col justify-start">
                <h3 className="text-text1 my-2 text-left hover:text-secHover font-semibold self-start text-[15px]">
                  {item.name}
                </h3>
              <div className="flex flex-col ">
                <RatingBadge avg_rating={item.avg_rating ? item.avg_rating : 0} />
                <div className="flex  my-1 text-gray-700 text-md">
                      starts from <span className="font-bold ml-1"> ${item.price}</span>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ServicesItem;
