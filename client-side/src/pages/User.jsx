/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function User() {
  const { id } = useParams();
  const [cookies, setCookies] = useCookies(["User"]);
  const [user ,setUser] = useState(null)



  useEffect(()=>{
    async function getUser(){
      const repsonse = await  axios.get( `${import.meta.env.VITE_API_URL}/users/${id}`,
      { headers: { Authorization: `${cookies.UserToken}` } });
      setUser(repsonse.data.user)
      console.log('repsonse.data.user',repsonse.data.user)
    } 
    try{
      getUser()
    }catch(error){
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  },[cookies.UserToken, id])

console.log('user:',user)

  return (
    <div className='bg-primary'>
      {user ?
        <div className='w-full bg-white flex justify-center pt-12'>
        <img src={user.avatar} alt="user image" className='max-w-[150px]' />
        </div> 
        : 
        <div className='w-full p-6 text-lg font-semibold text-center text-text1'>user not found</div>
      }
    <ToastContainer />
    </div>
  )
}
