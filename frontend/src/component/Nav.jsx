import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdShoppingCart } from "react-icons/md";
import { userDataContext } from "../context/UserContext";
import { FaSearchPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/authcontext";
import { FaHome } from "react-icons/fa";
import { BsFillCollectionFill } from "react-icons/bs";
import { MdContactPhone } from "react-icons/md";
import { shopDataContext } from "../context/ShopContext";
const Nav = () => {
  let { userData, setUserData } = useContext(userDataContext);
  let { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(shopDataContext);
  let [showProfile, setShowProfile] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();

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
      navigate("/login");
      setUserData(null);
    } catch (error) {
      console.log("logout kerne me error aa rha hai!", error);
    }
  };
  return (
    <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10  top-0 flex items-center justify-between px-[30px] shadow-md shadow-black fixed">
      <div className="w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px]">
        <img className="w-[40px] rounded-md" src={Logo} alt="cartLogo" />
        <h1 className="text-[25px] text-[black] font-sans">
          <span className="text-yellow-600">e</span>kart
        </h1>
      </div>
      <div className="w-[55%] lg:w-[40%] hidden md:flex">
        <ul className="flex items-center justify-center gap-[15px]">
          <li
            className="text-[15px] hover:bg-slate-300 cursor-pointer font-medium py-[10px] px-[20px] rounded-md"
            onClick={() => navigate("/")}
          >
            HOME
          </li>
          <li
            className="text-[15px] hover:bg-slate-300 cursor-pointer font-medium py-[10px] px-[20px] rounded-md"
            onClick={() => navigate("/collections")}
          >
            COLLECTIONS
          </li>
          <li
            className="text-[15px] hover:bg-slate-300 cursor-pointer font-medium py-[10px] px-[20px] rounded-md"
            onClick={() => navigate("/about")}
          >
            ABOUT
          </li>
          <li
            className="text-[15px] hover:bg-slate-300 cursor-pointer font-medium py-[10px] px-[20px] rounded-md"
            onClick={() => navigate("/contact")}
          >
            CONTACT
          </li>
        </ul>
      </div>
      <div className="w-[30%] flex items-center justify-end gap-[20px]">
        {!showSearch && (
          <FaSearch
            className="w-[29px] h-[29px] text-[#000000] cursor-pointer text-gray-500"
            onClick={() => {
              setShowSearch((prev) => !prev);
              navigate("/collections");
            }}
          />
        )}

        {showSearch && (
          <FaSearchPlus
            className="w-[29px] h-[29px] text-[#000000] cursor-pointer text-sky-300"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        )}

        {!userData && (
          <CgProfile
            className="w-[30px] h-[30px] text-[#000000] cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          />
        )}

        {userData && (
          <div
            className="w-[30px] h-[30px] bg-gray-500 text-[white] rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {userData?.name.slice(0, 1)}
          </div>
        )}

        <MdShoppingCart
          className="w-[32px] h-[32px] text-[#000000] cursor-pointer text-gray-500 hidden md:block"
          onClick={() => navigate("/cart")}
        />
        <p className="absolute w-[18px] h-[18px] items-center justify-center px-[7px] py-[2px] bg-black text-white rounded-full text-[9px] top-[11px] right-[25px] hidden md:block">
          {getCartCount()}
        </p>
      </div>
      {showSearch && (
        <div className="w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center">
          <input
            type="text"
            className="lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-[white] text-[18px]"
            placeholder="Search Here"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      )}

      {showProfile && (
        <div className="absolute w-[220px] h-[150px] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] bg-white rounded-[10px] shadow-2xl z-10">
          <ul className="w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-[black]">
            {!userData && (
              <li
                className="w-[100%] hover:bg-amber-100 px-[15px] py-[10px] cursor-pointer"
                onClick={() => {
                  navigate("login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            )}
            {userData && (
              <li
                className="w-[100%] hover:bg-amber-100 px-[15px] py-[10px] cursor-pointer hover:rounded-full"
                onClick={() => {
                  handleLogout();
                  setShowProfile(false);
                }}
              >
                LogOut
              </li>
            )}
            <li
              className="w-[100%] hover:bg-amber-100 px-[15px] py-[10px] cursor-pointer hover:rounded-full"
              onClick={() => navigate("/order")}
            >
              Orders
            </li>
            <li
              className="w-[100%] hover:bg-amber-100 px-[15px] py-[10px] cursor-pointer hover:rounded-full"
              onClick={() => navigate("/about")}
            >
              Abouth
            </li>
          </ul>
        </div>
      )}
      <div className="w-[100vw] h-[90px] flex items-center justify-between px-[25px] fixed bottom-0 left-0 bg-gray-200 md:hidden">
        <button className="text-black flex items-center justify-center flex-col gap-[2px] cursor-pointer">
          <FaHome
            className="w-[30px] h-[30px] text-[black] md:hidden cursor-pointer"
            onClick={() => navigate("/")}
          />
          Home
        </button>
        <button className="text-black flex items-center justify-center flex-col gap-[2px] cursor-pointer">
          <BsFillCollectionFill
            className="w-[30px] h-[30px] text-black md:hidden cursor-pointer"
            onClick={() => navigate("/collections")}
          />
          Collection
        </button>
        <button className="text-black flex items-center justify-center flex-col gap-[2px] cursor-pointer">
          <MdContactPhone
            className="w-[30px] h-[30px] text-black md:hidden cursor-pointer"
            onClick={() => navigate("/contact")}
          />
          Contact
        </button>
        <button className="text-black flex items-center justify-center flex-col gap-[2px] cursor-pointer">
          <MdShoppingCart
            className="w-[30px] h-[30px] text-black md:hidden cursor-pointer"
            onClick={() => navigate("/cart")}
          />
          Cart
        </button>
        <p className="absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[7px] py-[2px] text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px]">
          {getCartCount()}
        </p>
      </div>
    </div>
  );
};

export default Nav;
