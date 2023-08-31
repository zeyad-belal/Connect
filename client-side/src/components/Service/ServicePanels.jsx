/* eslint-disable react/prop-types */
import { useState } from "react";
import ServiceExtrasPanel from "./ServiceExtrasPanel"
import ServiceReviewsPanel from "./ServiceReviewsPanel";

const ServicePanels = ({ service ,setExtrasCost,setExtrasTime }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";

  return (
    <>
      <section className="p-5 ">
        <div className="tabs flex justify-start">
          <button
            className={`tab ${checkActive(1, "active")}`}
            onClick={() => handleClick(1)}>
            Service Extras
          </button>
          <button
            className={`tab ${checkActive(2, "active")}`}
            onClick={() => handleClick(2)}
          >
            Reviews ({service.reviews.length})
          </button>
        </div>
        <div className="panels">
          <ServiceExtrasPanel service={service} checkActive={checkActive} setExtrasCost={setExtrasCost} setExtrasTime={setExtrasTime} />
          <ServiceReviewsPanel service={service} checkActive={checkActive} />
        </div>
      </section>
    </>
  );
};

export default ServicePanels;
