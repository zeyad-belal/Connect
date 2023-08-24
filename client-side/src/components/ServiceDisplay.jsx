/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ServicesItem from "./Service/ServicesItem";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function CategoryDisplay(props) {
  const [filteredServices, setFilteredServices] = useState('')

  
  useEffect(()=>{
    async function getfilteredServices(){
      try{
        const repsonse = await  axios.get(`${import.meta.env.VITE_API_URL}/services/filtered/${props.category.id}`)
        setFilteredServices(repsonse.data)
      }catch(error){
        toast.error(error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    }
    getfilteredServices()
  },[props.category.id])


  return (
    <div className="px-10 py-3  text-center flex flex-col justify-center ">
      <h1 className="text-semibold text-2xl ml-1 text-text1 mt-8 mb-3 self-start">
        {props.category.category_name}
      </h1>
      <div className="gap-4 flex flex-col justify-around sm:flex-row flex-wrap">
        {filteredServices.length > 0 && filteredServices.map((item) => {
          return (
            <div key={item.id} className="w-100 sm:w-1/3 md:w-1/5 grow">
              <ServicesItem item={item} />
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default CategoryDisplay;
