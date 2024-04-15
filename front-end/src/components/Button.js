import React, { ReactNode } from "react";
import Loading from "@/components/Loading";

const Button = ({ children, className, isLoading, onClick }) => {
  const buttonClasses = `relative flex items-center justify-center gap-4 px-8 py-3 w-[90vw] xs:w-[343px] h-[48px] rounded-full font-medium text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 transition-colors duration-300 ease-in-out ${className}`;

  return (
    <button className={buttonClasses} onClick={onClick} disabled={isLoading}>
      {children}
      {isLoading && (
        <div className="absolute right-6">
          <Loading />
        </div>
      )}
    </button>
  );
};

export default Button;
