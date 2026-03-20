import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import razorpay from "razorpay";
import dotenv from "dotenv"
dotenv.config()

const currency = "INR";

export const placeOrder = async (req, res) => {
  try {
    // const {items, amount, address} = req.body;
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(req.userId, { cartData: {} });
    res.status(200).json({ message: "order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "place order error", error });
  }
};

//for user order
export const userOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId });
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "userorder error" });
  }
};

// for admin order
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "adminAllOrders error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });
    return res.status(201).json({ message: "Status Updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const placeRazorpayOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const razorpayInstance = new razorpay({
      key_id:process.env.RAZORPAY_KEY_ID,
      key_secret:process.env.RAZORPAY_KEY_SECRET
    });

    // console.log("MY KEY ID:", process.env.RAZORPAY_KEY_ID);

    const newOrder = new Order(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100, // Amount in paise
      currency: currency,
      receipt: newOrder._id.toString(),
    };

    // const razorpayOrder = await razorpayInstance.orders.create(options);
    // res.status(200).json({ order: razorpayOrder, orderId: newOrder._id });
     razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log("razorpay order creation error", error);
        return res
          .status(500)
          .json({ message: "Razorpay order creation failed", error: error });
      }
      res.status(200).json(order);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "create razorpay order error", error });
  }
};


export const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { razorpay_order_id } = req.body;

    const razorpayInstance = new razorpay({
     key_id:process.env.RAZORPAY_KEY_ID,
      key_secret:process.env.RAZORPAY_KEY_SECRET
    });

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === 'paid') {
      await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ message: 'Payment Successful' });
    } else {
      res.json({ message: 'Payment Failed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};