import User from "../model/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    let CartData = userData.cartData || {};
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

    await User.findByIdAndUpdate(req.userId, {cartData: CartData});

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log("error in cart controller addToCart", error);
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userData = await User.findById(req.userId);

    let CartData = userData.cartData || {};
    if (CartData[itemId]) {
      if (CartData[itemId][size]) {
        CartData[itemId][size] = quantity;
      }
    }
    await User.findByIdAndUpdate(req.userId, { cartData: CartData });
    res.status(200).json({ message: "Cart item updated successfully" });
  } catch (error) {
    console.log("error in cart controller updateCartItem", error);
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    let CartData = userData.cartData || {};
    res.status(200).json({ cartData: CartData });
  } catch (error) {
    console.log("error in cart controller getUserCart", error);
  }
};
