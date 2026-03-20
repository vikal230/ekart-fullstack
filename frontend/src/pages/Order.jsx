import React, { useEffect } from "react";
import Title from "../component/Title";
import { useState } from "react";
import { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/authcontext";
import axios from "axios";

const Order = () => {
  let [orderData, setOrderData] = useState([]);
  let { currency } = useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/userorder",
        {},
        { withCredentials: true },
      );

      if (result.data) {
        let allOrdersItem = [];
        result.data.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] p-[20px] pb-[150px] overflow-x-hidden bg-gray-50 mt-[80px]">
      <div className="h-[8%] w-[100%] text-center mt-[20px] mb-[40px]">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      
      <div className="w-[100%] max-w-6xl mx-auto flex flex-col gap-[20px]">
        {orderData.map((item, index) => (
          <div key={index} className="w-[100%] bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 transition-all hover:shadow-md">
            
            <div className="w-[100%] flex flex-col md:flex-row items-center md:items-start gap-6">
              
              <img
                src={item.image3}
                alt={item.name}
                className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-md object-contain bg-gray-100 border border-gray-200 p-2"
              />
              
              {/* Order Details (Center block) */}
              <div className="flex-1 flex flex-col gap-2 w-full text-center md:text-left">
                <p className="text-[20px] md:text-[24px] text-gray-900 font-medium">
                  {item.name}
                </p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mt-1">
                  <p className="text-[16px] md:text-[18px] text-gray-800 font-semibold">
                    {currency} {item.price}
                  </p>
                  <p className="text-[14px] md:text-[16px] text-gray-600">
                    Quantity: <span className="text-gray-800 font-medium">{item.quantity}</span>
                  </p>
                  <p className="text-[14px] md:text-[16px] text-gray-600">
                    Size: <span className="text-gray-800 font-medium">{item.size}</span>
                  </p>
                </div>
                
                <div className="flex flex-col gap-1 mt-2">
                  <p className="text-[14px] md:text-[15px] text-gray-500">
                    Date:{" "}
                    <span className="text-gray-800 font-medium pl-1">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="text-[14px] md:text-[15px] text-gray-500">
                    Payment Method: <span className="text-gray-800 font-medium pl-1 uppercase">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                
                <div className="flex items-center gap-2">
                  <p className="w-2.5 h-2.5 rounded-full bg-green-500"></p>
                  <p className="text-[14px] md:text-[16px] text-gray-700 font-medium">
                    {item.status}
                  </p>
                </div>
                
                <button
                  className="px-5 py-2 md:py-2.5 rounded-md border border-gray-300 bg-white text-gray-700 text-[14px] md:text-[15px] font-medium hover:bg-gray-50 hover:text-black transition-all shadow-sm"
                  onClick={loadOrderData}
                >
                  Track Order
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;