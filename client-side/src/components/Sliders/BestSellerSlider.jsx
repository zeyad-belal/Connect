/* eslint-disable react/prop-types */
import Slider from "../../UI/Slider";
import { useGlobalContext } from "../../context/ServicesContext";

function BestSellerSlider() {
  const { services } = useGlobalContext();
  // here filter the services to get only the services that have deals,
  // and send the filtered services as a prop to the Slider component

  const filteredServices = services.filter((service) => service.best_seller);
  return (
    <div className="my-5 mx-5 sm:mx-12 ">
      <h1 className="font-bold text-3xl">Best Sellers</h1>
      <Slider services={filteredServices} />
    </div>
  );
}

export default BestSellerSlider;
