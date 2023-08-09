import { useState } from "react";
import ServiceInfoPanel from "./ServiceInfoPanel";
import ServiceReviewsPanel from "./ServiceReviewsPanel";

const ServicePanels = ({ service }) => {
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
            Service Info
          </button>
          <button
            className={`tab ${checkActive(2, "active")}`}
            onClick={() => handleClick(2)}
          >
            Reviews ({service.reviews.length})
          </button>
        </div>
        <div className="panels">
          <ServiceInfoPanel service={service} checkActive={checkActive} />
          <ServiceReviewsPanel service={service} checkActive={checkActive} />
        </div>
      </section>
    </>
  );
};

export default ServicePanels;
