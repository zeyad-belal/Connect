/* eslint-disable no-unused-vars */
import { useState } from "react";

/* eslint-disable react/prop-types */
const ServiceExtrasPanel = ({ service, checkActive ,setExtrasCost }) => {
  const [checkedExtras, setCheckedExtras] = useState([]);

  const handleExtras = (e, extraCost) => {
    const extraName = e.target.name;

    if (e.target.checked) {
      setCheckedExtras((prevChecked) => [...prevChecked, { name: extraName, cost: extraCost }]);
    } else {
      setCheckedExtras((prevChecked) =>
        prevChecked.filter((extra) => extra.name !== extraName)
      );
    }
  };

  setExtrasCost(+checkedExtras.reduce((acc, extra) => acc + (+extra.cost), 0));

  
  return (
    <>
      <div className={`panel ${checkActive(1, "active")}`}>
        
      {service.extras.map((extra) => (
          <div key={extra[0]} className="border-b py-3 ">
            <label htmlFor={`extra${extra[0]}`} className="text-text1 flex gap-1 cursor-pointer">
              <input
                type="checkbox"
                name={extra[0]} 
                id={`extra${extra[0]}`}
                className="mr-1 cursor-pointer"
                onChange={(e) => handleExtras(e, extra[1])} 
              />
              <span className="text-sm lg:text-md"> {extra[0]} </span>
            </label>

            <p className="text-gray-500 text-xs md:text-sm flex mt-1 ml-5">
              Additional cost of ${extra[1]} on top of the service price.
              Execution timeline will be extended by {extra[2]}.
            </p>
          </div>
        ))}
        
      </div>
    </>
  );
};

export default ServiceExtrasPanel;
