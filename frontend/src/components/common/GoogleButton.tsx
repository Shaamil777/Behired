import React from "react";
import GoogleIcon from "../../assets/icons/Google.png"; 

interface GoogleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ text = "Google", ...props }) => {
  return (
    <button
  type="button"
  className="w-full flex items-center justify-center border border-gray-300 bg-white text-gray-700 py-3 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150 ease-in-out"
  {...props}
>
  <img src={GoogleIcon} alt="Google" className="w-5 h-5 mr-3" />
  {text}
</button>

  );
};

export default GoogleButton;
