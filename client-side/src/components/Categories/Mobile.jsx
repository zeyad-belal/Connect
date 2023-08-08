// import { FaApple } from "react-icons/fa";
// import { SiSamsung, SiXiaomi, SiHuawei } from "react-icons/si";
import { Link } from "react-router-dom";

const Mobile = () => {
  return (
    <>
      <div className="flex w-3/4   flex-row flex-wrap  justify-between  ">
        <div className="p-4 m-auto md:w-1/3  ">
          <Link className="flex justify-between items-center" to={"./products?brand=Apple&category=Mobiles&orderBy=bestSeller"}>
            
            <span className=" m-auto uppercase hover:text-orange-500 text-sm tracking-wider">
              Apple
            </span>
            
          </Link>
        </div>
        <div className="p-4 m-auto md:w-1/3   ">
          <Link className="flex justify-between items-center" to={"./products?brand=Samsung&category=Mobiles&orderBy=bestSeller"}>
            
            <span className="m-auto uppercase hover:text-orange-500 text-sm tracking-wider">
              SAMSUNG
            </span>        
          </Link>
        </div>
        <div className="p-4 m-auto md:w-1/3 ">
          <Link className="flex justify-between items-center" to={"./products?brand=OPPO&category=Mobiles&orderBy=bestSeller"}>
            
            <span className="m-auto uppercase hover:text-orange-500 text-sm tracking-wider">
              OPPO
            </span>
            
          </Link>
        </div>
        <div className="p-4  md:w-1/3 ">
          <Link className="flex justify-between items-center" to={"./products?brand=Huawei&category=Mobiles&orderBy=bestSeller"}>
            
            <span className="m-auto uppercase hover:text-orange-500 text-sm  tracking-wider">
              HUAWEI
            </span>
            
          </Link>
        </div>
        

      </div>
    </>
  );
};

export default Mobile;
