/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import PaginatedItems from "../components/PaginatedItems";

const Products = () => {
  const [allProducts, setAllProducts] = useState(null);
  const [filteredProducts, setfilteredProducts] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // get all products
    const getAllProducts = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`
      );
      // set all products
      setAllProducts(data);
    };

    getAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts) {
      // filter products
      let filtered = null;

      if (searchParams.get("orderBy")) {
        if (searchParams.get("orderBy") === "bestSeller") {
          filtered = allProducts.sort((a, b) => b.best_seller - a.best_seller);
        } else if (searchParams.get("orderBy") === "newArrival") {
          filtered = allProducts.sort((a, b) => b.new_arrival - a.new_arrival);
        } else if (searchParams.get("orderBy") === "hasOffer") {
          filtered = allProducts.sort((a, b) => b.new_price - a.new_price);
        }
      }
      // console.log("before", filtered);

      if (
        searchParams.get("brand") === "All" &&
        searchParams.get("category") !== "All"
      ) {
        filtered = (filtered ? filtered : allProducts).filter((product) => {
          if (isInPriceRange(product) && hasMatchCategory(product)) {
            return product;
          }
        });
      } else if (
        searchParams.get("category") === "All" &&
        searchParams.get("brand") !== "All"
      ) {
        filtered = (filtered ? filtered : allProducts).filter((product) => {
          if (hasMatchBrand(product) && isInPriceRange(product)) {
            return product;
          }
        });
      } else if (
        searchParams.get("category") === "All" &&
        searchParams.get("brand") === "All"
      ) {
        filtered = (filtered ? filtered : allProducts).filter((product) => {
          if (isInPriceRange(product)) {
            return product;
          }
        });
      } else {
        filtered = (filtered ? filtered : allProducts).filter((product) => {
          if (
            hasMatchBrand(product) &&
            isInPriceRange(product) &&
            hasMatchCategory(product)
          ) {
            return product;
          }
        });
      }
      // console.log(filtered);
      setfilteredProducts(filtered);
    }
  }, [allProducts, searchParams]);

  const hasMatchCategory = (product) => {
    let matchCategory = true;
    if (searchParams.get("category")) {
      matchCategory =
        searchParams.get("category") &&
        product.category_id.category_name === searchParams.get("category");
    }
    return matchCategory;
  };

  const hasMatchBrand = (product) => {
    let matchBrand = true;
    if (searchParams.get("brand")) {
      matchBrand =
        searchParams.get("brand") &&
        product.brand_id.brand_name === searchParams.get("brand");
    }

    return matchBrand;
  };

  const isInPriceRange = (product) => {
    const minPrice = searchParams.get("min");
    const maxPrice = searchParams.get("max");
    let inPriceRange = true;

    if (minPrice && !maxPrice) {
      inPriceRange = product.price >= minPrice ? true : false;
    } else if (!minPrice && maxPrice) {
      inPriceRange = product.price <= maxPrice ? true : false;
    } else if (minPrice && maxPrice) {
      inPriceRange =
        product.price >= minPrice && product.price <= maxPrice ? true : false;
    }
    return inPriceRange;
  };

  return (
    <>
      <div className="w-full flex relative">
        <Filter />

        {/* Render your products using the filtered products */}
        <div>
          {filteredProducts && filteredProducts?.length !== 0 && (
            <PaginatedItems filteredProducts={filteredProducts} />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
