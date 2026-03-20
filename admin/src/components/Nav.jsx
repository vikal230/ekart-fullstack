import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import axios from "axios"
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
const Nav = () => {
  let navigate = useNavigate();
  let {serverUrl} = useContext(authDataContext)
 let {getAdmin} = useContext(adminDataContext)
  const logOut = async () => {
    try {
      let result = await axios.post(serverUrl + "/api/auth/logout",  {withCredentials: true})
      console.log(result.data)
      getAdmin()
      navigate("/login")
    } catch (error) {
      console.log("admin logout error!", error)
    }
  }
  return (
    <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
      <div
        className="w-[30%] flex items-center justify-start gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px] rounded-md" src={Logo} alt="cartLogo" />
        <h1 className="text-[25px] text-[black] font-sans">
          <span className="text-yellow-600">e</span>kart
        </h1>
      </div>

      <button className="text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[35px] rounded-2xl text-white" onClick={logOut}>LogOut</button>
    </div>
  );
};

export default Nav;
