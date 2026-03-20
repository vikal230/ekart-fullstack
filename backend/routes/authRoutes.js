import  express  from "express";
import { adminLogin, googleLogin, login, logout, registration,  } from "../controllers/authController.js";

const authRoutes = express.Router()

authRoutes.post("/registration", registration)
authRoutes.post("/login", login)
authRoutes.post("/logout", logout)
authRoutes.post("/googleLogin", googleLogin)
authRoutes.post("/adminLogin", adminLogin)


// authRoutes.post("/send-otp", sendOtp);
// authRoutes.post("/verify-otp", verifyOtp);
export default authRoutes;