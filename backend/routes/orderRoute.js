import express from "express";
import isAuth from "../middleware/isAuth.js";
import { placeOrder, userOrder, allOrders, updateStatus, placeRazorpayOrder, verifyRazorpay } from "../controllers/orderController.js";
import AdminAuth from "../middleware/AdminAuth.js";
const orderRoutes = express.Router();

//for user order
orderRoutes.post("/placeorder", isAuth, placeOrder);
orderRoutes.post("/userorder", isAuth, userOrder);
orderRoutes.post("/razorpay", isAuth, placeRazorpayOrder);
orderRoutes.post("/verifyrazorpay", isAuth, verifyRazorpay);



// for admin order
orderRoutes.post("/list", AdminAuth,allOrders);
orderRoutes.post("/status", AdminAuth, updateStatus);



export default orderRoutes;
