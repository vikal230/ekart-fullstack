import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getAdmin, getCurrentUser } from "../controllers/userController.js";
import AdminAuth from "../middleware/AdminAuth.js";

let userRoutes = express.Router();

userRoutes.post("/getCurrentUser", isAuth, getCurrentUser);
userRoutes.get("/getAdmin", AdminAuth, getAdmin);

export default userRoutes;
