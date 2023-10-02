/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { RatingBadge } from '../components/Badges';
import ServicesItem from '../components/Service/ServicesItem';

export default function Seller() {
  const { id } = useParams();
  const [cookies, setCookies] = useCookies(["User"]);
  const [user ,setUser] = useState(null)
  const [reviews ,setReviews] = useState(null)
  const [services ,setServices] = useState(null)
  const [allIncomingOrders, setAllIncomingOrders] = useState([]);

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
      setServices(repsonse.data)
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


// get seller reviews
  useEffect(()=>{
    async function getUserReviews(){
      const repsonse = await axios.get( `${import.meta.env.VITE_API_URL}/reviews/sellerReviews/${id}`,
      { headers: { Authorization: `${cookies.UserToken}` } });
      
      console.log('reviews',repsonse.data.review)
      setReviews(repsonse.data)
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


  //get all Incoming orders for this seller
  useEffect(() => {
    async function getIncomingOrderHistory() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/seller/${id}`,
        { headers: { Authorization: `${cookies.UserToken}` } }
      );
      
      const data = await response.data.orders.map((order) => order)

      const allOrdersData = data.map((order) => {
        return order.items.map((item) => {
          return {
            id: item._id,
            buyer: item.user_id,
            quantity: item.quantity,
            created_at: order.created_at,
            name: item.service_id.name,
            avg_rating: item.service_id.avg_rating,
            description: item.service_id.description,
            image: item.service_id.images[0].url,
            seller: item.service_id.user_id,
            status: item.status,
            price: item.price,
            time: item.time,
            extras: item.extras,
          };
          
        });
        
      });
      
    
    setAllIncomingOrders(allOrdersData.flatMap((order) => order))

    }
    if (window.localStorage.getItem("logged")) {
      getIncomingOrderHistory();
    }


  }, [cookies.User._id, cookies.UserToken,id]);


// console.log('user:',user)
// console.log('services:',services)
// console.log('reviews:',reviews)
// console.log('allIncomingOrders:',allIncomingOrders)


  return (
    <div className='bg-primary min-h-[100vh] mt-[65px]'>
      {user ?
      <>
        {/* --------------------------------img and name------------------------------ */}
        <div className='w-full bg-white flex flex-col items-center py-12 '>
          <div className='rounded-full max-w-[150px] max-h-[150px] overflow-hidden'>
          <img src={user.avatar} alt="user image"  />
          </div>
          
          <div className='text-2xl text-text1 font-semibold my-2' >{user.first_name} {user.last_name}</div>
        </div> 

        {/* -------------------------------about and stats------------------------------- */}
        <div className='flex flex-col md:flex-row justify-between px-3 sm:px-5 md:px-8 lg:px-12 my-3'>
          <div className='my-5 p-5 bg-white rounded-md w-full md:max-w-[60%]'>
            <h2 className='font-semibold text-md text-text1 border-b pb-3 mb-2'> About </h2>
            <p className='max-w-[90%] text-gray-600'>{user ? user.bio : 'Nothing here..'}</p>
          </div>
          
          <div className='my-5 py-5 px-7 bg-white w-full md:max-w-[37%] rounded-md'>
            <h2 className='font-semibold text-md text-text1 border-b pb-3 mb-2'> Stats </h2>
            <ul className='flex flex-col gap-3 py-2 px-1 text-sm font-semibold text-text1'>
              <li className='flex justify-between'>rate : <span className='text-gray-500'><RatingBadge avg_rating={reviews && reviews.avg_rating ? reviews.avg_rating : 0} /></span>  </li> 
              <li className='flex justify-between'>published services : <span className='text-gray-500'>{services ? services.length: 0}</span>  </li>
              <li className='flex justify-between'>customers :     <span className='text-gray-500'>{allIncomingOrders? allIncomingOrders.length : 0}</span>  </li>
              <li className='flex justify-between'>member since : 
              <span className='text-gray-500'>
              {` ${new Date(user.created_at).getDate().toString().padStart(2, '0')}/${(new Date(user.created_at).getMonth() + 1).toString().padStart(2, '0')}/${new Date(user.created_at).getFullYear()}` }
              </span>
              </li>
            </ul>
          </div>
        </div>

        {/* -------------------------------- services ---------------------------------- */}
        <div className='flex gap-1 bg-white flex-wrap justify-around px-3 sm:px-5 md:px-1  py-8 mx-12 my-3'>
          {services && services.map((service, index)=>{
            return(
              <div key={index} className='w-100% sm:w-[47%] md:w-[30%] lg:w-[20%] '>
                <ServicesItem  item={service}  />
              </div>
              )
          })

          }
        </div>

      </>
        : 
        <div className='w-full p-6 text-lg font-semibold text-center text-text1'>user not found</div>
      }
    <ToastContainer />
    </div>
  )
}
