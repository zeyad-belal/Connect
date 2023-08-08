const ProductInfoPanel = ({ product, checkActive }) => {
  const detailsArr = Object.entries(product.details);
  return (
    <>
      <div className={`panel ${checkActive(1, "active")}`}>
        <div className="flex flex-col gap-0 md:gap-10 md:flex-row md:items-start items-center py-5">
          {detailsArr.length <= 5 && (
            <table className="table-fixed text-left p-5 md:w-[50%]">
              <tbody>
                {detailsArr.map((detail) => (
                  <tr
                    key={detail[0]}
                    className="even:bg-orange-200 odd:bg-gray-50"
                  >
                    <th className="w-2/5 pl-4 py-2">{detail[0]}</th>
                    <td className="px-4 py-2">{detail[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* In case details are more than 5 */}
          {detailsArr.length > 5 && (
            <>
              <table className="table-fixed text-left p-5 md:w-[50%]">
                <tbody>
                  {detailsArr
                    .slice(0, Math.ceil(detailsArr.length / 2) + 1)
                    .map((detail) => (
                      <tr
                        key={detail[0]}
                        className="even:bg-orange-200 odd:bg-gray-50"
                      >
                        <th className="w-2/5 pl-4 py-2">{detail[0]}</th>
                        <td className="px-4 py-2">{detail[1]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <table className="table-fixed text-left p-5 md:w-[50%] w-full h-fit">
                <tbody>
                  {detailsArr
                    .slice(
                      Math.ceil(detailsArr.length / 2 + 1),
                      detailsArr.length
                    )
                    .map((detail) => (
                      <tr
                        key={detail[0]}
                        className="odd:bg-orange-200 even:bg-gray-50"
                      >
                        <th className="w-2/5 pl-4 py-2">{detail[0]}</th>
                        <td className="px-4 py-2">{detail[1]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductInfoPanel;
