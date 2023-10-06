/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

function StatusFilter({handleStatusChange,isMenuOpen,setIsMenuOpen}) {
  let myClasses = isMenuOpen ? 
  "fixed top-0 left-0  md:min-w-[240px] min-w-[180px]  py-6 my-10 px-0  bg-white rounded-sm h-fit z-30 min-h-[100vh]" :
  "hidden md:block md:min-w-[230px] lg:min-w-[280px] max-w-[300px] py-6 my-10 px-2 bg-white rounded-sm h-fit z-30"


  function toggleOverlay(){
    setIsMenuOpen(false)
  }

  return (
    <>
      {isMenuOpen && <div className="fixed top-0 left-0 h-[100%] w-[100%] z-20 bg-black bg-opacity-30"
      onClick={toggleOverlay}
      ></div>}

      <div className={myClasses} >

      <form className="flex flex-col justify-around items-start px-3">
        <label htmlFor="pending" className="text-text1 font-medium flex items-center  cursor-pointer hover:bg-gray-300 w-full text-sm bg-gray-200 rounded-md my-2 py-3  px-2 mb-2">
          <input type="checkbox" id="pending" className="mr-2 w-4 h-4" onChange={handleStatusChange} />
          pending
        </label>
        <label htmlFor="inProgress" className="text-text1 font-medium flex items-center  cursor-pointer hover:bg-gray-300 w-full text-sm bg-gray-200 rounded-md my-2 py-3  px-2 mb-2">
          <input type="checkbox" id="inProgress" className="mr-2 w-4 h-4" onChange={handleStatusChange} />
          in progress
        </label>
        <label htmlFor="delivered" className="text-text1 font-medium flex items-center   cursor-pointer hover:bg-gray-300 w-full text-sm bg-gray-200 rounded-md my-2 py-3  px-2 mb-2">
          <input type="checkbox" id="delivered" className="mr-2 w-4 h-4" onChange={handleStatusChange} />
          delivered
        </label>
        <label htmlFor="canceled" className="text-text1 font-medium flex items-center   cursor-pointer hover:bg-gray-300 w-full text-sm bg-gray-200 rounded-md my-2 py-3  px-2 mb-2">
          <input type="checkbox" id="canceled" className="mr-2 w-4 h-4" onChange={handleStatusChange} />
          canceled
        </label>
      </form>
      </div> 
  </>
  )
}


export default StatusFilter