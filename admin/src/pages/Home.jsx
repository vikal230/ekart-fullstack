import React from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import { useEffect } from "react";
import axios from "axios"

const Home = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const { serverUrl } = useContext(authDataContext);

  const fetchCounts = async () => {
    try {
      const products = await axios.get(
        `${serverUrl}/api/product/list`,
        {},
        { withCredentials: true },
      );
      setTotalProducts(products.data.length);

      const orders = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true },
      );
      setTotalOrders(orders.data.length);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gray-50 text-gray-800 relative overflow-x-hidden">
      <Nav />
      <Sidebar />
      
      <div className="w-full md:w-[75vw] min-h-[100vh] absolute right-0 flex items-start justify-start flex-col gap-[30px] py-[100px] px-[20px] md:px-[50px]">
        
        {/* Dashboard Title */}
        <div className="border-b border-gray-200 w-full pb-4">
            <h1 className="text-[28px] md:text-[35px] text-gray-900 font-bold">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm md:text-base">Welcome to ekart management panel.</p>
        </div>

        {/* Stats Container */}
        <div className="flex items-center justify-start gap-[30px] flex-col md:flex-row w-full mt-4">
          
          {/* Total Products Card */}
          <div className="bg-white w-full md:w-[350px] h-[180px] flex items-center justify-center flex-col gap-[15px] rounded-xl shadow-sm border border-gray-200 transition-hover hover:shadow-md">
            <p className="text-gray-500 font-semibold text-[16px] md:text-[18px] uppercase tracking-wider">Total Products</p>
            <span className="text-[35px] md:text-[45px] font-bold text-gray-900">
                {totalProducts}
            </span>
            <div className="w-[40px] h-[4px] bg-sky-600 rounded-full"></div>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white w-full md:w-[350px] h-[180px] flex items-center justify-center flex-col gap-[15px] rounded-xl shadow-sm border border-gray-200 transition-hover hover:shadow-md">
            <p className="text-gray-500 font-semibold text-[16px] md:text-[18px] uppercase tracking-wider">Total Orders</p>
            <span className="text-[35px] md:text-[45px] font-bold text-gray-900">
                {totalOrders}
            </span>
            <div className="w-[40px] h-[4px] bg-yellow-500 rounded-full"></div>
          </div>

        </div>

        <div className="mt-10 p-6 bg-sky-50 border border-sky-100 rounded-xl w-full max-w-[730px]">
            <h2 className="text-sky-800 font-bold mb-2 text-lg">Quick Tip:</h2>
            <p className="text-sky-700 text-sm">Use the sidebar to add new inventory or track customer orders in real-time. Make sure to update the status of orders regularly.</p>
        </div>

      </div>
    </div>
  );
};

export default Home;