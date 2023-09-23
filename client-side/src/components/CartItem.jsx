/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Counter from "./Counter";
import { cartActions } from "./../store/cartSlice"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CartItem = ({item, onAdd , onRemove}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  function handleSellerNavigate(e){
    e.preventDefault()
    e.stopPropagation()
    navigate(`/seller/${item.seller.id}`)
    
  }

  useEffect(()=>{
    !item.seller.avatar ? window.location.reload() : ''
  },[])
  
  return (
    <>
      {/* cart item */}
      <div
        className="text-text1 flex flex-col md:flex-row justify-between items-start px-3 my-1 border-b py-1"
        key={item.id} >
        <div className="flex ">
          <div className="relative h-fit">

          <img
            className="max-w-[180px] md:max-w-[280px] h-auto mr-6 self-center"
            src={item.image}
            alt="Image not Found" />

          {/* ---------seller avatar---------*/}
          <div 
            className="hover:border-2 cursor-pointer  absolute sm:bottom-2 bottom-[7%] w-[25px]
            h-[25px]  left-2  md:w-[30px] md:h-[30px] bg-white  shadow-md rounded-full overflow-hidden"
            onClick={(e)=> handleSellerNavigate(e)} >
            <img
              className="w-full h-full object-cover"
              src={item.seller.avatar}
              alt="User Avatar" />
          </div>
        </div>

          <div className="flex flex-col mr-2">
            <h5 className="text-sm md:text-md lg:text-lg font-semibold text-text1 mb-3">{item.name}</h5>
      
            <div className="flex gap-2">
              <Counter count={item.amount} handleCounterDecrement={onRemove} handleCounterIncrement={onAdd} />
            </div>
            {item.extras[0] && <div className="my-3 text-xs text-gray-500 pb-2">
              <h4 className="text-sm text-gray-600 mb-1">Extras</h4>
              {item.extras.map((extra, index)=>{
                return (
                  <p key={index} >-{extra}</p>
                )
              })}
            </div>}
          </div>
        </div>

        <div className="flex  gap-8 my-5   md:self-center justify-between items-center h-full min-w-[30%]">
          <div className="text-bold ">
            <span>  <span className="md:hidden ">Total:</span>   $ { item.amount * item.price }</span>  
          </div>
          <button className="mb-1  px-1 py-1 text-[13px] font-medium rounded-sm text-red-500 border border-red-500 hover:text-white hover:bg-red-500"
          onClick={()=> dispatch(cartActions.delete(item.id))}
          > delete
          </button>
        </div>

      </div>
    </>
  );
};

export default CartItem;
