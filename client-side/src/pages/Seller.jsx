/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { RatingBadge } from '../components/Badges';
import ServicesItem from '../components/Service/ServicesItem';
import ReviewSlider from '../components/ReviewSlider';
import { BiHappyAlt } from 'react-icons/bi';
import { FaRegSadTear } from 'react-icons/fa';

export default function Seller() {
  const { id } = useParams();
  const [cookies, setCookies] = useCookies(["User"]);
  const [user ,setUser] = useState(null)
  const [reviews ,setReviews] = useState(null)
  const [services ,setServices] = useState(null)
  const [rate ,setRate] = useState(0)
  const [allIncomingOrders, setAllIncomingOrders] = useState([]);
  const [LoadingState, setLoadingState] = useState(
    <div role="status " className="self-center mt-[90px]">
      <svg aria-hidden="true" className="inline w-12 h-12 mr-2 text-gray-100 animate-spin dark:text-gray-400 fill-text1" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>
  );


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
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setTimeout(()=>{
      setLoadingState(
      <>
      <h3 className="text-text1 self-center mt-[90px] font-bold text-6xl mb-[-10px]">OOPS !</h3>
      <p className=" self-center font-semibold text-2xl text-text1 flex items-center gap-3">User not found <FaRegSadTear /></p>
      <button className="bg-secondary self-center w-[20%] rounded-md text-white font-medium py-1 hover:bg-secHover flex items-center justify-center gap-3 text-lg min-w-fit px-5"
      onClick={()=>location.reload()}
      >Retry  <BiHappyAlt size={22} /> ? </button>
      </>
      )
    },7000)
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
        hideProgressBar: true,
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
      const response = await axios.get( `${import.meta.env.VITE_API_URL}/reviews/sellerReviews/${id}`,
      { headers: { Authorization: `${cookies.UserToken}` } });
      
      setReviews(response.data)
      
      // calc user rate
      const reviews = response.data; 
      const sumOfRatings = reviews.reduce((total, review) => {
        return total + review.rating;
      }, 0);
      const averageRating = Math.floor(sumOfRatings / reviews.length);
      setRate(averageRating)
      
    } 
    try{
      getUserReviews()
    }catch(error){
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
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
// console.log('reviews:',reviews)
// console.log('services:',services)
// console.log('reviews:',reviews)
// console.log('allIncomingOrders:',allIncomingOrders)


  return (
    <div className='bg-primary min-h-[100vh] mt-[65px] '>
      {user ?
      <>
        {/* --------------------------------img and name------------------------------ */}
        <div className='w-full bg-white flex flex-wrap justify-center gap-[6rem] items-center py-4 sm:py-8 md:py-12 '>
          <div className='flex flex-col  items-center'>
              <div className='rounded-full max-w-[150px] max-h-[150px] overflow-hidden'>
                <img src={user.avatar} alt="user image"  />
              </div>
            <div className='text-2xl text-text1 font-semibold my-2' >{user.first_name} {user.last_name}</div>
          </div>
          </div>


        {/* -------------------------------about and stats------------------------------- */}
        <div className='flex flex-col md:flex-row justify-between px-3 sm:px-5 md:px-8 lg:px-12 my-3'>
          <div className='my-5 p-5 bg-white rounded-md w-full md:max-w-[60%]'>
            <h2 className='font-semibold text-md text-text1 border-b pb-3 mb-2'> About </h2>
            <p className='max-w-[90%] text-gray-600'>{user ? user.bio : 'Nothing here..'}</p>
          </div>
          

          <div className='my-5 py-5 px-7 bg-white w-full md:max-w-[37%] rounded-md'>
          <h2 className='font-semibold text-md text-text1 border-b pb-3 mb-2'> Stats </h2>
            <ul className='flex flex-col gap-3 py-2 px-1 text-sm font-medium text-text1'>
              <li className='flex justify-between'>rate : <span className='text-gray-500'><RatingBadge avg_rating={rate} /></span>  </li> 
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
        {/* -----------------------------------reviews ------------------------------------------ */}
        <div className='bg-white mx-3 sm:mx-6 md:mx-12 py-5   flex flex-col  items-center px-4 sm:px-6 lg:px-12 my-3'>
        <h1 className="mb-3 self-start font-medium border-b w-[100%] pb-3">what does they say about <span className="font-bold text-secondary "> {user.first_name} </span> ? </h1>

        {reviews && reviews.length > 0 ? <ReviewSlider userReviews={reviews}  />
          :
          <p>{user.first_name} doesnt has any reviews yet !</p>
          }
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
        null
      }
      
      <div className='mx-auto w-[100%] self-center pl-[45%]'>

      {! user && LoadingState}
      </div>
    <ToastContainer />
    </div>
  )
}
