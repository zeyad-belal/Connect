import {
  BsFillFileEarmarkCodeFill,
  BsShop,
  BsFillArrowRightCircleFill
} from "react-icons/bs";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { GiUpgrade } from "react-icons/gi";

function TechServices() {
  return (
    <div className="mx-12">
      <div className="max-w-[1000px] mx-auto my-12 flex flex-justify-center ">
        <img
          src="/mainbanner_en.jpg"
          alt=""
          className="max-w-full mx-2 block "
        />
      </div>
      <h1 className="font-semibold text-[28px] mx-auto  w-fit">Our Services</h1>
      {/* -------------------------------------------------------------------------- */}
      <div className="card-holder flex flex-col md:flex-row items-center gap-4 justify-around my-12">
        {/* card */}
        <div className="flex flex-col max-w-[270px] items-center text-center mb-6 sm:mb-0">
          <BsFillFileEarmarkCodeFill
            size={50}
            color="#f37020"
            className="mb-3"
          />
          <h2 className="font-medium text-[18px]">Software</h2>
          <p className="text-[14px] text-gray-600">
            Solve Software Technical Issues For aptop And Mobile Different
            Operating Systems (Microsoft Windows , Mac ,S Android And IOS).
          </p>
        </div>
        {/* card */}
        <div className="flex flex-col max-w-[270px] items-center text-center mb-6 sm:mb-0">
          <MdOutlineMiscellaneousServices
            size={50}
            color="#f37020"
            className="mb-3"
          />
          <h2 className="font-medium text-[18px]">Hardware</h2>
          <p className="text-[14px] text-gray-600">
            Repairing Laptops , Mobiles, TVs.
          </p>
        </div>
        {/* card */}
        <div className="flex flex-col max-w-[270px] items-center text-center">
          <GiUpgrade size={50} color="#f37020" className="mb-3" />
          <h2 className="font-medium text-[18px]">Upgrading</h2>
          <p className="text-[14px] text-gray-600">
            Upgrading Laptop Hardware ( SSD Hard Drive , RAM).
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------- */}

      {/*------------------------------- addresses ----------------------------------------------------- */}
      <div
        style={{ backgroundColor: "#fef9f0" }}
        className="my-7 px-12 py-5 max-w-[1500px] mx-auto rounded-lg"
      >
        <h1 className="font-semibold text-[27px] mx-auto w-fit ">
          Choose Your Nearest Store
        </h1>
        <div className="card-holder flex flex-wrap justify-around pt-9 gap-3">
          {/* card */}
          <div className="flex gap-4 max-w-[230px] ">
            <BsShop size={70} color="#f37020" />
            <div className="content">
              <h2 className="font-medium text-[18px]">City Center, Almazaha</h2>
              <p className="text-[14px] text-gray-600">
                City Center Almaza, Suez Rd, Sheraton Al Matar, Nasr City, Cairo
                Governorate
              </p>
              <div className="flex items-center gap-1 font-light">
                <a
                  className="text orange"
                  href="https://www.google.com/maps/place/%D9%82%D8%B4%D9%84%D8%A7%D9%82+%D8%A7%D9%84%D8%B3%D9%88%D8%A7%D8%AD%D9%84%E2%80%AD/@31.2727884,32.2895024,16.04z/data=!4m6!3m5!1s0x14f99d63e3214d8d:0x1a3daf1fc216918c!8m2!3d31.2730414!4d32.287022!16s%2Fg%2F11sppbsp4s?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  address
                </a>
                <BsFillArrowRightCircleFill />
              </div>
            </div>
          </div>
          {/* ------------------------------------------------------- */}
          {/* card */}
          <div className="flex gap-4 max-w-[230px] ">
            <BsShop size={70} color="#f37020" />
            <div className="content">
              <h2 className="font-medium text-[18px]">Smoha</h2>
              <p className="text-[14px] text-gray-600">
                23 El Oroba Palace Tower, Fawzi Moaz Street, Sharq District,
                Alexandria,
              </p>
              <div className="flex items-center gap-1 font-light">
                <a
                  className="text orange"
                  href="https://www.google.com/maps/place/%D9%82%D8%B4%D9%84%D8%A7%D9%82+%D8%A7%D9%84%D8%B3%D9%88%D8%A7%D8%AD%D9%84%E2%80%AD/@31.2727884,32.2895024,16.04z/data=!4m6!3m5!1s0x14f99d63e3214d8d:0x1a3daf1fc216918c!8m2!3d31.2730414!4d32.287022!16s%2Fg%2F11sppbsp4s?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  address
                </a>
                <BsFillArrowRightCircleFill />
              </div>
            </div>
          </div>
          {/* ------------------------------------------------------- */}
          {/* card */}
          <div className="flex gap-4 max-w-[230px] ">
            <BsShop size={70} color="#f37020" />
            <div className="content">
              <h2 className="font-medium text-[18px]">Miami</h2>
              <p className="text-[14px] text-gray-600">
                8 Iskandar Ibrahim, Sidi Beshr Bahri, Montaza 2, Alexandria
                Governorate,
              </p>
              <div className="flex items-center gap-1 font-light">
                <a
                  className="text orange"
                  href="https://www.google.com/maps/place/%D9%82%D8%B4%D9%84%D8%A7%D9%82+%D8%A7%D9%84%D8%B3%D9%88%D8%A7%D8%AD%D9%84%E2%80%AD/@31.2727884,32.2895024,16.04z/data=!4m6!3m5!1s0x14f99d63e3214d8d:0x1a3daf1fc216918c!8m2!3d31.2730414!4d32.287022!16s%2Fg%2F11sppbsp4s?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  address
                </a>
                <BsFillArrowRightCircleFill />
              </div>
            </div>
          </div>
          {/* ------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
}

export default TechServices;

// #fef9f0
