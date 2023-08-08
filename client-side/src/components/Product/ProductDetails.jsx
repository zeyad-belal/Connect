/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Counter from "../Counter";
import { CartIcon, FilledRatingStarIcon } from "../Icons";
import {
  BestSellerBadge,
  NewArrivalBadge,
  RatingBadge,
  SaleBadge
} from "../Badges";

const ProductDetails = ({
  count,
  handleCounterDecrement,
  handleCounterIncrement,
  handleAddItemToCart,
  product
}) => {
  return (
    <>
      <div className="md:max-w-[50%] min-w-0">
        <div className="border-b pb-4">
          {/* Tags */}
          <div className="flex flex-wrap">
            {product.bestseller && <BestSellerBadge />}

            {product.new_arrival && <NewArrivalBadge />}

            {product.new_price !== 0 && <SaleBadge />}
          </div>
          <a href="#brand">
            <div className="uppercase text-lg text-gray-400">
              {product.brand}
            </div>
          </a>
          <h1 className="text-2xl mb-4 text-gray-800">{product.name}</h1>
          {product.avg_rating && (
            <div className="flex items-center">
              <RatingBadge avg_rating={product.avg_rating}></RatingBadge>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
              <a
                href="#reviews"
                className="text-md mb-[2px] font-medium text-gray-900 underline hover:no-underline"
              >
                {product.reviews.length} reviews
              </a>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-5 border-b py-4">
          <div className="flex items-end gap-2 text-gray-800">
            <span>Now:</span>
            {!product.new_price && (
              <div className="text-xl font-bold whitespace-nowrap">
                EGP {product.price}
              </div>
            )}
            {product.new_price !== 0 && (
              <>
                <div className="line-through text-gray-400 text-xs font-bold whitespace-nowrap">
                  EGP {product.price}
                </div>
                <div className="text-xl font-bold mr-5 whitespace-nowrap">
                  EGP {product.new_price}
                </div>
              </>
            )}
          </div>
          {product.stock_count > 5 && (
            <span className="text-green-600 font-semibold whitespace-nowrap">
              In Stock
            </span>
          )}
          {product.stock_count != 0 && product.stock_count <= 5 && (
            <span className="text-red-600 font-semibold whitespace-nowrap">
              Only {product.stock_count} Left
            </span>
          )}
          {product.stock_count == 0 && (
            <span className="text-red-600 font-semibold whitespace-nowrap">
              Out of Stock
            </span>
          )}
        </div>
        {product.stock_count > 0 && (
          <div className="flex items-center gap-4 py-4">
            <Counter
              count={count}
              handleCounterDecrement={handleCounterDecrement}
              handleCounterIncrement={handleCounterIncrement}
            />
            <button
              onClick={() => handleAddItemToCart(product)}
              type="button"
              className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
            >
              <CartIcon></CartIcon>
              Add to Cart
            </button>
          </div>
        )}
        {product.stock_count == 0 && (
          <div className="flex items-center gap-4 py-4">
            <button
              type="button"
              className="text-white bg-orange-400 cursor-not-allowed font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center"
              disabled
            >
              <CartIcon></CartIcon>
              Add to Cart{" "}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
