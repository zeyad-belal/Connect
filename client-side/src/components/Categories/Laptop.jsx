import { Link } from "react-router-dom";

const Laptop = () => {
  return (
    <>
      <div className="flex w-3/4  flex-row  flex-wrap  justify-between ">
        <div className=" p-4 m-auto w-full md:w-1/3">
          <Link className="flex justify-between items-center  " to={"./services?brand=Apple&category=Laptops&orderBy=bestSeller"}>
            
            <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap" >Apple</span>
          </Link>
        </div>
        <div className="p-4 m-auto w-full md:w-1/3">
          <Link className="flex justify-between items-center  " to={"./services?brand=Acer&category=Laptops&orderBy=bestSeller"}>
            
          <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Acer</span>
          </Link>
        </div>
        <div className="p-4 m-auto w-full md:w-1/3">
          <Link className="flex justify-between items-center" to={"./services?brand=Asus&category=Laptops&orderBy=bestSeller"}>
            
          <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Asus</span>
          </Link>
        </div>
        <div className="p-4 m-auto w-full md:w-1/3">
          <Link className="flex justify-between items-center  " to={"./services?brand=Dell&category=Laptops&orderBy=bestSeller"}>
            
          <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Dell</span>
          </Link>
        </div>
        <div className="p-4 m-auto w-full md:w-1/3">
          <Link className="flex justify-between items-center " to={"./services?brand=HP&category=Laptops&orderBy=bestSeller"}>
          
          <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">HP</span>
          </Link>
        </div>
        <div className="p-4 m-auto w-full md:w-1/3">
          <Link className="flex justify-between items-center " to={"./services?brand=Lenovo&category=Laptops&orderBy=bestSeller"}>
            
          <span className="m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">Lenovo</span>
          </Link>
        </div>
        <div className="p-4   md:w-1/3">
          <Link className="flex justify-between items-center " to={"./services?brand=MSI&category=Laptops&orderBy=bestSeller"}>
            
          <span className=" m-auto uppercase hover:text-orange-500  tracking-wider text-sm whitespace-nowrap">MSI</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Laptop;
