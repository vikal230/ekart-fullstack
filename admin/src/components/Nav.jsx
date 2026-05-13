import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import axios from "axios"
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import { toast } from "react-toastify";
const Nav = () => {
  let navigate = useNavigate();
  let {serverUrl} = useContext(authDataContext)
 let {admindata, getAdmin} = useContext(adminDataContext)
  const logOut = async () => {
    try {
      let result = await axios.post(serverUrl + "/api/auth/logout",  {withCredentials: true})
      console.log(result.data)
      getAdmin()
      toast.success("Admin logged out successfully");
      navigate("/login")
    } catch (error) {
      console.log("admin logout error!", error)
      toast.error("Admin logout failed");
    }
  }
  return (
    <div className="w-[100vw] h-[70px] bg-[#f4fbff] z-10 fixed top-0 flex items-center justify-between px-[30px] border-b border-sky-100">
      <div
        className="w-[30%] flex items-center justify-start gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px] rounded-md" src={Logo} alt="cartLogo" />
        <h1 className="text-[25px] text-[black] font-sans">
          <span className="text-yellow-600">e</span>kart
        </h1>
      </div>

      <div className="flex items-center gap-[14px]">
        <div className="w-[40px] h-[40px] rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[16px] cursor-pointer hover:bg-sky-200 transition-all">
          {admindata?.email?.slice(0, 1)?.toUpperCase() || "A"}
        </div>
        <button
          className="text-[14px] cursor-pointer bg-sky-600 hover:bg-sky-700 py-[10px] px-[24px] rounded-xl text-white font-medium transition-all"
          onClick={logOut}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Nav;
