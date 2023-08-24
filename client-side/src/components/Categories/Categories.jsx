/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import Category from "./Category";
import axios from "axios";



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
    <h1 className="text-semibold text-4xl text-text1 mb-12">
      Professional Services to Grow Your Business
    </h1>
    <div className="mt-5 gap-7 flex flex-col justify-around sm:flex-row flex-wrap">
      {categories.length > 0 && categories.map((category) => {
        return (
          <div key={category.id} className="w-100 sm:w-1/3 md:w-1/5 grow" >
            <Category category={category} />
          </div>
        );
      })}
    </div>
  </section>
  );
};

export default Categories;
