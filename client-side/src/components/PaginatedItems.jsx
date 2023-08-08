/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductsItem from "./Product/ProductsItem";


function PaginatedItems({ filteredProducts }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentItems.map((item, index) => (
          <ProductsItem key={index} item={item} />
        ))}
      </div>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center py-10"
        pageClassName="mx-2 py-2 px-4 rounded hover:bg-orange-500 transition duration-100"
        previousClassName="mx-2 py-2 px-4 rounded transition duration-100"
        nextClassName="mx-2 py-2 px-4 rounded transition duration-100"
        activeClassName="bg-orange-500 hover:bg-orange-500 text-white"
        disabledClassName="text-gray-400 cursor-default"
        initialPage={0}
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;
