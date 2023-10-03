/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Categories from "../components/Categories/Categories";
import HeroSection from "../components/HeroSection";
import MainSection from "../components/MainSection";




export default function Home(props) {


  return (
    <div>
      <HeroSection />
      <Categories />
      <MainSection />
    </div>
  );
}
