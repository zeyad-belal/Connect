/* eslint-disable react/prop-types */
import Slider from '../../UI/Slider'
import { useGlobalContext } from '../../context/ProductsContext';

function BestSellerSlider() {

  const { products } = useGlobalContext();
  // here filter the products to get only the products that have deals,
  // and send the filtered products as a prop to the Slider component

  const filteredProducts = products.filter(
    (product) => product.best_seller 
  );
  return (
    <div className="my-5 mx-5 sm:mx-12 ">
    <h1 className='font-bold text-3xl'>Best Sellers</h1>
    <Slider  products={filteredProducts} />
    </div>
  )
}

export default BestSellerSlider