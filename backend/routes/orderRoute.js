import express from "express";
import isAuth from "../middleware/isAuth.js";
import { placeOrder, userOrder, deleteUserOrder, allOrders, updateStatus, cancelOrder, placeRazorpayOrder, verifyRazorpay } from "../controllers/orderController.js";
import AdminAuth from "../middleware/AdminAuth.js";
const orderRoutes = express.Router();

//for user order
orderRoutes.post("/placeorder", isAuth, placeOrder);
orderRoutes.post("/userorder", isAuth, userOrder);
orderRoutes.post("/delete/:id", isAuth, deleteUserOrder);
orderRoutes.post("/razorpay", isAuth, placeRazorpayOrder);
orderRoutes.post("/verifyrazorpay", isAuth, verifyRazorpay);



// for admin order
orderRoutes.post("/list", AdminAuth,allOrders);
orderRoutes.post("/status", AdminAuth, updateStatus);
orderRoutes.post("/cancel/:id", AdminAuth, cancelOrder);



export default orderRoutes;
