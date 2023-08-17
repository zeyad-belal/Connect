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
  const services = useSelector((state)=> state.services.services);

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
          {headers: { Authorization: cookies.UserToken }});
          
        setCookies("User", response.data.user);
      } catch (error) {
        // console.error(error);
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
      getUserData();
    }
  }, []);

  return (
    <div>
      <HeroSection />
      <Categories />
      {/* {services.loading && <loadingMain />}
      {!services.loading && <MainSection />} */}
      <MainSection />
    </div>
  );
}
