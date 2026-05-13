import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdShoppingCart } from "react-icons/md";
import { userDataContext } from "../context/UserContext";
import { FaSearchPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { FaHome } from "react-icons/fa";
import { BsFillCollectionFill } from "react-icons/bs";
import { MdContactPhone } from "react-icons/md";
import { shopDataContext } from "../context/ShopContext";
import { toast } from "react-toastify";
const Nav = () => {
  let { userData, setUserData } = useContext(userDataContext);
  let { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(shopDataContext);
  let [showProfile, setShowProfile] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();
  let location = useLocation();

  const handleLogout = async () => {
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      console.log(result.data);
      sessionStorage.removeItem("ekart-user-session");
      navigate("/login");
      setUserData(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("logout kerne me error aa rha hai!", error);
      toast.error("Logout failed");
    }
  };
  return (
    <div className="w-[100vw] h-[70px] bg-[#f4fbff] z-10 top-0 flex items-center justify-between px-[30px] border-b border-sky-100 fixed">
      <div className="w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px]">
        <img className="w-[40px] rounded-md" src={Logo} alt="cartLogo" />
        <h1 className="text-[25px] text-[black] font-sans">
          <span className="text-yellow-600">e</span>kart
        </h1>
      </div>
      <div className="w-[55%] lg:w-[40%] hidden md:flex">
        <ul className="flex items-center justify-center gap-[15px]">
          <li
            className={`text-[15px] cursor-pointer font-medium py-[10px] px-[20px] rounded-md ${location.pathname === "/" ? "bg-slate-300" : "hover:bg-slate-300"}`}
            onClick={() => navigate("/")}
          >
            HOME
          </li>
          <li
            className={`text-[15px] cursor-pointer font-medium py-[10px] px-[20px] rounded-md ${location.pathname === "/collections" ? "bg-slate-300" : "hover:bg-slate-300"}`}
            onClick={() => navigate("/collections")}
          >
            COLLECTIONS
          </li>
          <li
            className={`text-[15px] cursor-pointer font-medium py-[10px] px-[20px] rounded-md ${location.pathname === "/about" ? "bg-slate-300" : "hover:bg-slate-300"}`}
            onClick={() => navigate("/about")}
          >
            ABOUT
          </li>
          <li
            className={`text-[15px] cursor-pointer font-medium py-[10px] px-[20px] rounded-md ${location.pathname === "/contact" ? "bg-slate-300" : "hover:bg-slate-300"}`}
            onClick={() => navigate("/contact")}
          >
            CONTACT
          </li>
        </ul>
      </div>
      <div className="w-[30%] flex items-center justify-end gap-[14px] md:gap-[22px]">
        {!showSearch && (
          <FaSearch
            className="w-[29px] h-[29px] cursor-pointer text-sky-700 hover:text-sky-900 transition-colors"
            onClick={() => {
              setShowProfile(false);
              setShowSearch((prev) => !prev);
              navigate("/collections");
            }}
          />
        )}

        {showSearch && (
          <FaSearchPlus
            className="w-[29px] h-[29px] cursor-pointer text-orange-500 hover:text-orange-600 transition-colors"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        )}

        {!userData && (
          <CgProfile
            className="w-[30px] h-[30px] text-sky-700 cursor-pointer hover:text-sky-900 transition-colors"
            onClick={() => {
              setShowSearch(false);
              setShowProfile((prev) => !prev);
            }}
          />
        )}

        {userData && (
          <div
            className="w-[32px] h-[32px] bg-sky-100 text-sky-700 rounded-full flex items-center justify-center cursor-pointer font-semibold hover:bg-sky-200 transition-all"
            onClick={() => {
              setShowSearch(false);
              setShowProfile((prev) => !prev);
            }}
          >
            {userData?.name.slice(0, 1)}
          </div>
        )}

        <MdShoppingCart
          className={`w-[32px] h-[32px] cursor-pointer hidden md:block ${location.pathname === "/cart" ? "text-sky-900 bg-sky-100 rounded-md p-[3px]" : "text-sky-700 hover:text-sky-900"}`}
          onClick={() => navigate("/cart")}
        />
        <p className="absolute w-[18px] h-[18px] items-center justify-center px-[7px] py-[2px] bg-orange-500 text-white rounded-full text-[9px] top-[11px] right-[25px] hidden md:block">
          {getCartCount()}
        </p>
      </div>
      {showSearch && (
        <div className="w-[100%] h-[80px] bg-[#eaf7ff] absolute top-[100%] left-0 right-0 flex items-center justify-center border-b border-sky-100">
          <input
            type="text"
            className="lg:w-[50%] w-[80%] h-[60%] bg-white rounded-[30px] px-[24px] placeholder:text-gray-400 text-gray-800 text-[18px] border border-sky-100 outline-none"
            placeholder="Search Here"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      )}

      {showProfile && (
        <div className="absolute w-[220px] h-[150px] top-[110%] right-[4%] border border-sky-100 bg-[#fdfefe] rounded-[10px] shadow-lg shadow-sky-100 z-10">
          <ul className="w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-[black]">
            {!userData && (
              <li
                className="w-[100%] hover:bg-sky-50 px-[15px] py-[10px] cursor-pointer transition-colors"
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            )}
            {userData && (
              <li
                className="w-[100%] hover:bg-sky-50 px-[15px] py-[10px] cursor-pointer transition-colors"
                onClick={() => {
                  handleLogout();
                  setShowProfile(false);
                }}
              >
                LogOut
              </li>
            )}
            <li
              className="w-[100%] hover:bg-sky-50 px-[15px] py-[10px] cursor-pointer transition-colors"
              onClick={() => navigate("/order")}
            >
              Orders
            </li>
            <li
              className="w-[100%] hover:bg-sky-50 px-[15px] py-[10px] cursor-pointer transition-colors"
              onClick={() => navigate("/about")}
            >
              Abouth
            </li>
          </ul>
        </div>
      )}
      <div className="w-[100vw] h-[90px] flex items-center justify-between px-[25px] fixed bottom-0 left-0 bg-[#f4fbff] border-t border-sky-100 md:hidden">
        <button className={`text-sky-700 flex items-center justify-center flex-col gap-[2px] cursor-pointer px-[8px] py-[4px] rounded-md ${location.pathname === "/" ? "bg-sky-100 text-sky-900" : ""}`}>
          <FaHome
            className="w-[30px] h-[30px] md:hidden cursor-pointer"
            onClick={() => navigate("/")}
          />
          Home
        </button>
        <button className={`text-sky-700 flex items-center justify-center flex-col gap-[2px] cursor-pointer px-[8px] py-[4px] rounded-md ${location.pathname === "/collections" ? "bg-sky-100 text-sky-900" : ""}`}>
          <BsFillCollectionFill
            className="w-[30px] h-[30px] md:hidden cursor-pointer"
            onClick={() => navigate("/collections")}
          />
          Collection
        </button>
        <button className={`text-sky-700 flex items-center justify-center flex-col gap-[2px] cursor-pointer px-[8px] py-[4px] rounded-md ${location.pathname === "/contact" ? "bg-sky-100 text-sky-900" : ""}`}>
          <MdContactPhone
            className="w-[30px] h-[30px] md:hidden cursor-pointer"
            onClick={() => navigate("/contact")}
          />
          Contact
        </button>
        <button className={`text-sky-700 flex items-center justify-center flex-col gap-[2px] cursor-pointer px-[8px] py-[4px] rounded-md ${location.pathname === "/cart" ? "bg-sky-100 text-sky-900" : ""}`}>
          <MdShoppingCart
            className="w-[30px] h-[30px] md:hidden cursor-pointer"
            onClick={() => navigate("/cart")}
          />
          Cart
        </button>
        <p className="absolute w-[18px] h-[18px] flex items-center justify-center bg-orange-500 text-white rounded-full text-[9px] top-[8px] right-[24px]">
          {getCartCount()}
        </p>
      </div>
    </div>
  );
};

export default Nav;
