/* eslint-disable react/prop-types */
import Slider from "../../UI/Slider";
import { useGlobalContext } from "../../context/ServicesContext";

function NewArrivalsSlider() {
  const { services } = useGlobalContext();

  const filteredServices = services.filter((service) => service.new_arrival);

  return (
    <div className="my-12 mx-5 sm:mx-12">
      <h1 className="font-bold text-3xl">New Arrivals</h1>
      <Slider services={filteredServices} />
    </div>
  );
}

export default NewArrivalsSlider;
