import React, { useState } from 'react';
import { BiLogOut } from "react-icons/bi";
import api from "../utils/axios";

const logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await api.post("/user/logout");
      localStorage.removeItem("ChatAppUser");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-auto">
      {!loading ? (
        <div 
          onClick={handleLogout}
          className="flex items-center cursor-pointer gap-2 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          {/* Icon - Thoda Redish kiya taaki logout vali feel aaye */}
          <BiLogOut className="w-6 h-6 text-red-500" />
          
          {/* Text - Ab user ko saaf dikhega */}
          <span className="text-white font-medium text-lg">Logout</span>
        </div>
      ) : (
        <span className="loading loading-spinner text-white"></span>
      )}
    </div>
  );
};

export default logout;