/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ServicesItem from "./Service/ServicesItem";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function CategoryDisplay(props) {

  const filteredServicesData = [
    {
      id: 1,
      name : 'coding cryto graphy etherum play',
      category_id:{category_name : "programming"},
      images: [
        {
          url: "https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
        },
      ],
      price : 99,
      avg_rating : 4
    },
    {
      id: 2,
      name : 'mern app full stack e-commerce now',
            category_id:{category_name : "programming"},
      images: [
        {
          url: "https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
        },
      ],
      price : 40,
      avg_rating : 2
    },
    {
      id: 3,
      name : 'logo design for your bussines order logo brand identity',
            category_id:{category_name : "programming"},
      images: [
        {
          url: "https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
        },
      ],
      price : 99,
      avg_rating : 5
    },
    {
      id: 4,
      name : 'python back end datbase relations structure design and support frintened',
            category_id:{category_name : "programming"},
      images: [
        {
          url: "https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
        },
      ],
      price : 99,
      avg_rating : 1
    },
  ];

  const [filteredServices, setFilteredServices] = useState('')

  
  useEffect(()=>{
    async function getfilteredServices(){
      try{
        const repsonse = await  axios.get(`${import.meta.env.VITE_API_URL}/services/filtered/${props.category.id}`)
        console.log(repsonse)
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
