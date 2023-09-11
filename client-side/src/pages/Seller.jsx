/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { RatingBadge } from '../components/Badges';

export default function Seller() {
  const { id } = useParams();
  const [cookies, setCookies] = useCookies(["User"]);
  const [user ,setUser] = useState(null)
  const [reviews ,setReviews] = useState(null)
  const [services ,setServices] = useState(null)


// get user
  useEffect(()=>{
    async function getUser(){
      const repsonse = await  axios.get( `${import.meta.env.VITE_API_URL}/users/${id}`,
      { headers: { Authorization: `${cookies.UserToken}` } });
      setUser(repsonse.data.user)
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



  // get seller services
  useEffect(()=>{
    async function getServices(){
      const repsonse = await  axios.get( `${import.meta.env.VITE_API_URL}/services/seller/${id}`,
      { headers: { Authorization: `${cookies.UserToken}` } });
      setServices(repsonse.data.services)
      console.log("ssss",repsonse.data)
    } 
    try{
      getServices()
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


// get user reviews
  useEffect(()=>{
    async function getUserReviews(){
      const repsonse = await axios.get( `${import.meta.env.VITE_API_URL}/reviews/sellerReviews/${id}`,
      { headers: { Authorization: `${cookies.UserToken}` } });
      
      console.log('reviews',repsonse.data.review)
      setReviews(repsonse.data.review)
    } 
    try{
      getUserReviews()
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
    <div className='bg-primary min-h-[100vh]'>
      {user ?
      <>
        <div className='w-full bg-white flex flex-col items-center py-12 '>
          <div className='rounded-full max-w-[150px] max-h-[150px] overflow-hidden'>
          <img src={user.avatar} alt="user image"  />
          </div>
          
          <div className='text-lg text-text1 font-semibold my-2' >{user.first_name} {user.last_name}</div>
        </div> 

        <div className='flex flex-col md:flex-row justify-between px-3 sm:px-5 md:px-8 lg:px-12'>
          <div className='my-5 p-5 bg-white w-full md:max-w-[60%]'>
            <h2 className='font-semibold text-md text-text1 border-b pb-3 mb-2'> About </h2>
            <p className='max-w-[80%]'>helsocdwef hwefgwefgf wegweg fwefgkjwefg kwefgkjwegw juefgwe gfwgf ewfgewfg ej wegf uwe gfh</p>
          </div>
          
          <div className='my-5 p-5 bg-white w-full md:max-w-[35%]'>
            <h2 className='font-semibold text-md text-text1 border-b pb-3 mb-2'> Stats </h2>
            <ul>
              <li className='flex justify-between'>rate : <span><RatingBadge avg_rating={reviews && reviews.avg_rating ? reviews.avg_rating : 0} /></span>  </li> 
              <li className='flex justify-between'>published services : <span>jhghdchj</span>  </li>
              <li className='flex justify-between'>customers count :     <span>incoming orders count</span>  </li>
              <li className='flex justify-between'>member since : 
              {` ${new Date(user.created_at).getDate().toString().padStart(2, '0')}/${(new Date(user.created_at).getMonth() + 1).toString().padStart(2, '0')}/${new Date(user.created_at).getFullYear()}` }
              </li>
            </ul>
          </div>
        </div>



      </>
        : 
        <div className='w-full p-6 text-lg font-semibold text-center text-text1'>user not found</div>
      }
    <ToastContainer />
    </div>
  )
}
