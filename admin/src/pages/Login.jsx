import React, { useContext, useState } from "react";
import axios from "axios";
import Logo from "../assets/logo.png";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { authDataContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { adminDataContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const Login = () => {
  const [show, setShow] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();
  let { getAdmin } = useContext(adminDataContext);

  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/adminLogin",
        { email, password },
        { withCredentials: true },
      );
      toast.success("Admin Login Successfully!");
      await getAdmin();
      navigate("/");
    } catch (error) {
      console.log("Admin login error!", error);
      toast.error("Admin Login Failed!");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-50 text-gray-800 flex flex-col items-center justify-center p-4">
      
      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate("/")}>
        <img className="h-[45px] rounded-md" src={Logo} alt="Logo" />
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          <span className="text-yellow-600">e</span>kart Admin
        </h1>
      </div>

      {/* Login Card */}
      <div className="max-w-[450px] w-full bg-white border border-gray-200 rounded-2xl shadow-xl p-8 transition-all">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
          <p className="text-gray-500 mt-2 text-sm">Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={adminLogin} className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="admin@ekart.com"
              className="w-full h-[50px] border border-gray-300 rounded-lg bg-gray-50 px-4 text-gray-900 outline-none focus:border-gray-900 transition-all shadow-sm"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type={show ? "text" : "password"}
              placeholder="••••••••"
              className="w-full h-[50px] border border-gray-300 rounded-lg bg-gray-50 px-4 text-gray-900 outline-none focus:border-gray-900 transition-all shadow-sm"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {/* Password Toggle Icon */}
            <div 
              className="absolute right-4 top-[42px] text-gray-500 cursor-pointer hover:text-gray-900 transition-colors"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <IoEyeSharp size={22} /> : <IoEyeOutline size={22} />}
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full h-[50px] bg-gray-900 text-white rounded-lg font-bold text-lg mt-4 hover:bg-black transition-all active:scale-95 shadow-md"
          >
            Login to Dashboard
          </button>
        </form>
      </div>

      {/* Footer text */}
      <p className="mt-8 text-gray-400 text-sm">
        &copy; 2026 ekart. All rights reserved.
      </p>
    </div>
  );
};

export default Login;