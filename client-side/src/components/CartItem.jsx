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
            className="max-w-[140px]"
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
        <div className=" me-3 text-bold"> { item.amount * item.price } LE </div>
      </div>
    </>
  );
};

export default CartItem;
