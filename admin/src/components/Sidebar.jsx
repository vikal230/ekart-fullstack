import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";
import { SiTicktick } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let [loadingRoute, setLoadingRoute] = useState("");

  useEffect(() => {
    setLoadingRoute("");
  }, [location.pathname]);

  const handleNavigate = (path) => {
    setLoadingRoute(path);
    navigate(path);
  };

  return (
    <div className="w-[18%] min-h-[100vh] border-r border-gray-200 bg-white py-[60px] fixed left-0 top-0 mt-18">
      <div className="flex flex-col gap-4 pt-[40px] pl-[10%] md:pl-[15%] text-[15px]">

        <div 
          className={`flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-4 py-3 cursor-pointer text-gray-700 transition-all rounded-l-lg ${location.pathname === "/" ? "bg-gray-100 text-black" : "hover:bg-gray-100 hover:text-black"}`} 
          onClick={() => handleNavigate("/")}
        >
          {loadingRoute === "/" ? (
            <div className="w-[22px] h-[22px] rounded-full border-2 border-gray-400 border-t-transparent animate-spin"></div>
          ) : (
            <FaHome className="w-[22px] h-[22px] text-gray-600" />
          )}
          <p className="hidden md:block font-medium">
            {loadingRoute === "/" ? "Loading..." : "Home"}
          </p>
        </div>
        
        {/* Add Items Section */}
        <div 
          className={`flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-4 py-3 cursor-pointer text-gray-700 transition-all rounded-l-lg ${location.pathname === "/add" ? "bg-gray-100 text-black" : "hover:bg-gray-100 hover:text-black"}`} 
          onClick={() => handleNavigate("/add")}
        >
          {loadingRoute === "/add" ? (
            <div className="w-[22px] h-[22px] rounded-full border-2 border-gray-400 border-t-transparent animate-spin"></div>
          ) : (
            <IoAddCircle className="w-[25px] h-[25px] text-gray-600" />
          )}
          <p className="hidden md:block font-medium">
            {loadingRoute === "/add" ? "Loading..." : "Add Items"}
          </p>
        </div>

        {/* Lists Items Section */}
        <div 
          className={`flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-4 py-3 cursor-pointer text-gray-700 transition-all rounded-l-lg ${location.pathname === "/lists" ? "bg-gray-100 text-black" : "hover:bg-gray-100 hover:text-black"}`} 
          onClick={() => navigate("/lists")}
        >
          <LiaClipboardListSolid className="w-[25px] h-[25px] text-gray-600" />
          <p className="hidden md:block font-medium">Lists Items</p>
        </div>

        {/* View Orders Section */}
        <div 
          className={`flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-4 py-3 cursor-pointer text-gray-700 transition-all rounded-l-lg ${location.pathname === "/Orders" ? "bg-gray-100 text-black" : "hover:bg-gray-100 hover:text-black"}`} 
          onClick={() => navigate("/Orders")}
        >
          <SiTicktick className="w-[22px] h-[22px] text-gray-600" />
          <p className="hidden md:block font-medium">View Orders</p>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
