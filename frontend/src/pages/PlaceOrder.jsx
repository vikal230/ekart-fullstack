import React from "react";
import Title from "../component/Title";
import { useState } from "react";
import CartTotal from "../component/CartTotal";
import razorpay from "../assets/razorpay.avif";
import { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { cartItem, products, delivery_fee, getCartAmount, setCartItem } =
    useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);
  let [method, setMethod] = useState("cod");
  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phoneNo: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        const {data} = await axios.post(
          serverUrl + "/api/order/verifyrazorpay",
          response,
          { withCredentials: true },
        );
        if(data) {
          navigate("/order")
          setCartItem({})
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      console.log(orderData);
      switch (method) {
        case "cod":
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true },
          );
          console.log(result.data);
          if (result.data) {
            setCartItem({});
            navigate("/order");
          } else {
            console.log(result.data.message);
          }
          break;

        case "razorpay":
          const resultRazorpay = await axios.post(
            serverUrl + "/api/order/razorpay",
            orderData,
            { withCredentials: true },
          );
          if (resultRazorpay.data) {
            initPay(resultRazorpay.data);
          } else {
            console.log(resultRazorpay.data.message);
          }
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gray-50 flex items-start justify-center flex-col md:flex-row gap-[50px] relative px-4 md:px-10 pb-20 mt-18">
      
      {/* Left Column: Form */}
      <div className="lg:w-[50%] w-[100%] h-auto flex flex-col items-center justify-start lg:mt-[0px] mt-10">
        <form
          onSubmit={onSubmitHandler}
          className="lg:w-[80%] w-[100%] bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="py-[10px] mb-4">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className="w-[100%] flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="First name"
              className="w-full md:w-[48%] h-[50px] rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-gray-900 text-[16px] px-[20px] focus:outline-none focus:border-gray-500 transition-colors"
              required
              onChange={onChangeHandler}
              value={formData.firstName}
              name="firstName"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full md:w-[48%] h-[50px] rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-gray-900 text-[16px] px-[20px] focus:outline-none focus:border-gray-500 transition-colors"
              required
              onChange={onChangeHandler}
              value={formData.lastName}
              name="lastName"
            />
          </div>

          <div className="w-[100%] mb-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-[100%] h-[50px] rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-gray-900 text-[16px] px-[20px] focus:outline-none focus:border-gray-500 transition-colors"
              required
              onChange={onChangeHandler}
              value={formData.email}
              name="email"
            />
          </div>

          <div className="w-[100%] mb-4">
            <input
              type="text"
              placeholder="Street address"
              className="w-[100%] h-[50px] rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-gray-900 text-[16px] px-[20px] focus:outline-none focus:border-gray-500 transition-colors"
              required
              onChange={onChangeHandler}
              value={formData.streetAddress}
              name="streetAddress"
            />
          </div>

          <div className="w-[100%] flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="City"
              className="w-full md:w-[48%] h-[50px] rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-gray-900 text-[16px] px-[20px] focus:outline-none focus:border-gray-500 transition-colors"
              required
              onChange={onChangeHandler}
              value={formData.city}
              name="city"
            />
            <input
              type="text"
              placeholder="State"
              className="w-full md:w-[48%] h-[50px] rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-gray-900 text-[16px] px-[20px] focus:outline-none focus:border-gray-500 transition-colors"
              required
              onChange={onChangeHandler}
              value={formData.state}
              name="state"
            />
          </div>

          <div className="w-[100%] flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Pincode"
              className="w-full md:w-[48%] h-[50px] rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-gray-900 text-[16px] px-[20px] focus:outline-none focus:border-gray-500 transition-colors"
              required
              onChange={onChangeHandler}
              value={formData.pincode}
              name="pincode"
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full md:w-[48%] h-[50px] rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-gray-900 text-[16px] px-[20px] focus:outline-none focus:border-gray-500 transition-colors"
              required
              onChange={onChangeHandler}
              value={formData.country}
              name="country"
            />
          </div>

          <div className="w-[100%] mb-8">
            <input
              type="text"
              placeholder="Phone No."
              className="w-[100%] h-[50px] rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-gray-900 text-[16px] px-[20px] focus:outline-none focus:border-gray-500 transition-colors"
              required
              onChange={onChangeHandler}
              value={formData.phoneNo}
              name="phoneNo"
            />
          </div>

          <div className="w-[100%] flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto text-[16px] font-medium hover:bg-black cursor-pointer bg-gray-900 py-[14px] px-[40px] rounded-lg text-white shadow-sm transition-all"
            >
              PLACE ORDER
            </button>
          </div>
        </form>
      </div>

      <div className="lg:w-[50%] w-[100%] flex flex-col items-center justify-start gap-[30px] pt-4 lg:pt-0">
        <div className="w-[100%] md:w-[80%] flex flex-col gap-6">
          <CartTotal />
          
          <div className="w-[100%] bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="py-[10px] mb-4">
              <Title text1={"PAYMENT"} text2={"METHOD"} />
            </div>
            
            <div className="w-[100%] flex flex-col md:flex-row items-center justify-start gap-[20px]">
              {/* Razorpay Button */}
              <button
                type="button" 
                onClick={() => setMethod("razorpay")}
                className={`w-[150px] h-[50px] rounded-md border border-gray-300 bg-white p-1 transition-all ${method === "razorpay" ? "border-[3px] border-blue-600 shadow-md" : "hover:border-gray-400"}`}
              >
                <img
                  src={razorpay}
                  className="w-[100%] h-[100%] object-contain"
                  alt="Razorpay"
                />
              </button>

              {/* COD Button */}
              <button
                 type="button"
                onClick={() => setMethod("cod")}
                className={`w-[150px] md:w-[200px] h-[50px] bg-white border border-gray-300 text-[14px] px-[10px] rounded-md text-gray-800 font-semibold transition-all ${method === "cod" ? "border-[3px] border-blue-600 shadow-md" : "hover:border-gray-400"}`}
              >
                CASH ON DELIVERY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;