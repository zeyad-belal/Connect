/* eslint-disable no-unused-vars */
import axios from "axios";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AiFillCamera } from  "react-icons/ai";

function UserInfo(){
  const form = useRef();
  const avatarInput = useRef(null);
  const { register, handleSubmit, formState: { errors } ,setValue } = useForm();
  const [cookies, setCookies] = useCookies(["User"]);
  const [isImageMenuVisible, setIsImageMenuVisible] = useState(false);
  const [avatarDeleted, setAvatarDeleted] = useState(false);
  const [avatarValue, setAvatarValue] = useState(cookies.User.avatar);
  const [loadingStatue, setLoadingStatue] = useState(false);


  function toggleImageMenu(){
    setIsImageMenuVisible(prevValue => !prevValue)
  }
  
  function uploudNewPhoto(){
    setIsImageMenuVisible(false)
    avatarInput.current.click();
  }

  function deleteUserPhoto(){
    setIsImageMenuVisible(false)
    setAvatarDeleted(true)
    setAvatarValue("")
  }

  const onSubmit = async (data) => {
    setLoadingStatue(true)
    try {
      const formData = new FormData();
      
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("bio", data.bio);
      formData.append("avatarID", cookies.User.avatarID);
      // get the new avatar data or the old if no deletion happened
      if(!avatarDeleted && data.avatar){
        formData.append("avatar", data.avatar)
      }else if(!avatarDeleted && !data.avatar){
        formData.append("avatar",`${cookies.User?.avatar}`)
      }else if(avatarDeleted){
        formData.append("avatar", "") 
      }

      // updating user info
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
        formData,
        { headers: { Authorization: `${cookies.UserToken}` } }
      );
    
    // update user cookie
    const response2 = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
      {
        headers: { Authorization: cookies.UserToken }
      }
      );
      setCookies("User", response2.data.user);
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


  return (
    <div className="flex relative justify-center items-center bg-gray-100 mt-[65px]">
      <form
        ref={form}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[500px] rounded-md  xl:m-10 md:m-10 sm:my-10 bg-white p-12" >
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

        <div className="mb-4 max-w-[120px] mx-auto relative" onClick={toggleImageMenu}>
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

            {/* -----ImageMenu------ */}
            {isImageMenuVisible ? 
            <ul className="bg-white absolute top-[80px] left-[-60px] border rounded-md min-w-[150px]" onClick={toggleImageMenu}>
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
            {/* --------------bio------------- */}
            <div className="mb-4">
              <label htmlFor="bio" className=" mb-2">
                About:
              </label>
              <textarea
                id="bio"
                {...register("bio", { required: true })}
                defaultValue={`${
                  cookies.User.bio ? cookies.User.bio : ""
                }`}
                className="bg-gray-100 focus:bg-white w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-secondary transition-colors"
              />
              {errors.bio && (
                <span className="text-red-500">This field is required</span>
              )}
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
    </div>
  )
}

export default UserInfo