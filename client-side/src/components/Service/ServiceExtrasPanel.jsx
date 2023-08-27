/* eslint-disable react/prop-types */
const ServiceExtrasPanel = ({ service, checkActive }) => {
  const extrasArr = Object.entries(service.extras);
  return (
    <>
      <div className={`panel ${checkActive(1, "active")}`}>
        <div className="flex  items-center py-5">
                {extrasArr.map((extra) => (
                  <tr
                    key={extra[0]}
                    className="even:bg-orange-200 odd:bg-gray-50 flex ">
                    {extra[0]}
                    {extra[1]}
                    {extra[2]}
                  </tr>
                ))}

        </div>
      </div>
    </>
  );
};

export default ServiceExtrasPanel;
