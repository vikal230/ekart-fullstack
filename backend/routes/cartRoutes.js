import express from "express";
import  isAuth  from "../middleware/isAuth.js";
import {
  addToCart,
  getUserCart,
  updateCartItem,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/get", isAuth, getUserCart);
cartRouter.post("/add", isAuth, addToCart);
cartRouter.post("/update", isAuth, updateCartItem);

export default cartRouter;