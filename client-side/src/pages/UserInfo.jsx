/* eslint-disable no-unused-vars */
import axios from "axios";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AiFillCamera } from  "react-icons/ai";

function UserInfo(){
  const form = useRef();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [cookies, setCookies] = useCookies(["User"]);
  const [isImageMenuVisible, setIsImageMenuVisible] = useState(false);


  function toggleImageMenu(){
    setIsImageMenuVisible(prevValue => !prevValue)
  }

  
  const onSubmit = async (data) => {
    try {
      // updating user info
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
        {
          first_name :data.firstName,
          last_name :data.lastName,
          phone: data.phone,
          email: data.email,
          address: data.address,
        },
        { headers: { Authorization: `${cookies.UserToken}` } }
      );
      
    } catch (error) {
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
          
          <div className="mb-4  max-w-fit mx-auto relative" onClick={toggleImageMenu}>
            <img
            className="max-w-[120px] rounded-full"
            src={cookies.User?.avatar} alt="" />
            <div className="absolute rounded-full  inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-1 transition-opacity cursor-pointer group-hover:opacity-100">
            <AiFillCamera color="white" size={30} />
            </div>
            {/* -----menu------ */}
            {isImageMenuVisible ? 
            <ul className="bg-white absolute top-[80px] left-[-60px] border rounded-md min-w-[150px]">
            <div className="absolute before:w-0  before:h-0  before:transform before:-rotate-45  before:border-white before:border-8 before:bg-white before:absolute before:top-[-3px] before:right-[-127px]"></div>

              <li className="hover:bg-gray-100 relative z-10 cursor-pointer border-b-2 p-1">new photo</li>
              <li className="hover:bg-gray-100 cursor-pointer p-1">delete</li>
            </ul>
            :''}
          </div>
            {/* --------------------------- */}
            <div className="mb-4 flex gap-3">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="mb-2 ">
                  First Name:
                </label>
                <input
                  id="firstName"
                  {...register("firstName", { required: true })}
                  defaultValue={`${cookies.User?.first_name}`}
                  className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-orange-300 transition-colors"
                  />
                {errors.firstName && (
                  <span className="text-red-500">This field is required</span>
                  )}
              </div>
            {/* --------------------------- */}
            <div className="flex flex-col">
                <label htmlFor="lastName" className="mb-2 ">
                  Last Name:
                </label>
                <input
                  id="lastName"
                  {...register("lastName", { required: true })}
                  defaultValue={`${cookies.User?.last_name}`}
                  className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-orange-300 transition-colors"
                  />
                {errors.lastName && (
                  <span className="text-red-500">This field is required</span>
                  )}
              </div>
            </div>
            {/* --------------------------- */}
            <div className="mb-4">
            <label htmlFor="phone" className="mb-2">
                Phone:
              </label>
              <input
                id="phone"
                defaultValue={`${cookies.User?.phone_number}`}
                {...register("phone", { required: true })}
                className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-orange-300 transition-colors"
              />
              {errors.phone && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* --------------------------- */}
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
                className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-orange-300 transition-colors"
                />
              {errors.email && (
                <span className="text-red-500">
                  Please enter a valid email address
                </span>
              )}
            </div>
            {/* --------------------------- */}
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
                className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-orange-300 transition-colors"
              />
              {errors.address && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* --------------------------- */}
            <button
              type="submit"
              className="w-full py-2 px-4 my-10 bg-f37020 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:border-orange-300 transition-colors">
              save
            </button>
      </form>
    </div>
  )
}

export default UserInfo