import React, { useState } from "react";
import Logo from "../assets/logo.png";
import google from "../assets/googlelogo.jpg";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase";
import { userDataContext } from "../context/UserContext";
import { toast } from "react-toastify";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const Registration = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { getCurrentUser } = useContext(userDataContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (trimmedPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/registration",
        { name: trimmedName, email: trimmedEmail, password: trimmedPassword },
        { withCredentials: true },
      );
      console.log(result.data);
      await getCurrentUser();
      toast.success("Registration successful. Welcome to ekart. Enjoy your shopping journey.");
      navigate("/");
      
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message?.toLowerCase() || "";

      if (message.includes("exists")) {
        toast.error("This email is already registered");
      } else if (message.includes("valid email")) {
        toast.error("Please enter a valid email");
      } else if (message.includes("password")) {
        toast.error("Please enter a strong password");
      } else {
        toast.error("Registration failed");
      }
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googleLogin",
        { name, email },
        { withCredentials: true },
      );
      console.log(result.data);
      await getCurrentUser();
      toast.success("Google signup successful. Welcome to ekart.");
      navigate("/");
    } catch (error) {
      console.log("error hai", error);
      toast.error("Google signup failed");
    }
  };

  return (
    // Background Light Gray
    <div className="w-[100vw] h-[100vh] bg-gradient-to-br from-sky-50 via-white to-amber-50 text-gray-800 flex flex-col items-center justify-start overflow-y-auto pb-10">
      
      {/* Header/Logo Section */}
      <div
        className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="h-[40px] rounded-md" src={Logo} alt="cartLogo" />
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          <span className="text-yellow-600">e</span>kart
        </h1>
      </div>

      {/* Welcome Text */}
      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[5px] mt-4 text-center px-4">
        <h2 className="text-[28px] md:text-[32px] font-bold text-slate-900">Create Account</h2>
        <p className="text-slate-500 text-[15px]">Join ekart for the best shopping experience</p>
      </div>

      {/* Registration Card */}
      <div className="max-w-[500px] w-[90%] bg-white/95 border border-sky-100 rounded-2xl shadow-xl shadow-sky-100/70 p-8 transition-all mb-10">
        <form
          onSubmit={handleSignup}
          noValidate
          className="w-full flex flex-col items-center justify-start gap-[20px]"
        >
          {/* Google Signup Button */}
          <div
            className="w-full h-[50px] bg-sky-50 border border-sky-100 rounded-lg flex items-center justify-center gap-[12px] cursor-pointer hover:bg-sky-100 transition-all font-semibold shadow-sm text-sm md:text-base"
            onClick={googleSignup}
          >
            <img
              src={google}
              alt="google image"
              className="w-[24px] rounded-full"
            />
            Register with Google
          </div>

          {/* Divider */}
          <div className="w-full flex items-center justify-center gap-[15px] my-1">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-gray-400 text-sm font-medium">OR</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          {/* Form Inputs */}
          <div className="w-full flex flex-col gap-[15px]">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-[50px] border border-slate-200 rounded-lg bg-white px-[20px] text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 transition-all font-medium"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full h-[50px] border border-slate-200 rounded-lg bg-white px-[20px] text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 transition-all font-medium"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <div className="relative w-full flex items-center">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="w-full h-[50px] border border-slate-200 rounded-lg bg-white px-[20px] text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 transition-all font-medium"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div 
                className="absolute right-[5%] cursor-pointer text-gray-500 hover:text-gray-900"
                onClick={() => setShow((prev) => !prev)}
              >
                {show ? <IoEyeSharp size={20} /> : <IoEyeOutline size={20} />}
              </div>
            </div>

            {/* Signup Button */}
            <button className="w-full h-[50px] bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg flex items-center justify-center mt-2 text-[16px] font-bold hover:opacity-95 transition-all shadow-md active:scale-95">
              Create Account
            </button>

            {/* Login Redirect */}
            <p className="text-center mt-2 text-[14px] text-gray-600">
              Already have an account?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
