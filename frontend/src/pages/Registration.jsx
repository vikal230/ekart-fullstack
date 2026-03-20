import React, { useState } from "react";
import Logo from "../assets/logo.png";
import google from "../assets/googlelogo.jpg";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useContext } from "react";
import { authDataContext } from "../context/authcontext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase";
import { userDataContext } from "../context/UserContext";

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
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/registration",
        { name, email, password },
        { withCredentials: true },
      );
      console.log(result.data);
      getCurrentUser()
      navigate("/");
      
    } catch (error) {
      console.log(error);
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
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log("error hai", error);
    }
  };

  return (
    // Background Light Gray
    <div className="w-[100vw] h-[100vh] bg-gray-50 text-gray-800 flex flex-col items-center justify-start overflow-y-auto pb-10">
      
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
        <h2 className="text-[28px] md:text-[32px] font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-500 text-[15px]">Join ekart for the best shopping experience</p>
      </div>

      {/* Registration Card */}
      <div className="max-w-[500px] w-[90%] bg-white border border-gray-200 rounded-2xl shadow-xl p-8 transition-all mb-10">
        <form
          onSubmit={handleSignup}
          className="w-full flex flex-col items-center justify-start gap-[20px]"
        >
          {/* Google Signup Button */}
          <div
            className="w-full h-[50px] bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-[12px] cursor-pointer hover:bg-gray-50 transition-all font-semibold shadow-sm text-sm md:text-base"
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
              className="w-full h-[50px] border border-gray-300 rounded-lg bg-gray-50 px-[20px] text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 transition-all font-medium"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full h-[50px] border border-gray-300 rounded-lg bg-gray-50 px-[20px] text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 transition-all font-medium"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <div className="relative w-full flex items-center">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="w-full h-[50px] border border-gray-300 rounded-lg bg-gray-50 px-[20px] text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 transition-all font-medium"
                required
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
            <button className="w-full h-[50px] bg-gray-900 text-white rounded-lg flex items-center justify-center mt-2 text-[16px] font-bold hover:bg-black transition-all shadow-md active:scale-95">
              Create Account
            </button>

            {/* Login Redirect */}
            <p className="text-center mt-2 text-[14px] text-gray-600">
              Already have an account?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer hover:underline"
                onClick={() => navigate("/Login")}
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