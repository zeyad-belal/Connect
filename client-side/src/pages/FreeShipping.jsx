import { BsClock } from "react-icons/bs";

function FreeShipping() {
  return (
    <div className="mx-12 p-1">
      <div
        style={{ backgroundColor: "#fef9f0" }}
        className="max-w-[1000px] rounded-lg md:p-5 sm:p-3  mx-auto flex flex-wrap justify-center my-12 "
      >
        <div className="my-3 content flex flex-col items-start">
          <h1 className="mb-3 font-bold text-[28px]  w-fit"> Shipping </h1>
          <p className="min-w-[270px] max-w-[300px] text-gray-600">
            Because your satisfaction is our priority, we will make sure you
            experience the fastest delivery service wherever you are.
          </p>
        </div>
        <img
          className="mb-3 sm:max-w-[500px]"
          src="/drawkit-transport-scene-1.svg"
          alt=""
        />
      </div>

      <div className="flex flex-wrap justify-center gap-12 my-12 ">
        <div className="max-w-[400px] rounded overflow-hidden shadow-lg m-2 mr-12 p-3">
          <img
            className="max-w-[340px]"
            src="/drawkit-transport-scene-2.svg"
            alt="Card Image"
          />
          <div className="px-6 py-4">
            <h2 className="mb-3 font-bold text-[20px] ">Cairo, Giza & Alex</h2>
            <ul className="list-disc list-inside">
              <p className="flex items-center gap-2">
                <BsClock /> Delivery within 2 business days.
              </p>
              <li className="mt-3 border-t border-gray-300 py-2">
                Free delivery for orders above 300 EGP
              </li>
              <li className="border-t border-gray-300 py-2">
                Large Home Appliances not included .
              </li>
              <li className="border-t border-gray-300 py-2">
                Large Home Appliances shipping fees are 165 EGP .
              </li>
              <li className="border-t border-gray-300 py-2">
                Large Home Appliances shipping fees depend on the product weight
                & delivery destination, you will receive a phone call to confirm
                final shipping fees before your order is shipped.
              </li>
              <li className="border-t border-gray-300 py-2">
                Cash on delivery is not available on large Home Appliances and
                orders above 20,000.
              </li>
              <li className="border-t border-gray-300 py-2">
                Delivery to Cairo, Giza & Alex depends on the availability of
                reaching the requested destination by cars.
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-[400px] rounded overflow-hidden shadow-lg m-2 mr-12 p-3">
          <img
            className="max-w-[380px] my-2"
            src="/drawkit-transport-scene-6.svg"
            alt="Card Image"
          />
          <div className="px-6 py-4">
            <h2 className="mb-3 font-bold text-[20px] ">Outside Cairo</h2>
            <ul className="list-disc list-inside">
              <p className="flex items-center gap-2">
                <BsClock />
                All orders outside Cairo, Giza & Alex
              </p>
              <p> are processed within 5 business days.</p>
              <li className="mt-3 border-t border-gray-300 py-2">
                Large Home Appliances shipping fees depend on the product weight
                & delivery destination, you will receive a phone call to confirm
                final shipping fees before your order is shipped.
              </li>
              <li className="border-t border-gray-300 py-2">
                Cash on delivery is not available on large Home Appliances and
                orders above 20,000.
              </li>
              <li className="border-t border-gray-300 py-2">
                Delivery outside Cairo, Giza & Alex depends on the availability
                of reaching the requested destination by cars.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeShipping;
