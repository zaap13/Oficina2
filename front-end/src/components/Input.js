import React from "react";

const Input = ({ className, ...props }) => {
  const inputClasses = `bg-orange-500 text-white placeholder-neutral-200 w-full sm:w-[400px] h-[48px] backdrop-filter backdrop-blur-md rounded-full p-4 ${className}`;

  return <input className={inputClasses} {...props} />;
};

export default Input;
