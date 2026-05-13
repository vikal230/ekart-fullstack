import React from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { SiEbox } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const Orders = () => {
  let [orders, setOrders] = useState([]);
  let [search, setSearch] = useState("");
  let [isLoading, setIsLoading] = useState(true);
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
        toast.success("Order status updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };

  const markFailedHandler = async (orderId) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/cancel/${orderId}`,
        {},
        { withCredentials: true },
      );

      if (result.data) {
        await fetchAllOrders();
        toast.success("Order marked as failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return true;
    }

    const itemNames = order.items.map((item) => item.name).join(" ");
    const fullName = `${order.address.firstName} ${order.address.lastName}`;
    const matchText = `
      ${itemNames}
      ${fullName}
      ${order.address.city}
      ${order.address.phoneNo}
      ${order.status}
      ${order.paymentMethod}
    `.toLowerCase();

    return matchText.includes(searchValue);
  });

  const getStatusClass = (status) => {
    if (status === "Cancelled by User" || status === "Order Failed") {
      return "text-red-500 font-bold ml-1";
    }

    if (status === "Delivered") {
      return "text-green-600 font-bold ml-1";
    }

    return "text-sky-600 font-bold ml-1";
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gray-50 text-gray-800 overflow-x-hidden relative">
      <Nav />
      <Sidebar />
      <div className="w-[82%] min-h-[calc(100vh-70px)] mt-[70px] flex flex-col gap-[20px] py-[50px] px-4 absolute right-0 md:px-[20px]">
          
          <div className="w-full text-[28px] md:text-[35px] mb-[20px] text-gray-900 font-bold border-b border-gray-200 pb-4">
            All Orders List
          </div>

          <div className="w-[95%] h-[60px] flex items-center gap-3 rounded-xl border border-sky-100 bg-white px-4 shadow-sm">
            <FaSearch className="text-sky-500 text-[15px]" />
            <input
              type="text"
              placeholder="Search by product, customer, phone, city, status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[50px] bg-transparent text-[15px] leading-[60px] text-gray-800 outline-none placeholder:text-[15px] placeholder:text-gray-400"
            />
          </div>

          {/* Loading Animation Logic */}
          {isLoading ? (
            <div className="w-full h-[40vh] flex flex-col items-center justify-center gap-4">
              <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-300 border-t-gray-900"></div>
              <p className="text-gray-500 text-lg font-medium">
                Loading orders...
              </p>
            </div>
          ) : (
            filteredOrders.length ? filteredOrders.map((order, index) => (
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
                  <p>
                    <span className="font-medium">Status:</span>
                    <span className={getStatusClass(order.status)}>
                      {order.status}
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
                    <option value="Order Failed">Order Failed</option>
                    <option value="Cancelled by User">Cancelled by User</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => markFailedHandler(order._id)}
                    className="px-[10px] py-[8px] bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-all"
                  >
                    Mark Failed
                  </button>
                </div>
              </div>
            )) : (
              <div className="w-[95%] bg-white border border-gray-200 rounded-xl p-[24px] text-gray-500">
                No matching orders found.
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Orders;
