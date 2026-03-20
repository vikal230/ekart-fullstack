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
    <div className="w-full min-h-[100vh] p-[20px] overflow-hidden bg-gray-50">
      <div className="h-[8%] w-[100%] text-center mt-[80px]">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div className="w-[100%] h-[92%] flex flex-wrap gap-[20px]">
        {cartData.map((item, index) => {
          let productData = products.find(
            (product) => product._id === item._id,
          );
          return (
            <div key={index} className="w-[100%] py-4 border-t border-b border-gray-200">
              <div className="w-[100%] flex items-start gap-6 bg-white shadow-sm py-[15px] px-[20px] rounded-xl relative border border-gray-100">
                <img
                  className="w-[100px] h-[100px] rounded-md object-contain border border-gray-200 bg-gray-100 p-1"
                  src={productData.image3}
                  alt={productData.name}
                />
                <div className="flex items-start justify-center flex-col gap-[10px]">
                  <p className="md:text-[22px] text-[18px] text-gray-900 font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-[20px]">
                    <p className="text-[18px] text-gray-700 font-semibold">
                      {currency} {productData.price}
                    </p>
                    <p className="w-[40px] h-[40px] text-[16px] text-gray-700 bg-gray-50 rounded-md mt-[5px] flex items-center justify-center border-[1px] border-gray-300">
                      {item.size}
                    </p>
                  </div>
                </div>

                <div className="absolute md:top-[40%] top-[46%] left-[65%] md:left-[50%] flex items-center gap-3 bg-white border-[1px] border-gray-300 rounded-md px-2 py-1 shadow-sm">
                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      updateQuantity(item._id, item.size, item.quantity - 1)
                    }
                    className="text-gray-500 text-[22px] font-bold px-2 hover:text-black transition-colors"
                  >
                    -
                  </button>

                  <span className="text-gray-900 text-[18px] font-semibold w-[20px] text-center">
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

                <AiTwotoneDelete
                  className="text-gray-400 hover:text-red-500 cursor-pointer w-[25px] h-[25px] absolute top-[50%] md:top-[40%] md:right-[5%] right-4 transition-colors"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {cartData.length > 0 ? (
        <div className="flex justify-start items-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <button
              className="text-[16px] font-medium hover:bg-black cursor-pointer bg-gray-900 py-[12px] px-[40px] rounded-xl text-white flex items-center justify-center gap-[20px] shadow-sm ml-[30px] mt-[20px] transition-all"
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