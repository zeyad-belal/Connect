/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import {RatingBadge} from "../Badges";
import LoadingItemCard from "../../UI/LoadingItemCard";
import { toast } from "react-toastify";


const ServicesItem = ({ item }) => {
  const navigate = useNavigate();

  function handleSellerNavigate(e){
    e.preventDefault()
    e.stopPropagation()
    if(!window.localStorage.getItem("logged")){
      toast.info('Sign in to view seller page !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    navigate(`/seller/${item.user_id.id}`)
    
  }

  function handleServiceNavigate(e){
    e.preventDefault()

    navigate(`/service/${item.id}`)
  }
  


  return (
    <>
      <div className="py-1 m-2 transition-shadow duration-300 min-h-[325px] cursor-pointer ">
        {item ? <div className="flex flex-col justify-between ">
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
                <h3 className="text-text1 lg:text-md text-xs md:text-sm my-2 text-left hover:text-secHover font-semibold self-start ">
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
        :
        <LoadingItemCard />
        }
      </div>
    </>
  );
};

export default ServicesItem;
