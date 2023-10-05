/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";


const RepeatedExtras = (props) => {
  const { register, handleSubmit, formState: { errors } , reset } = useForm();

  const extraId = parseInt(props.id, 10);

    function deleteExtra(e){
      e.preventDefault()
      props.setExtras((prevExtras)=> {
        return  prevExtras.filter((extra) => {
          return extra.props.id != extraId
        })
      })
    }
    
  return (
    <div className="w-full flex gap-2 flex-wrap border-b-2 pb-4"  >
      <button className="ml-[97%] block hover:text-red-700 lg:hidden text-red-500 rounded-full mb-[-13px] text-lg"
      onClick={(e)=> deleteExtra(e)}
      ><AiOutlineCloseCircle /></button>
      <div className="name w-full lg:w-[31%]">
        <label
          htmlFor="extra-name"
          className="mb-1 font-semibold text-text1 text-sm ">
          Name
        </label>

        <input
          {...register("extra-description")}
          type="text"
          id="extra-description"
          placeholder="extra description"
          className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md  focus:outline-none  focus:border-secondary transition-colors" />
      </div>

      <div className="cost w-full lg:w-[31%]">
        <label
          htmlFor="extra-cost"
          className="mb-1 font-semibold text-text1 text-sm " >
          Cost <span className="text-xs ml-2 text-gray-400">(additional costs)</span>
        </label>
        <input
          {...register("extra-cost")}
          type="text"
          id="extra-cost"
          placeholder="in USD"
          className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md  focus:outline-none  focus:border-secondary transition-colors" />
      </div>

      <div className="time w-full lg:w-[31%]">
        <label
          htmlFor="extra-time"
          className="mb-1 font-semibold text-text1 text-sm " >
          Extra Time <span className="text-[10px] ml-2 text-gray-400">(additional time)</span>
        </label>
          <select id="extra-time"
          {...register("extra-time", { required: true })}
          className="bg-gray-100  focus:bg-white w-full px-3 py-2 border rounded-md  focus:outline-none  focus:border-secondary transition-colors" >
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
      <button 
      onClick={(e)=> deleteExtra(e)}
      className="self-start hidden lg:block text-red-500 hover:text-red-700  text-lg ">
        <AiOutlineCloseCircle /></button>
    </div>
  );
};



function AddService() {
  const form = useRef();
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  
    const [cookies, setCookies] = useCookies(["User"]);
    const [loadingStatue, setLoadingStatue] = useState(false);
    const [categories, setCategories] = useState([]); 
  
  // images uploud
  const [imagesURLS, setImagesURLS] = useState([]); 
  const [selectedImages, setSelectedImages] = useState([]);
  const imageInput = useRef(null);
  
  const [extras, setExtras] = useState([]);
  const socket = io(import.meta.env.VITE_API_URL);



  const gatherExtrasDetails = () => {
    const details = [];
    const names = document.querySelectorAll("#extra-description");
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
      <RepeatedExtras key={prevExtras.length} 
        id={prevExtras.length}
        gatherExtrasDetails={gatherExtrasDetails}
        setExtras={setExtras} 
        />,
    ]);
  };

  const handleImagesChange = (e) => {
      //updating images input
      setSelectedImages(prevImages => {
        return [...prevImages, ...e.target.files]
      })
      
      // gathering images url to display
      const imagesfiles = [...e.target.files];
      let URLs=[];
      imagesfiles.map((file)=>{
        URLs.push(URL.createObjectURL(file));
      })
      setImagesURLS((prevValues) => [...prevValues, ...URLs]); 
  };

  function handleImageDeletion(e,index) {
    // Remove the image from selectedImages array
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1); // Remove 1 element at the specified index
      return newImages;
    });
  
    // Remove the corresponding URL from imagesURLS array
    setImagesURLS((prevValues) => {
      const newURLs = [...prevValues];
      newURLs.splice(index, 1); // Remove 1 element at the specified index
      return newURLs;
    });
  }
  

  

  const onSubmit = async (data) => {

    try {
      setLoadingStatue(true)
      const extras = gatherExtrasDetails();
      
      const formData = new FormData();
      formData.append("user_id", cookies.User.id);
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("time", data.time);
      formData.append("extras", JSON.stringify(extras));
      formData.append("category_name", data.category_name);
      formData.append("keywords", data.keywords.split(" "));

      selectedImages.forEach(img => {
        formData.append('images', img);
      });

      
      const serviceCreationRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/services`,
        formData,
        { headers: { Authorization: `${cookies.UserToken}` } }
      );

      setLoadingStatue(false) 
      reset()
      setSelectedImages([])
      setImagesURLS([])
      // send noti to all users
      socket.emit('send-noti', `${serviceCreationRes.data.toBeSentDocument._id} : New Service Has Been Added By ${cookies.User.first_name} ${cookies.User.last_name} : (${data.name})`, 'global');

      toast.success(`your service has been added ${cookies.User.first_name}!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } catch (error) {
      setLoadingStatue(false) 
      console.log(error)
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  };




  //get catgories
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
        });
      }
    }
    getCategories()
  },[])



  

  return (
    <main className="bg-primary mt-[65px]">
      <h1 className="text-[25px] font-semibold px-12 pt-12 pb-10 md:pb-0">Add New Service</h1>
      <div className="flex relative justify-center items-center ">
        <form
          ref={form}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full rounded-md   lg:my-10 md:m-10 sm:my-10 bg-white p-3 lg:mr-1" >
              {/* --------------name------------- */}
                <div className="mb-4 flex flex-col">
                  <label htmlFor="name" className="mb-1 font-semibold text-text1 text-sm ">
                    Service Title
                  </label>
                  <input
                    id="name"
                    {...register("name", { required: true })}
                    className="bg-primary focus:bg-white w-full px-3 py-2 border rounded-md  focus:outline-none  focus:border-secondary transition-colors"
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
                      className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md  focus:outline-none  focus:border-secondary transition-colors" >
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
                      className="bg-gray-100  focus:bg-white w-full px-3 py-2 border rounded-md  focus:outline-none  focus:border-secondary transition-colors"
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
                        className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md  focus:outline-none  focus:border-secondary transition-colors"
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
                        className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md  focus:outline-none  focus:border-secondary transition-colors" >
                        <option value="">Please select</option>
                        <option key='one day' value="one day">one day</option>
                        <option key='two day' value="two days">two days</option>
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
              <label htmlFor="images"className="mb-1 font-semibold text-text1 text-sm " >Images
              <span className="text-[10px] text-gray-400"> (preferable dimensions 625*350)</span>
              </label>
              <div className="bg-gray-100 flex flex-col  gap-3 px-3 p-6 mb-12  rounded-sm">
                <button type="button" className="relative self-center  h-[35px] px-3 font-medium text-sm  md:text-md text-white duration-150 bg-secondary rounded-md  hover:bg-secHover active:bg-yellow-500 "
                onClick={()=>imageInput.current.click()}
                >add image
                </button>
                  <input
                    name='images'
                    type="file"
                    multiple
                    ref={imageInput} 
                    onChange={(e)=>handleImagesChange(e)}
                    className="hidden"
                  />
                {/* images display */}
                <div className="flex flex-wrap items-center gap-1">
                  {imagesURLS && imagesURLS.map((imageURL, index) => (
                    <div key={index} className="max-w-[200px] w-full max-h-[110px] overflow-clip relative ">
                        <span className="absolute text-white z-10 mt-1 ml-1 cursor-pointer"
                        onClick={(e)=> handleImageDeletion(e,index)}
                        >  <AiOutlineCloseCircle /> </span>
                        <span className="bg-black opacity-40 absolute w-full h-full"></span>
                        <img className=" " src={imageURL} alt="service image" />
                    </div> 
                  ))}
                </div>
              </div>
              {/* --------------extras------------- */}
              <div className="bg-primary px-3 pb-6 pt-3 rounded-sm">
                    <h2 className="font-bold text-gray-500  mb-3">The enhancements to the provided service are optional only.</h2>
                    <div className=" flex flex-wrap gap-3 items-center">
                      {extras}
                      <button
                        onClick={() => handleExtraRepeat()}
                        type="button"
                        className=" h-[35px] px-3 font-medium text-sm  md:text-md text-white duration-150 font-xs bg-secondary rounded-md hover:bg-secHover active:bg-yellow-600">
                        add extra
                      </button>
                    </div>
              </div>
              {/* --------------submit------------- */}
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

        <div className="hidden lg:block py-12 p-5 self-start max-w-[400px]">
          <h3 className="text-lg font-semibold mb-2">Service Title</h3>
          <p className="text-gray-700 text-md mb-12">
            Choose a concise and clear title that accurately reflects what you're offering in your service.
            This will help buyers find your service when searching for related keywords in the field.
          </p>

          <h3 className="text-lg font-semibold mb-2">Service Description</h3>
          <p className="text-gray-700 text-md mb-12">
            Write a distinctive description for your service using proper language free from errors.
            Explain in detail what the customer will receive when purchasing the service.
          </p>

          <h3 className="text-lg font-semibold mb-2">Service Portfolio</h3>
          <p className="text-gray-700 text-md mb-12">
            Include an expressive image related to the service, along with at least three exclusive samples.
            These samples should introduce the buyer to your working style and skills.
          </p>

          <h3 className="text-lg font-semibold mb-2">Service Price</h3>
          <p className="text-gray-700 text-sm">
            Set an appropriate price for the service based on the scope of work and effort involved,
            taking into account the platform commission.
            Also, specify a suitable delivery time to complete the service with excellence.
          </p>
        </div>
        <ToastContainer />
      </div>
    </main>
  )
}


export default AddService