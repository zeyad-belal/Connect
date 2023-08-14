/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { AiFillCamera } from  "react-icons/ai";

function UserInfo(){
  const form = useRef();
  const avatarInput = useRef(null);
  const { register, handleSubmit, formState: { errors } ,setValue } = useForm();
  const [cookies, setCookies] = useCookies(["User"]);
  const [isImageMenuVisible, setIsImageMenuVisible] = useState(false);


  function toggleImageMenu(){
    setIsImageMenuVisible(prevValue => !prevValue)
  }
  
  function uploudNewPhoto(){
    setIsImageMenuVisible(false)
    avatarInput.current.click();
  }

  async function deleteUserPhoto(){
    try{
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
          { avatar  :null },
          { headers: { Authorization: `${cookies.UserToken}` } }
          );
        setIsImageMenuVisible(false)

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

  
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      console.log(data)

      // Append other form data to the FormData object
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("avatar", data.avatar);

      // updating user info
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
        formData,
        { headers: { Authorization: `${cookies.UserToken}` } }
      );
    
      
    console.log(data.avatar)
    console.log(response)

    // update user cookie
    const response2 = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
      {
        headers: { Authorization: cookies.UserToken }
      }
      );
      setCookies("User", response2.data.user);
      window.location.reload()

    } catch (error) {
      console.log(error)
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



  return (
    <div className="flex justify-center items-center bg-gray-100">
      <form
        ref={form}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[500px]   xl:m-10 md:m-10 sm:my-10 bg-white p-12" >
         {/* --------image uploud--------------- */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setValue('avatar', file);
            }}
            ref={(e) => {
              register('avatar'); 
              avatarInput.current = e; 
            }}
            hidden
          />

        <div className="mb-4 max-w-[120px] mx-auto relative" onClick={toggleImageMenu}>
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={cookies.User?.avatar}
              alt=""
            />
          </div>
          <div className="absolute rounded-full inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-1 transition-opacity cursor-pointer group-hover:opacity-100">
            <AiFillCamera color="white" size={30} />
          </div>

            {/* -----ImageMenu------ */}
            {isImageMenuVisible ? 
            <ul className="bg-white absolute top-[80px] left-[-60px] border rounded-md min-w-[150px]">
            <div className="absolute before:w-0  before:h-0  before:transform before:-rotate-45  before:border-white before:border-8 before:bg-white before:absolute before:top-[-3px] before:right-[-127px]"></div>
              <li className="hover:bg-gray-100 relative z-10 cursor-pointer border-b-2 p-1" onClick={uploudNewPhoto}>             
                new photo
                </li>
              <li className="hover:bg-gray-100 cursor-pointer p-1" onClick={deleteUserPhoto}>delete</li>
            </ul>
            :''}
          </div>
            {/* --------------First Name------------- */}
            <div className="mb-4 flex gap-3">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="mb-2 ">
                  First Name:
                </label>
                <input
                  id="firstName"
                  {...register("firstName", { required: true })}
                  defaultValue={`${cookies.User?.first_name}`}
                  className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
                  />
                {errors.firstName && (
                  <span className="text-red-500">This field is required</span>
                  )}
              </div>
            {/* -------------Last Name-------------- */}
            <div className="flex flex-col">
                <label htmlFor="lastName" className="mb-2 ">
                  Last Name:
                </label>
                <input
                  id="lastName"
                  {...register("lastName", { required: true })}
                  defaultValue={`${cookies.User?.last_name}`}
                  className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
                  />
                {errors.lastName && (
                  <span className="text-red-500">This field is required</span>
                  )}
              </div>
            </div>
            {/* --------------Phone------------- */}
            <div className="mb-4">
            <label htmlFor="phone" className="mb-2">
                Phone:
              </label>
              <input
                id="phone"
                defaultValue={`${cookies.User?.phone_number}`}
                {...register("phone", { required: true })}
                className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
              />
              {errors.phone && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* -----------Email---------------- */}
            <div className="mb-4">
              <label htmlFor="email" className=" mb-2">
                Email:
              </label>
              <input
                id="email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
                defaultValue={`${cookies.User?.email}`}
                className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
                />
              {errors.email && (
                <span className="text-red-500">
                  Please enter a valid email address
                </span>
              )}
            </div>
            {/* -----------Address---------------- */}
            <div className="mb-4">
              <label htmlFor="address" className=" mb-2">
                Address:
              </label>
              <input
                id="address"
                {...register("address", { required: true })}
                defaultValue={`${
                  cookies.User.address ? cookies.User.address : ""
                }`}
                className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
              />
              {errors.address && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* --------------------------- */}
            <button
              type="submit"
              className="w-full py-2 px-4 my-10 bg-secondary text-white rounded-md hover:bg-secHover focus:outline-none  focus:border-secondary transition-colors">
              save
            </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default UserInfo