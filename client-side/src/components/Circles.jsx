import { Link } from "react-router-dom";

import Circle from "./Circle";

function Circles() {
  return (

    <>
      <div className="flex justify-center items-center mx-5 my-5">
        <div className="flex flex-wrap justify-center gap-5  sm:gap-12 max-w-7xl">
          <Link to="/products?orderBy=bestSeller">
            <Circle
              srcImg={"/circles-images/best-sellers.png"}
              title={"Best Sellers"}
            />
          </Link>

          <Link to="/products?orderBy=newArrivals">
            <Circle
              srcImg={"/circles-images/new-arrivals.png"}
              title={"New Arrivals"}
            />
          </Link>

          <Link to="/products?orderBy=hasOffer">
            <Circle srcImg={"/circles-images/offers.png"} title={"Offers"} />
          </Link>

          <Link to="/products?category=TVs">
            <Circle srcImg={"/circles-images/tvs.png"} title={"TVs"} />
          </Link>

          <Link to="/products?category=Laptops">
            <Circle srcImg={"/circles-images/laptops.png"} title={"Laptops"} />
          </Link>
          <Link to="/products?category=Mobiles">
            <Circle srcImg={"/circles-images/mobiles.png"} title={"Mobiles"} />
          </Link>
          <Link to="/products?category=Gaming">
            <Circle srcImg={"/circles-images/gaming.png"} title={"Gaming"} />
          </Link>
          <Link to="/products?category=Accessories">
            <Circle
              srcImg={"/circles-images/accessories.png"}
              title={"Accessories"}
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Circles;
