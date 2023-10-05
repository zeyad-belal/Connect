/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import CategoryDisplay from "./ServiceDisplay"
// import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LoadingItemCard from "../UI/LoadingItemCard";

function MainSection() {
  // const form = useRef();
  // const { register, handleSubmit, formState: { errors },reset } = useForm();

  const [categories, setCategories] = useState('');


  useEffect(()=>{
    async function getCategories(){
      try{
        const repsonse = await  axios.get( `${import.meta.env.VITE_API_URL}/categories`)
        setCategories(repsonse.data)
      }catch(error){
        toast.error(error, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        })
      }
    }
    getCategories()
  },[])
    

    // const onSubmit = async (data) => {
    //   try{

    //     const formData = new FormData();
    //     formData.append("category_name", data.category_name);

    //     for(let i=0 ; i < data.image.length ; i++){
    //       formData.append('image', data.image[0]);
    //     }

    //     const response = await axios.patch(
    //       `${import.meta.env.VITE_API_URL}/categories/64e79a4daeabf3b3b3559f3d`,
    //       formData
    //     );

    //   }catch(error){
    //     console.log(error)
    //   }
    // }


  return (
    <div className="bg-primary px-3">
      
    {categories.length > 0 ? categories.map((category)=>
      <CategoryDisplay key={category.id} category={category} />
    )
    :
    <div className="flex flex-wrap mx-auto w-[95%] justify-between gap-6 py-10  ">
      <div className="w-100 sm:w-1/3 md:w-1/5 grow">
        <LoadingItemCard />
      </div>
      <div className="w-100 sm:w-1/3 md:w-1/5 grow">
        <LoadingItemCard />
      </div>
      <div className="w-100 sm:w-1/3 md:w-1/5 grow">
        <LoadingItemCard />
      </div>
      <div className="w-100 sm:w-1/3 md:w-1/5 grow">
        <LoadingItemCard />
      </div>

  </div>
  }

    <ToastContainer />
  {/* ------------------------------------------------------- */}
  {/* adding categroies  */}
    {/* <form
          ref={form}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full rounded-md  xl:m-10 md:m-10 sm:my-10 bg-white p-12" >

        <input
                    id="name"
                    {...register("category_name", { required: true })}
                    className="bg-primary focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
                    />
              <input
                    {...register("image", { required: true })}
                    className="m-12"
                    type="file"
                  />

<button
                type="submit"
                className="w-full py-3 px-4 my-10 bg-secondary text-white text-lg rounded-md hover:bg-secHover focus:outline-none  focus:border-secondary transition-colors">
                 save
              </button>
    </form> */}

    </div>
  )
}

export default MainSection