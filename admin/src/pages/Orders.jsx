// import React from "react";
// import Nav from "../components/Nav";
// import Sidebar from "../components/Sidebar";
// import { useContext } from "react";
// import { authDataContext } from "../context/AuthContext";
// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";
// import { SiEbox } from "react-icons/si";

// const Orders = () => {
//   let [orders, setOrders] = useState([]);
//   let { serverUrl } = useContext(authDataContext);

//   const fetchAllOrders = async () => {
//     try {
//       const result = await axios.post(
//         serverUrl + "/api/order/list",
//         {},
//         { withCredentials: true },
//       );
//       if (result.data) {
//         setOrders(result.data.reverse());
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const statusHandler = async (e, orderId) => {
//     try {
//       const result = await axios.post(
//         serverUrl + "/api/order/status",
//         { orderId, status: e.target.value },
//         { withCredentials: true },
//       );
//       if (result.data) {
//         await fetchAllOrders();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   return (
//     <div className="w-[100vw] min-h-[100vh] bg-gray-50 text-gray-800 overflow-x-hidden relative">
//       <Nav />
//       <div className="w-[100%] h-[100%] flex items-center lg:justify-start justify-center">
//         <Sidebar />
//         <div className="lg:w-[82%] md:w-[70%] h-[100%] lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-[20px] overflow-x-hidden py-[50px] ml-[100px] px-4">
          
//           <div className="w-full text-[28px] md:text-[35px] mb-[20px] text-gray-900 font-bold border-b border-gray-200 pb-4">
//             All Orders List
//           </div>

//           {orders.map((order, index) => (
//             <div
//               key={index}
//               className="w-[95%] bg-white border border-gray-200 rounded-xl flex lg:items-center items-start justify-between flex-col lg:flex-row p-[20px] gap-[20px] shadow-sm hover:shadow-md transition-all"
//             >
//               <div className="flex items-center gap-4">
//                 <SiEbox className="h-[50px] w-[50px] text-gray-600 p-[10px] rounded-lg bg-gray-100 border border-gray-200" />
                
//                 <div className="flex flex-col gap-1">
//                   {/* Items List */}
//                   <div className="text-[15px] font-semibold text-gray-900">
//                     {order.items.map((item, index) => (
//                       <span key={index}>
//                         {item.name} x {item.quantity} ({item.size})
//                         {index !== order.items.length - 1 ? ", " : ""}
//                       </span>
//                     ))}
//                   </div>

//                   <div className="text-[14px] text-gray-500 leading-tight">
//                     <p className="font-bold text-gray-700">{order.address.firstName} {order.address.lastName}</p>
//                     <p>{order.address.streetAddress}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.pincode}</p>
//                     <p className="mt-1">Phone: {order.address.phoneNo}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Info Section */}
//               <div className="text-[14px] text-gray-600 border-l border-gray-100 lg:pl-6 flex flex-col gap-1">
//                 <p><span className="font-medium">Items:</span> {order.items.length}</p>
//                 <p><span className="font-medium">Method:</span> {order.paymentMethod.toUpperCase()}</p>
//                 <p>
//                   <span className="font-medium">Payment:</span> 
//                   <span className={order.payment ? "text-green-600 font-bold ml-1" : "text-orange-500 font-bold ml-1"}>
//                     {order.payment ? "Done" : "Pending"}
//                   </span>
//                 </p>
//                 <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
//                 <p className="text-[18px] text-gray-900 font-bold mt-1">
//                   Amount: ₹{order.amount}
//                 </p>
//               </div>

//               {/* Status Selection Section */}
//               <div className="flex flex-col gap-2">
//                  <p className="text-[12px] font-bold text-gray-400 uppercase">Update Status</p>
//                  <select
//                   onChange={(e) => statusHandler(e, order._id)}
//                   value={order.status}
//                   className="px-[10px] py-[8px] bg-gray-50 text-gray-800 rounded-lg border border-gray-300 outline-none focus:border-gray-900 font-medium cursor-pointer"
//                 >
//                   <option value="Order Placed">Order Placed</option>
//                   <option value="Packing">Packing</option>
//                   <option value="Shipped">Shipped</option>
//                   <option value="Out for delivery">Out for delivery</option>
//                   <option value="Delivered">Delivered</option>
//                 </select>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { SiEbox } from "react-icons/si";

const Orders = () => {
  let [orders, setOrders] = useState([]);
  let [isLoading, setIsLoading] = useState(true); // Loading state add ki
  let { serverUrl } = useContext(authDataContext);

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/list",
        {},
        { withCredentials: true },
      );
      if (result.data) {
        setOrders(result.data.reverse());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Data aane ke baad loading false
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { withCredentials: true },
      );
      if (result.data) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gray-50 text-gray-800 overflow-x-hidden relative">
      <Nav />
      <div className="w-[100%] h-[100%] flex items-center lg:justify-start justify-center">
        <Sidebar />
        <div className="lg:w-[82%] md:w-[70%] h-[100%] lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-[20px] overflow-x-hidden py-[50px] ml-[100px] px-4">
          
          <div className="w-full text-[28px] md:text-[35px] mb-[20px] text-gray-900 font-bold border-b border-gray-200 pb-4">
            All Orders List
          </div>

          {/* Loading Animation Logic */}
          {isLoading ? (
            <div className="w-full flex justify-center items-center h-[40vh]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={index}
                className="w-[95%] bg-white border border-gray-200 rounded-xl flex lg:items-center items-start justify-between flex-col lg:flex-row p-[20px] gap-[20px] shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <SiEbox className="h-[50px] w-[50px] text-gray-600 p-[10px] rounded-lg bg-gray-100 border border-gray-200" />
                  
                  <div className="flex flex-col gap-1">
                    {/* Items List */}
                    <div className="text-[15px] font-semibold text-gray-900">
                      {order.items.map((item, index) => (
                        <span key={index}>
                          {item.name} x {item.quantity} ({item.size})
                          {index !== order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>

                    <div className="text-[14px] text-gray-500 leading-tight">
                      <p className="font-bold text-gray-700">{order.address.firstName} {order.address.lastName}</p>
                      <p>{order.address.streetAddress}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.pincode}</p>
                      <p className="mt-1">Phone: {order.address.phoneNo}</p>
                    </div>
                  </div>
                </div>

                {/* Order Info Section */}
                <div className="text-[14px] text-gray-600 border-l border-gray-100 lg:pl-6 flex flex-col gap-1">
                  <p><span className="font-medium">Items:</span> {order.items.length}</p>
                  <p><span className="font-medium">Method:</span> {order.paymentMethod.toUpperCase()}</p>
                  <p>
                    <span className="font-medium">Payment:</span> 
                    <span className={order.payment ? "text-green-600 font-bold ml-1" : "text-orange-500 font-bold ml-1"}>
                      {order.payment ? "Done" : "Pending"}
                    </span>
                  </p>
                  <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                  <p className="text-[18px] text-gray-900 font-bold mt-1">
                    Amount: ₹{order.amount}
                  </p>
                </div>

                {/* Status Selection Section */}
                <div className="flex flex-col gap-2">
                   <p className="text-[12px] font-bold text-gray-400 uppercase">Update Status</p>
                   <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className="px-[10px] py-[8px] bg-gray-50 text-gray-800 rounded-lg border border-gray-300 outline-none focus:border-gray-900 font-medium cursor-pointer"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;