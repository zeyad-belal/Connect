/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Counter from "./Counter";
import { cartActions } from "./../store/cartSlice"
import { useDispatch } from "react-redux";


const CartItem = ({item, onAdd , onRemove}) => {
  const dispatch = useDispatch()

console.log(item)
  return (
    <>
      {/* cart item */}
      <div
        className="text-text1 flex flex-col md:flex-row justify-between items-center my-1 border-b-[2px] py-1"
        key={item.id}
      >
        <div className="flex">
          <img
            className="max-w-[250px] mr-6"
            src={item.image}
            alt="Image not Found"
          />
          <div className="flex flex-col mr-2">
            <h5 className="text-md md:text-lg font-semibold text-text1">{item.name}</h5>
            <p className="my-1">details here</p>
      
            <div className="flex gap-2">
              <Counter count={item.amount} handleCounterDecrement={onRemove} handleCounterIncrement={onAdd} />
            </div>
          </div>
        </div>

        <div className="flex  gap-8 my-3  self-end md:self-center items-center h-full min-w-[30%]">
        <div className="text-bold ">
          <span> $ { item.amount * item.price }</span>  
        </div>
          <button className="mb-1  px-1 py-1 text-[13px] font-medium rounded-sm text-red-500 border border-red-500 hover:text-white hover:bg-red-500"
          onClick={()=> dispatch(cartActions.delete(item.id))}
          >delete
          </button>
        </div>

      </div>
    </>
  );
};

export default CartItem;
