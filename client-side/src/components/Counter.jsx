import React, { useState } from "react";

const Counter = ({ count, handleCounterDecrement, handleCounterIncrement }) => {
  return (
    <div className="flex border rounded">
      <button
        className="hover:text-orange-500 px-1"
        onClick={handleCounterDecrement}
      >
        <MinusIcon></MinusIcon>
      </button>
      <p className="py-[7px] px-4 border-r border-l text-bold">{count}</p>
      <button
        className="hover:text-orange-500 px-1"
        onClick={handleCounterIncrement}
      >
        <PlusIcon></PlusIcon>
      </button>
    </div>
  );
};

const PlusIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    </>
  );
};

const MinusIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
      </svg>
    </>
  );
};

export default Counter;
