/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

//temp
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

const RepeatedExtras = () => {
  const { register, handleSubmit, formState: { errors } , reset } = useForm();
  return (
    <div className="w-full flex gap-3 ">
      <div className="name">
        <label
          htmlFor="extra-name"
          className="mb-1 font-semibold text-text1 text-sm ">
          Name
        </label>

        <input
          {...register("key")}
          type="text"
          id="extra-name"
          placeholder="key name"
          className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors" />
      </div>

      <div className="cost">
        <label
          htmlFor="extra-cost"
          className="mb-1 font-semibold text-text1 text-sm " >
          Cost <span className="text-xs ml-2 text-gray-400">(additional service costs)</span>
        </label>
        <input
          {...register("extra-cost")}
          type="text"
          id="extra-cost"
          placeholder="in USD"
          className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors" />
      </div>

      <div className="time">
        <label
          htmlFor="extra-time"
          className="mb-1 font-semibold text-text1 text-sm " >
          Extra Time <span className="text-xs ml-2 text-gray-400">(additional time needed)</span>
        </label>
          <select id="extra-time"
          {...register("extra-time", { required: true })}
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
        {errors['extra-time'] && (
          <span className="text-red-500">This field is required</span>
          )}
      </div>
    </div>
  );
};

const ImageUpload = () => {
  const [imagesURLS, setImagesURLS] = useState([]); 
  const imageInput = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      // gathering images url
      setImagesURLS((prevValues) => [...prevValues, fileURL]); 
    }
  };


  return (
    <div className="flex">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={imageInput}
        className="serviceImage hidden"
      />
      {/* Trigger the hidden file input */}
      <button type="button" className="self-center mr-4 inline-block h-[38px] px-4 text-white duration-150 font-medium bg-secondary rounded-lg hover:bg-secHover active:bg-yellow-600 md:text-sm"
        onClick={(e) => imageInput.current.click(e)}>Add Image</button>

      {imagesURLS.map((imageURL, index) => (
        <div key={index} className="image-container mb-4 max-w-[170px] mx-auto relative">
          <div className="w-[180px] h-[150px] rounded-md overflow-hidden flex">
            <img className="w-full h-full object-cover" src={imageURL} alt="service image" />
          </div>
        </div>
      ))}

    </div>
  );
};


function AddService() {

  const [cookies, setCookies] = useCookies(["User"]);
  const [loadingStatue, setLoadingStatue] = useState(false);
  const [categories, setCategories] = useState(categoriesData); //temp
  
  const form = useRef();
  const { register, handleSubmit, formState: { errors } ,setValue } = useForm();

  const [extras, setExtras] = useState([]);
  const [images ,setImages] = useState([<ImageUpload key={0} />])


  const gatherExtrasDetails = () => {
    const details = [];
    const names = document.querySelectorAll("#extra-name");
    const costs = document.querySelectorAll("#extra-cost");
    const times = document.querySelectorAll("#extra-time");
    for (let i = 0; i < names.length; i++) {
      if (names[i].value && costs[i].value && times[i].value) {
        let detail =[names[i].value ,costs[i].value, times[i].value]
        details.push(detail) 
      }
    }
    return details;
  };

  const handleExtraRepeat = () => {
    setExtras((prevExtras) => [
      ...prevExtras,
      <RepeatedExtras key={prevExtras.length} />,
    ]);
  };

  const gatherImagesDetails = () => {
    const details = [];
    const images = document.querySelectorAll(".serviceImage");
  
    for (let i = 0; i < images.length; i++) {
      if (images[i].value ) {
        details.push(images[i].value) 
      }
    }
    console.log(details)
    return details;
  };


  const onSubmit = async (data) => {
    setLoadingStatue(true)
    console.log('fired')
    // try {
      const formData = new FormData();
      
      const extras = gatherExtrasDetails();
      const images = gatherImagesDetails();
    
      console.log('data:',data)
    
      formData.append("name", data.name);
      formData.append("category_name", data.category_name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("time", data.time);
      formData.append("keywords", data.keywords.split(" "));
      formData.append("extras", JSON.stringify(extras));
      formData.append("images", JSON.stringify(images));
    
      console.log("formData:",formData.get('name'))
      console.log("formData:",formData.get('category_name'))
      console.log("formData:",formData.get('description'))
      console.log("formData:",formData.get('price'))
      console.log("formData:",formData.get('time'))
      console.log("formData:",formData.get('keywords'))
      console.log("formData:",formData.get('extras'))
      console.log("formData:",formData.get('images'))

      
      // const response = await axios.post(
      //   `${import.meta.env.VITE_API_URL}/services`,
      //   formData,
      //   { headers: { Authorization: `${cookies.UserToken}` } }
      // );
    
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
    // } catch (error) {
    //   // console.log(error)
    //   toast.error(error, {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light"
    //   });
    // }
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
            {/* --------------name------------- */}
              <div className="mb-4 flex flex-col">
                <label htmlFor="name" className="mb-1 font-semibold text-text1 text-sm ">
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
              <label htmlFor="category"  className="mb-1 font-semibold text-text1 text-sm ">
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
              <label htmlFor="description" className="mb-1 font-semibold text-text1 text-sm ">
                Description
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: true,
                })}
                className="bg-gray-100  focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
                />
              {errors.description?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Description name is required
                </p>
              )}
            </div>
            {/* -----------price and duration---------------- */}
            <div className="mb-4 flex  gap-3">
              <div className="mb-4 w-full">
                <label htmlFor="price" className="mb-1 font-semibold text-text1 text-sm " >
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
                <label htmlFor="time" className="mb-1 font-semibold text-text1 text-sm " >
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
                <label htmlFor="keywords" className="mb-1 font-semibold text-text1 text-sm " >keywords 
                  <span className="text-xs ml-2 text-gray-400">( provide single words separated with space )</span> </label>
                <input
                  placeholder="ex: logo design web 3d ..."
                  {...register("keywords", { required: true })}
                  className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors" />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            {/* --------------images------------- */}
            <label htmlFor="images"className="mb-1 font-semibold text-text1 text-sm " >Images</label>
            <div className="bg-gray-100 px-3 p-6 mb-12  rounded-md">
                <div id="images" className="flex  flex-wrap gap-3 ">
                  {images}
                </div>
              </div>
            {/* --------------extras------------- */}
            <div className="bg-primary px-3 pb-6 pt-3 rounded-md">
              <h2 className="font-bold text-gray-500  mb-3">The enhancements to the provided service are optional only.</h2>
              <div className=" flex flex-wrap gap-3 items-center">
                {extras}
                <button
                  onClick={() => handleExtraRepeat()}
                  type="button"
                  className="inline-block h-[38px] px-4 text-white duration-150 font-medium bg-secondary rounded-lg hover:bg-secHover active:bg-yellow-600 md:text-sm">
                  Add Extra
                </button>
              </div>
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