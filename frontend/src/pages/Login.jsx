import { useState } from "react";
import Logo from "../assets/logo.png";
import google from "../assets/googlelogo.jpg";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useContext } from "react";
import { authDataContext } from "../context/authcontext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  let { serverUrl } = useContext(authDataContext);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { getCurrentUser } = useContext(userDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true },
      );
      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
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
    <div className="w-[100vw] h-[100vh] bg-gray-50 text-gray-800 flex flex-col items-center justify-start">
      
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
      <div className="w-[100%] h-[120px] flex items-center justify-center flex-col gap-[5px] mt-4">
        <h2 className="text-[28px] md:text-[32px] font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-500 text-[15px]">Login to your ekart account to continue</p>
      </div>

      {/* Login Card */}
      <div className="max-w-[500px] w-[90%] bg-white border border-gray-200 rounded-2xl shadow-xl p-8 transition-all">
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center justify-start gap-[20px]"
        >
          <div
            className="w-full h-[50px] bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-[12px] cursor-pointer hover:bg-gray-50 transition-all font-semibold shadow-sm"
            onClick={googleLogin}
          >
            <img
              src={google}
              alt="google image"
              className="w-[24px] rounded-full"
            />
            Sign in with Google
          </div>

          {/* Divider */}
          <div className="w-full flex items-center justify-center gap-[15px] my-2">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-gray-400 text-sm font-medium">OR</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          {/* Form Inputs */}
          <div className="w-full flex flex-col gap-[15px] relative">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full h-[50px] border border-gray-300 rounded-lg bg-gray-50 px-[20px] text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 transition-all font-medium"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="w-full h-[50px] border border-gray-300 rounded-lg bg-gray-50 px-[20px] text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 transition-all font-medium"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {/* Show/Hide Icon */}
              <div 
                className="absolute right-[5%] top-[15px] text-gray-500 cursor-pointer hover:text-gray-900 transition-colors"
                onClick={() => setShow((prev) => !prev)}
              >
                {show ? <IoEyeSharp size={20} /> : <IoEyeOutline size={20} />}
              </div>
            </div>

            {/* Login Button */}
            <button className="w-full h-[50px] bg-gray-900 text-white rounded-lg flex items-center justify-center mt-2 text-[16px] font-bold hover:bg-black transition-all shadow-md active:scale-95">
              Login to Account
            </button>

            {/* Signup Link */}
            <p className="text-center mt-2 text-[14px] text-gray-600">
              Don't have an account?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Create Account
              </span>
            </p>
          </div>
        </form>
      </div>

      {/* Simple Footer */}
      <p className="mt-10 text-gray-400 text-sm italic">Secure login by ekart &copy; 2026</p>
    </div>
  );
};

export default Login;