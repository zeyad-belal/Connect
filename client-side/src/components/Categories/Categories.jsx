/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import Category from "./Category";
import axios from "axios";
import './categories.css'
import LoadingCategory from "../../UI/LoadingCategory";


const Categories = () => {
  const [categories, setCategories] = useState('');


    useEffect(()=>{
      async function getCategories(){
        const repsonse = await  axios.get( `${import.meta.env.VITE_API_URL}/categories`)
        setCategories(repsonse.data)
      }
      getCategories()
    },[])


  return (
  <section className="px-10 py-12 min-h-[100vh] bg-primary text-center flex flex-col justify-center ">
    <h1 className="text-semibold text-3xl text-text1 mb-12  relative">
      Professional Services to Grow Your Business
      <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-26px] sm:w-[220px] h-[2px] bg-black"></span>
      <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-32px] w-[13px] h-[13px] bg-white border-2 border-black rounded-full"></span>
    </h1>
    <div className="mt-5 gap-7 flex flex-col justify-around sm:flex-row flex-wrap">
      {categories.length > 0 && categories.map((category) => {
        return (
          <div key={category.id} className="animate-up hover:shadow-md  w-100 sm:w-1/3 md:w-1/5 grow" >
            <Category category={category} />
          </div>
        );
      })}
      {!categories && 
      <>
      <LoadingCategory />
      <LoadingCategory />
      <LoadingCategory />
      <LoadingCategory />
      <LoadingCategory />
      <LoadingCategory />
      <LoadingCategory />
      <LoadingCategory />
      </>
    }
    </div>
  </section>
  );
};

export default Categories;
