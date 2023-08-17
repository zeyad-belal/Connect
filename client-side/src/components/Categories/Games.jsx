import { Link } from "react-router-dom";

const Games = () => {
  return (
    <>
<div className="flex w-3/4  flex-wrap  ">
<div className="p-4  w-full md:w-1/3">
    <Link className="flex  " to={"./services?category=Accessories&orderBy=hasOffer"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Spirit of Gamer</span>
    </Link>
  </div>
  <div className="p-4  w-full md:w-1/3">
    <Link className="flex  " to={"./services"}>
      <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Playstion</span>
    </Link>
  </div>
    </div>
    </>
  );
};

export default Games;