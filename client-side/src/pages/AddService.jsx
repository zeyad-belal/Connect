/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

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
    category_name: "code",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 2,
  },
  {
    category_name: "web",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 3,
  },
  {
    category_name: "translate",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 4,
  },
  {
    category_name: "art",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 5,
  },
  {
    category_name: "graphic",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 6,
  },
  {
    category_name: "image editing",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 7,
  },
  {
    category_name: "mobile devlopment",
    image:{
      url :"https://img.freepik.com/premium-photo/intriguing-photos-capturing-objects-found-inside-homes_853677-18721.jpg?size=626&ext=jpg&ga=GA1.1.1326869177.1680443547&semt=sph",
    },
    description : 'any desgin you need',
    created_at : 'nov 2012',
    updated_at : 'jan 2022',
    id: 8,
  }
];

const theKeywords =[
  'logo',
  'design',
  'code',
  'wordpress',
  'web',
  'frontend',
  'backend',
  'php',
  'java script',
  'web development',
  'full stack',
  'java',
  'ai',
  'automate',
  'mern',
  'mean',
  'mevn',
  'react',
  'angular',
  'vue',
  'node',
  'express',
  'ads',
  'translate',
  'assistant',
  'web design',
  'python',
  'designer',
  '.net',
  'c#',
  'c++',
  'desktop',
  'mobile',
  'webflow',
  'figma',
  'PWA',
  'other',
]

function AddService() {
  const [cookies, setCookies] = useCookies(["User"]);
  const [loadingStatue, setLoadingStatue] = useState(false);
  const form = useRef();
  const { register, handleSubmit, formState: { errors } ,setValue } = useForm();
  const [avatarValue, setAvatarValue] = useState('');
  const [categories, setCategories] = useState(categoriesData);
  const [chosenKeyWords, setChosenKeyWords] = useState([]);
  const avatarInput = useRef(null);
  


  function addKeyword(e){
    setChosenKeyWords(prevWords => {
      return[ ...prevWords ,e.target.innerText]
    })
    // e.target.classList.add('hidden')
  }

  const onSubmit = async (data) => {
    setLoadingStatue(true)
    try {
      const formData = new FormData();
      
      formData.append("name", data.name);
      formData.append("category_name", data.category_name);
      formData.append("description", data.description);
      formData.append("price", data.price);

      // updating user info
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/services`,
        formData,
        { headers: { Authorization: `${cookies.UserToken}` } }
      );
    

      // window.location.reload()
      setLoadingStatue(false) 
      toast.success(`your changes have been saved ${cookies.User.first_name}!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } catch (error) {
      // console.log(error)
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
  };


// useEffect(()=>{
//   async function getCAtegories(){
//     const repsonse = await  axios.get( `${import.meta.env.VITE_API_URL}/categories`)
//     setCategories(repsonse)
//   }
//   getCAtegories()
// })





  return (
<div className="flex relative justify-center items-center bg-gray-100">
      <form
        ref={form}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full rounded-md  xl:m-10 md:m-10 sm:my-10 bg-white p-12" >
         {/* --------image uploud--------------- */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setValue('avatar', file);
            }}
            onInput={(e)=>{
              const file = e.target.files[0];
              const fileURL = URL.createObjectURL(file); 
              setAvatarValue(fileURL); 
            }}
            ref={(e) => {
              register('avatar'); 
              avatarInput.current = e; 
            }}
            hidden
          />

        <div className="mb-4 max-w-[120px] mx-auto relative" >
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={avatarValue}
              alt=""
            />
          </div>
          <div className="absolute rounded-full inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-1 transition-opacity cursor-pointer group-hover:opacity-100">
            <AiFillCamera color="white" size={30} />
          </div>
        </div>
            {/* --------------name------------- */}
              <div className="mb-4 flex flex-col">
                <label htmlFor="name" className="mb-2">
                  Service Title
                </label>
                <input
                  id="name"
                  {...register("name", { required: true })}
                  className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
                  />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                  )}
              </div>
            {/* --------------category_name------------- */}
            <div className="mb-4 flex flex-col">
              <label htmlFor="category"  className="mb-2">
                Category
              </label>
              <select
                {...register("category_name", {
                  required: true })}
                aria-invalid={errors.category_name ? "true" : "false"}
                id="category"
                className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors" >
                <option value="">Please select</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.category_name}>
                      {category.category_name}
                    </option>
                  );
                })}
              </select>
              {errors.category_name?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Category name is required
                </p>
              )}
            </div>
            {/* -----------description---------------- */}
            <div className="mb-4">
              <label htmlFor="description" className=" mb-2">
                Description
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
                className="bg-gray-100  focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
                />
              {errors.description && (
                <span className="text-red-500">
                  Please enter a valid description
                </span>
              )}
            </div>
            {/* -----------price and duration---------------- */}
            <div className="mb-4 flex  gap-3">

              <div className="mb-4 w-full">
                <label htmlFor="price" className=" mb-2">
                  Price
                </label>
                <input
                  id="price"
                  placeholder="in USD"
                  {...register("price", { required: true })}
                  className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
                />
                {errors.price && (
                  <span className="text-red-500">This field is required</span>
                  )}
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="time" className=" mb-2">
                  Delivery Period
                </label>
                <select
                  id="time"
                  {...register("time", { required: true })}
                  className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors" >
                  <option value="">Please select</option>
                  <option key='one day' value="one day">one day</option>
                  <option key='two day' value="two day">two days</option>
                  <option key='three days' value="three days">three days</option>
                  <option key='four days' value="four days">four days</option>
                  <option key='five day' value="five days">five days</option>
                  <option key='six days' value="six days">six days</option>
                  <option key='one week' value="one week">one week</option>
                  <option key='two weeks' value="two weeks">two weeks</option>
                  <option key='three weeks' value="three weeks">three weeks</option>
                  <option key='one month' value="one month">one month</option>
                </select>
                {errors.time && (
                  <span className="text-red-500">This field is required</span>
                  )}
              </div>
            </div>
            {/* --------------keywords------------- */}
            <div className="mb-4 flex flex-col">
                <label htmlFor="keywords" className="mb-2">keywords</label>
                <select
                  {...register("keywords", { required: true })}
                  className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors" >
                    <option value="">Please select</option>
                    {theKeywords.map((word)=>{
                      return <option key={word} value={word}>{word}</option>
                    })}
                  </select>
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
                {/* <div className=""> */}
                {/* {theKeywords.map((word)=>{
                  return <span
                    className="p-1 rounded-md m-1 text-sm cursor-pointer bg-gray-100 inline-block" key={word}
                    onClick={(e)=> addKeyword(e)}
                    >{word}</span>
                })}
                </div> */}
              </div>
            {/* --------------------------- */}
            <button
              type="submit"
              className="w-full py-3 px-4 my-10 bg-secondary text-white text-lg rounded-md hover:bg-secHover focus:outline-none  focus:border-secondary transition-colors">
              {loadingStatue ? <div role="status">
                <svg aria-hidden="true" className="inline w-6 h-6 mr-2 text-gray-100 animate-spin dark:text-gray-400 fill-text1" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              </div> : 'save'}
              
            </button>
      </form>
      <ToastContainer />
    </div>
  )
}


export default AddService