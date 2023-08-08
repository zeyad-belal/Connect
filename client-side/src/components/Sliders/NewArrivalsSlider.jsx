/* eslint-disable react/prop-types */
import Slider from "../../UI/Slider";
import { useGlobalContext } from "../../context/ProductsContext";

function NewArrivalsSlider() {
  const { products } = useGlobalContext();

  const filteredProducts = products.filter((product) => product.new_arrival);
  
  return (
    <div className="my-12 mx-5 sm:mx-12">
      <h1 className="font-bold text-3xl">New Arrivals</h1>
      <Slider products={filteredProducts} />
    </div>
  );
}

export default NewArrivalsSlider;
