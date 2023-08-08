import React, { useState } from "react";
import Review from "./Review";
import ProductInfoPanel from "./ProductInfoPanel";
import ProductReviewsPanel from "./ProductReviewsPanel";

const ProductPanels = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";
  return (
    <>
      <section className="p-5">
        <div className="tabs flex justify-start">
          <button
            className={`tab ${checkActive(1, "active")}`}
            onClick={() => handleClick(1)}
          >
            Product Info
          </button>
          <button
            className={`tab ${checkActive(2, "active")}`}
            onClick={() => handleClick(2)}
          >
            Reviews ({product.reviews.length})
          </button>
        </div>
        <div className="panels">
          <ProductInfoPanel product={product} checkActive={checkActive} />
          <ProductReviewsPanel product={product} checkActive={checkActive} />
        </div>
      </section>
    </>
  );
};

export default ProductPanels;
