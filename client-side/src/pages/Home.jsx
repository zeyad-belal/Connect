/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import Categories from "../components/Categories/Categories";
import OtherServices from "../components/OtherServices";
import NewArrivalsSlider from "../components/Sliders/NewArrivalsSlider";
import Circles from "../components/Circles";
import DealsSlider from "../components/Sliders/DealsSlider";
import axios from "axios";
import AdsSlider from "../components/Sliders/AdsSlider";
import { useCookies } from "react-cookie";
import BestSellerSlider from "../components/Sliders/BestSellerSlider";
import { toast } from "react-toastify";

// the global state
// import { useGlobalContext } from "../context/ProductsContext";

export default function Home() {
  const [cookies, setCookies, removeCookie] = useCookies(["User"]);

  /* ///////////////////////////////////////////////////////
      the fetched products from the global state & loading
      variable that indicates whether the data has been 
      fetched already or still being fetched:

      this variable will be used as follow:
      {loading && <LoadingComponent />}
      {!loading && <ProductsComponent>}
      OR
      if (loading) return <LoadingComponent />
      return <ProductsComponent />
     ///////////////////////////////////////////////////////
   */

  //  THAT IS HOW TO ACCESS ANYTHING FROM THE GLOBAL STATE
  // const { loading, products } = useGlobalContext();

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${cookies.User._id}`,
          {
            headers: { Authorization: cookies.UserToken }
          }
        );
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
    <div className="px-12">
      <AdsSlider />
      <OtherServices />
      <Circles />
      <NewArrivalsSlider />
      <Categories />
      <DealsSlider />
      <BestSellerSlider />
    </div>
  );
}
