import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", ...props }) => {
  let baseClasses =
    "w-full font-medium py-3 rounded-lg shadow-md transition duration-150 ease-in-out";

  let variantClasses = "";

  switch (variant) {
    case "primary":
      variantClasses = "bg-gray-900 text-white hover:bg-gray-800";
      break;
    case "secondary":
      variantClasses = "bg-gray-200 text-gray-900 hover:bg-gray-300";
      break;
    case "danger":
      variantClasses = "bg-red-600 text-white hover:bg-red-700";
      break;
    default:
      variantClasses = "bg-gray-900 text-white hover:bg-gray-800";
  }

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
