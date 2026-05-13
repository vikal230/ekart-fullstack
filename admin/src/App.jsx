import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Lists from "./pages/Lists";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import { adminDataContext } from "./context/AdminContext";
import { ToastContainer } from "react-toastify";
import AiAssistantButton from "./components/AiAssistantButton";

const App = () => {
  let { admindata, isCheckingAdmin } = useContext(adminDataContext);
  const location = useLocation();
  const pathName = location.pathname.toLowerCase();
  const hasSessionHint =
    typeof window !== "undefined" &&
    sessionStorage.getItem("ekart-admin-session") === "true";
  const loadingTextMap = {
    "/login": "Loading Admin Login...",
    "/": "Loading Admin Home...",
    "/add": "Loading Add Product...",
    "/lists": "Loading Product List...",
    "/orders": "Loading Orders...",
  };
  const loadingText =
    pathName === "/login"
      ? loadingTextMap[pathName]
      : hasSessionHint
        ? loadingTextMap[pathName] || "Loading Admin Page..."
        : "Loading Admin Login...";

  if (isCheckingAdmin) {
    return (
      <>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastStyle={{ background: "#111827", color: "#fff" }}
        />
        <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-sky-100 border-t-sky-600 animate-spin"></div>
            <p className="text-sm font-medium text-gray-600">{loadingText}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{ background: "#111827", color: "#fff" }}
      />
      {!admindata ? <Login /> : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}
      <AiAssistantButton />
    </>
  );
};

export default App;
