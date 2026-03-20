import React from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import { useEffect } from "react";
import axios from "axios"

const Lists = () => {
  let [list, setList] = useState([]);
  let { serverUrl } = useContext(authDataContext);

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      setList(result.data);
    } catch (error) {
      console.log("product list fetch error", error);
    }
  };

  const removeList = async (id) => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true },
      );

      if (result.data) {
        fetchList();
      } else {
        console.log("fail to remove product!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gray-50 text-gray-800 overflow-x-hidden relative">
      <Nav />
      <div className="w-[100%] h-[100%] flex items-center justify-start">
        <Sidebar />
        <div className="w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[20px] overflow-x-hidden py-[50px] ml-[100px] px-4">
          
          <div className="w-full text-[28px] md:text-[35px] mb-[20px] text-gray-900 font-bold border-b border-gray-200 pb-4">
            All Products List
          </div>

          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                className="w-[95%] md:h-[120px] h-auto bg-white border border-gray-200 rounded-xl flex items-center justify-start gap-[15px] md:gap-[30px] p-[10px] md:px-[20px] shadow-sm hover:shadow-md transition-all"
                key={index}
              >
                <img
                  src={item.image2}
                  alt={item.name}
                  className="w-[80px] md:w-[100px] h-[80px] md:h-[100px] rounded-lg object-contain bg-gray-50 border border-gray-100"
                />
                
                <div className="flex-1 flex flex-col items-start justify-center gap-[4px]">
                  <div className="w-[100%] md:text-[20px] text-[16px] text-gray-900 font-semibold">
                    {item.name}
                  </div>
                  <div className="md:text-[16px] text-[14px] text-gray-500 italic">
                    {item.category}
                  </div>
                  <div className="md:text-[18px] text-[16px] text-gray-900 font-bold">
                    ₹{item.price}
                  </div>
                </div>

                <div className="w-[50px] h-full flex items-center justify-center">
                  <span
                    className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 cursor-pointer border border-gray-200 transition-all font-bold"
                    onClick={() => removeList(item._id)}
                  >
                    X
                  </span>
                </div>
              </div>
            ))
          ) : (
            // No Products Empty State
            <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-6">
              <div className="relative flex items-center justify-center">
                <div className="w-24 h-24 border-4 border-dashed border-gray-300 rounded-full animate-spin"></div>
                <div className="absolute w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <p className="text-gray-400 text-xl font-medium tracking-wide">
                NO PRODUCTS FOUND
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lists;