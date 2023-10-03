/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import Categories from "../components/Categories/Categories";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import HeroSection from "../components/HeroSection";
import MainSection from "../components/MainSection";
import { useSelector } from "react-redux";



export default function Home(props) {
  const [cookies, setCookies, removeCookie] = useCookies(["User"]);

  useEffect(() => {
    const userId = cookies.User ? cookies.User._id : localStorage.getItem("userID");
    const userToken = cookies.UserToken || localStorage.getItem("userToken");
    
    async function getUserData() {
      console.log(userToken)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
          { headers: { Authorization: userToken } } );
          
        setCookies("User", response.data.user);
        props.setUserStatus(true)
      } catch (error) {
        props.setUserStatus(false)
        console.error(error);
        toast.info("Something went wrong !", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    }

    if (window.localStorage.getItem("logged")) {
      if(userId && userToken){
        getUserData();
      }else{
        props.setUserStatus(false)
      }
    }
  }, []);

  return (
    <div>
      <HeroSection />
      <Categories />
      <MainSection />
    </div>
  );
}
