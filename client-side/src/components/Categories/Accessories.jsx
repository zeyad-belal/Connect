import { Link } from "react-router-dom";

const Accessories = () => {
  return (
    <>
<div className="flex flex-wrap w-3/4 justify-between">
    {/* /////////////////////// Headers //////////////////////////// */}
  <div className="p-4 m-auto w-full md:w-1/3">
    <Link className="flex justify-between items-center" to={"./services?category=Accessories"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Apple</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/3">
    <Link className="flex justify-between items-center" to={"./services?category=Accessories"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Samsung</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/3">
    <Link className="flex justify-between items-center" to={"./services?category=Accessories"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Sony </span>
    </Link>
  </div>
  <div className="p-4  w-full md:w-1/3">
    <Link className="flex  " to={"./services?category=Accessories"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Xiaomi</span>
    </Link>
  </div>

  </div>
    </>
  );
};

export default Accessories;