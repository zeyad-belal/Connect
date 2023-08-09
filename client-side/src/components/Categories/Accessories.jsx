import { Link } from "react-router-dom";

const Accessories = () => {
  return (
    <>
<div className="flex flex-wrap w-3/4 justify-between">
    {/* /////////////////////// Headers //////////////////////////// */}
  <div className="p-4 m-auto w-full md:w-1/3">
    <Link className="flex justify-between items-center" to={"./services?brand=Apple&category=Accessories&orderBy=newArrival"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Apple</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/3">
    <Link className="flex justify-between items-center" to={"./services?brand=Samsung&category=Accessories&orderBy=newArrival"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Samsung</span>
    </Link>
  </div>
  <div className="p-4 m-auto w-full md:w-1/3">
    <Link className="flex justify-between items-center" to={"./services?brand=Sony&category=Accessories&orderBy=newArrival"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Sony </span>
    </Link>
  </div>
  <div className="p-4  w-full md:w-1/3">
    <Link className="flex  " to={"./services?brand=Xiaomi&category=Accessories&orderBy=newArrival"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Xiaomi</span>
    </Link>
  </div>

  </div>
    </>
  );
};

export default Accessories;