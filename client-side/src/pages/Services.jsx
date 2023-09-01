/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { useSearchParams } from "react-router-dom";
import PaginatedItems from "../components/Service/PaginatedItems";
import { useSelector } from "react-redux";

const Services = () => {
  const allServices = useSelector((state) => state.services.services);
  const [filteredServices, setfilteredServices] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (allServices) {
      // filter Services
      let filtered = null;

      if (searchParams.get("orderBy") && searchParams.get("orderBy") === "rating") {
        const allServicesCopy = [...allServices];
        filtered = allServicesCopy.sort((a, b) => b.avg_rating - a.avg_rating);

      }
      // console.log("before", filtered);

      if (searchParams.get("category") !== "All") {
        filtered = (filtered ? filtered : allServices).filter((service) => {
          if (isInPriceRange(service) && hasMatchCategory(service)) {
            return service;
          }
        });
      } else if (searchParams.get("category") === "All") {
        filtered = (filtered ? filtered : allServices).filter((service) => {
          if (isInPriceRange(service)) {
            return service;
          }
        });
      } else {
        filtered = (filtered ? filtered : allServices).filter((service) => {
          if (isInPriceRange(service) && hasMatchCategory(service)) {
            return service;
          }
        });
      }
      
      setfilteredServices(filtered);
    }
  }, [allServices, searchParams]);

  const hasMatchCategory = (service) => {
    let matchCategory = true;
    if (searchParams.get("category")) {
      matchCategory =
        searchParams.get("category") &&
        service.category_id.category_name === searchParams.get("category");
    }
    return matchCategory;
  };

  const isInPriceRange = (service) => {
    const minPrice = searchParams.get("min");
    const maxPrice = searchParams.get("max");
    let inPriceRange = true;

    if (minPrice && !maxPrice) {
      inPriceRange = service.price >= minPrice ? true : false;
    } else if (!minPrice && maxPrice) {
      inPriceRange = service.price <= maxPrice ? true : false;
    } else if (minPrice && maxPrice) {
      inPriceRange =
        service.price >= minPrice && service.price <= maxPrice ? true : false;
    }
    return inPriceRange;
  };

  return (
    <>
      <div className="w-full flex relative">
        <Filter />

        {/* Render your services using the filtered services */}
        <div>
        {filteredServices && filteredServices?.length !== 0 && (
            <PaginatedItems filteredServices={filteredServices} />
          )}
        </div>
      </div>
    </>
  );
};

export default Services;
