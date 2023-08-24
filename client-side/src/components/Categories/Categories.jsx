/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import Category from "./Category";
import axios from "axios";

const categoriesData = [
  {
    category_name: "Design",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 1,
  },
  {
    category_name: "Design",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 2,
  },
  {
    category_name: "Design",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 3,
  },
  {
    category_name: "Design",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 4,
  },
  {
    category_name: "Design",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 5,
  },
  {
    category_name: "Design",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 6,
  },
  {
    category_name: "Design",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 7,
  },
  {
    category_name: "Design",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 8,
  }
];

const Categories = () => {
  const [categories, setCategories] = useState(categoriesData);


  // useEffect(()=>{
  //   const data = axios.get(`${import.meta.env.VITE_API_URL}/categories`)
  //   setCategories(data)
  // },[])

  return (
<>
  <section className="px-10 py-12 min-h-[100vh] bg-primary text-center flex flex-col justify-center ">
    <h1 className="text-semibold text-4xl text-text1 mb-12">
      Professional Services to Grow Your Business
    </h1>
    <div className="gap-7 flex flex-col justify-around sm:flex-row flex-wrap">
      {categories.map((category) => {
        return (
          <div
            key={category.id}
            className="w-100 sm:w-1/3 md:w-1/5 grow"
          >
            <Category category={category} />
          </div>
        );
      })}
    </div>
  </section>
</>

  );
};

export default Categories;
