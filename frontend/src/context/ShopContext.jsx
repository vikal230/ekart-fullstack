import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authcontext";
import axios from "axios";
import { userDataContext } from "./UserContext";
export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
  let { userData } = useContext(userDataContext);
  let [search, setSearch] = useState("");
  let [showSearch, setShowSearch] = useState("");
  let [products, setProducts] = useState([]);
  let { serverUrl } = useContext(authDataContext);
  let [cartItem, setCartItem] = useState({});

  let currency = "₹";
  let delivery_fee = 40;

  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      console.log("select product size");
      return;
    }

    let CartData = structuredClone(cartItem);
    if (CartData[itemId]) {
      if (CartData[itemId][size]) {
        CartData[itemId][size] += 1;
      } else {
        CartData[itemId][size] = 1;
      }
    } else {
      CartData[itemId] = {};
      CartData[itemId][size] = 1;
    }
    setCartItem(CartData);
    // console.log("cart data", CartData);

    if (userData) {
      try {
        let result = await axios.post(
          serverUrl + "/api/cart/add",
          {
            itemId,
            size,
          },
          {
            withCredentials: true,
          },
        );

        console.log("add to cart result", result);
      } catch (error) {
        console.log("error in shop context addToCart", error);
      }
    }
  };

  const getUserCart = async () => {
    if (userData) {
      try {
        const result = await axios.post(
          serverUrl + "/api/cart/get",
          {},
          {
            withCredentials: true,
          },
        );
        setCartItem(result.data.cartData);
      } catch (error) {
        console.log("error in shop context getUserCart", error);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    try {
      let CartData = structuredClone(cartItem);
      CartData[itemId][size] = quantity;
      setCartItem(CartData);
       
      let result = await axios.post(
        serverUrl + "/api/cart/update",
        {
          itemId,
          size,
          quantity,
        },
        {
          withCredentials: true,
        },
      );
      console.log("update quantity result", result);
    } catch (error) {
      console.log("error in update quantity", error);
      toast.error("Error updating cart item quantity");
    }
  };

  const getCartCount = () => {
    let totalcount = 0;
    for (const items in cartItem) {
      for (let item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalcount += cartItem[items][item];
          }
        } catch (error) {
          console.log("error in shop context getCartCount", error);
        }
      }
    }
    return totalcount;
  };

  const getCartAmount =  () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += cartItem[items][item] * itemInfo.price;
          }
        } catch (error) {
          console.log("error in shop context getCartAmount", error);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getUserCart();
  }, [userData]);

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItem,
    getCartCount,
    updateQuantity,
    getCartAmount,
    setCartItem,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
};

export default ShopContext;
