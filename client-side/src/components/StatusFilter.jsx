/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

function StatusFilter({isMenuOpen}) {
  let myClasses = isMenuOpen ? 
  " md:min-w-[230px] lg:min-w-[280px] max-w-[300px] py-6 my-10 px-5 bg-white rounded-sm h-fit" :
  "hidden md:min-w-[230px] lg:min-w-[280px] max-w-[300px] py-6 my-10 px-5 bg-white rounded-sm h-fit"
  return (
    <>
      <div className={myClasses} >

      <form className="flex flex-col justify-around items-start px-3">
        <label htmlFor="pending" className="text-text1 font-medium  cursor-pointer hover:bg-gray-300 w-full text-sm bg-gray-200 rounded-md my-2 py-3  px-2 mb-2">
          <input type="checkbox" id="pending" className="mr-2 " />
          pending
        </label>
        <label htmlFor="inProgress" className="text-text1 font-medium  cursor-pointer hover:bg-gray-300 w-full text-sm bg-gray-200 rounded-md my-2 py-3  px-2 mb-2">
          <input type="checkbox" id="inProgress" className="mr-2 " />
          in progress
        </label>
        <label htmlFor="waitingForDelivery" className="text-text1 font-medium  cursor-pointer hover:bg-gray-300 w-full text-sm bg-gray-200 rounded-md my-2 py-3  px-2 mb-2">
          <input type="checkbox" id="waitingForDelivery" className="mr-2 " />
          waiting for delivery
        </label>
        <label htmlFor="delivered" className="text-text1 font-medium  cursor-pointer hover:bg-gray-300 w-full text-sm bg-gray-200 rounded-md my-2 py-3  px-2 mb-2">
          <input type="checkbox" id="delivered" className="mr-2 " />
          delivered
        </label>
        <label htmlFor="canceled" className="text-text1 font-medium  cursor-pointer hover:bg-gray-300 w-full text-sm bg-gray-200 rounded-md my-2 py-3  px-2 mb-2">
          <input type="checkbox" id="canceled" className="mr-2 " />
          canceled
        </label>
      </form>
      </div> 
  </>
  )
}


export default StatusFilter