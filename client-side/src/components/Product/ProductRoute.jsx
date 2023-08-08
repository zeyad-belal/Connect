import { Link } from "react-router-dom";

import { HomeIcon, RightArrowIcon } from "../Icons";

const ProductRoute = ({ product }) => {
  // console.log(product);
  return (
    <>
      <div className="flex flex-wrap text-sm font-bold text-gray-800 lg:justify-center lg:items-center p-5">
        <Link to="/">
          <HomeIcon />
        </Link>

        <RightArrowIcon />

        <Link to={`/products?category=${product.category_id.category_name}`}>
          <span className="pb-[2px]">{product.category_id.category_name}</span>
        </Link>

        <RightArrowIcon />

        <span className="pb-[2px] break-words">{product.name}</span>
      </div>
    </>
  );
};

export default ProductRoute;
