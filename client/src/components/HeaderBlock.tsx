import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderBlock() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // logout();
    navigate("/");
  };

  return (
    <div className="bg-light_green/50 p-6 h-[76px] flex justify-end items-center">
      <button 
        onClick={handleLogout}
        className="bg-dark1 text-white px-4 py-2 rounded hover:bg-dark_green transition-colors"
      >
        Logout
      </button>
    </div>
  );
}