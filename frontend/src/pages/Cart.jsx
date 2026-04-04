import React, { useEffect, useState, useContext } from "react";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom"; 
import { AiTwotoneDelete } from "react-icons/ai";
import CartTotal from "../component/CartTotal";

const Cart = () => {
  const {
    products,
    cartItem,
    getCartCount,
    updateQuantity,
    getCartAmount,
    currency,
  } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      let tempData = [];
      for (const items in cartItem) {
        let itemInfo = products.find((product) => product._id === items);

        for (const item in cartItem[items]) {
          try {
            if (cartItem[items][item] > 0) {
              tempData.push({
                ...itemInfo, 
                _id: items, 
                size: item, 
                quantity: cartItem[items][item], 
              });
            }
          } catch (error) {
            console.log("error in cart useEffect", error);
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItem, products]);

  return (
    <div className="w-full min-h-[100vh] p-[20px] bg-gray-50 mt-18">
      
      {/* Title Section */}
      <div className="w-full text-center mt-[40px] mb-[40px]">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items List */}
      <div className="w-full flex flex-col gap-[20px]">
        {cartData.map((item, index) => {
          let productData = products.find(
            (product) => product._id === item._id,
          );
          return (
            <div key={index} className="w-full">
              
              {/* Main Item Container - Changed for Responsiveness */}
              <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white shadow-sm py-[15px] px-[20px] rounded-xl border border-gray-100">
                
                {/* Product Image & Info Group */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-md object-contain border border-gray-200 bg-gray-100 p-1"
                    src={productData.image1}
                    alt={productData.name}
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-[16px] sm:text-[20px] text-gray-900 font-medium leading-tight">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-4">
                      <p className="text-[16px] sm:text-[18px] text-gray-700 font-semibold">
                        {currency} {productData.price}
                      </p>
                      <p className="px-3 py-1 text-[14px] text-gray-700 bg-gray-50 rounded-md border border-gray-300">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Delete Icon Group */}
                <div className="flex items-center justify-between w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-none border-gray-100 gap-6">
                  
                  {/* Quantity Buttons */}
                  <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        updateQuantity(item._id, item.size, item.quantity - 1)
                      }
                      className="text-gray-500 text-[20px] font-bold px-2 hover:text-black transition-colors"
                    >
                      -
                    </button>

                    <span className="text-gray-900 text-[16px] font-semibold w-[20px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity + 1)
                      }
                      className="text-gray-500 text-[20px] font-bold px-2 hover:text-black transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Icon */}
                  <AiTwotoneDelete
                    className="text-gray-400 hover:text-red-500 cursor-pointer w-[24px] h-[24px] transition-colors"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Totals Section */}
      {cartData.length > 0 ? (
        <div className="flex justify-start items-start my-10">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <button
              className="w-full sm:w-auto text-[16px] font-medium hover:bg-black cursor-pointer bg-gray-900 py-[12px] px-[40px] rounded-xl text-white flex items-center justify-center gap-[20px] shadow-sm sm:ml-[30px] mt-[20px] transition-all"
              onClick={() => navigate("/placeorder")}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center my-20 gap-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="Empty Cart"
            className="w-[150px] opacity-50 grayscale"
          />
          <p className="text-gray-500 text-[22px] font-medium">
            Cart is Empty!
          </p>
        </div>
      )}
    </div>
  );
};
export default Cart;