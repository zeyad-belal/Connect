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
      // Initialize a copy of all services 
      let filtered = allServices.slice();
  
      if (searchParams.get("orderBy") === "rating") {
        // Sort by rating if specified
        filtered.sort((a, b) => b.avg_rating - a.avg_rating);
      }
  
      // Check if category parameter exists and is not All
      if (searchParams.has("category") && searchParams.get("category") !== "All") {
        filtered = filtered.filter((service) => {
          return hasMatchCategory(service);
        });
      }
  
      // Filter by price range
      filtered = filtered.filter(isInPriceRange);
  
      if (searchParams.has("keyword")) {
        // Check if the keyword parameter exists
        filtered = filtered.filter((service) => {
          const serviceKeywords = service.keywords.join('').split(',');
          return serviceKeywords.includes(searchParams.get("keyword"));
        });
      }
  
      // Update the filtered services state
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
    <div className="bg-primary">
      <div className="w-full flex flex-col md:flex-row relative ">
        <div className="md:max-w-[250px] lg:max-w-[300px]">
        <Filter />
        </div>
        {/* Render your services using the filtered services */}
        <div className="py-12 mt-11 px-2  md:px-7 lg:px-6">
        {filteredServices && filteredServices?.length !== 0 && (
          <PaginatedItems filteredServices={filteredServices} />
        )}
        </div>
      </div>
    </div>
  );
};

export default Services;
