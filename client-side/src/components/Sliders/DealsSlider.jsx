/* eslint-disable react/prop-types */
import Slider from "../../UI/Slider";

import { useGlobalContext } from "../../context/ProductsContext";

/*
  Instead of prop drilling you can access the global state here to get all the 
  products from the database, then filter them to get only the products with
  deals, and finally send the filtered products as props to teh Slider 
  component.

  notice: we always tend to access the global state where we want to use it
  but in this case we separate concerns to filter the data here and only sending
  as a prop the filtered data
*/

function DealsSlider() {
  const { products } = useGlobalContext();
  // here filter the products to get only the products that have deals,
  // and send the filtered products as a prop to the Slider component

  const filteredProducts = products.filter(
    (product) => product.new_price !== 0
  );

  return (
    <div className="mt-5 mx-5 sm:mx-12">
      <h1 className="font-bold text-3xl">Deals</h1>
      <Slider products={filteredProducts} />
    </div>
  );
}

export default DealsSlider;
