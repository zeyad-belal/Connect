import Counter from "./Counter";

/* eslint-disable react/prop-types */
const CartItem = ({item, onAdd , onRemove}) => {


  return (
    <>
      {/* cart item */}
      <div
        className=" flex justify-between my-1 border-b-[2px] py-1"
        key={item.id}
      >
        <div className="flex">
          <img
            className="max-w-[250px] mr-6"
            src={item.image}
            alt="Image not Found"
          />
          <div className="flex flex-col mr-2">
            <h5 className="text-l font-bold">{item.name}</h5>
            <p className="my-1">details here</p>
      
            <div className="flex gap-2">
              <Counter count={item.amount} handleCounterDecrement={onRemove} handleCounterIncrement={onAdd} />
            </div>
          </div>
        </div>
        <div className=" me-3 ml-10 text-bold flex flex-col justify-between">
          <span> $ { item.amount * item.price }</span>  
          <button className="mb-3  px-1 py-1 text-[13px] font-medium rounded-sm text-red-500 border border-red-500 hover:text-white hover:bg-red-500">delete</button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
