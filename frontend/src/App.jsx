import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./component/Nav";
import { userDataContext } from "./context/UserContext";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import PageNotFound from "./pages/pageNotFound";
import AiAssistantButton from "./component/AiAssistantButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastContainerProps = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
  toastStyle: {
    background: "#ffffff",
    color: "#0f172a",
    border: "1px solid #dbeafe",
    borderRadius: "14px",
    boxShadow: "0 14px 32px rgba(14, 165, 233, 0.12)",
    fontSize: "14px",
    fontWeight: "500",
    minHeight: "58px",
  },
};

const App = () => {
  let { userData, isCheckingAuth } = useContext(userDataContext);
  let location = useLocation();
  const pathName = location.pathname.toLowerCase();
  const hasSessionHint =
    typeof window !== "undefined" &&
    sessionStorage.getItem("ekart-user-session") === "true";
  const loadingTextMap = {
    "/login": "Loading Login...",
    "/signup": "Loading Register...",
    "/": "Loading Home...",
    "/about": "Loading About...",
    "/collections": "Loading Collections...",
    "/contact": "Loading Contact...",
    "/cart": "Loading Cart...",
    "/placeorder": "Loading Place Order...",
    "/order": "Loading Order...",
  };
  const getLoadingText = () => {
    if (pathName === "/login" || pathName === "/signup") {
      return loadingTextMap[pathName];
    }

    if (!hasSessionHint) {
      return "Loading Login...";
    }

    if (pathName.startsWith("/productdetails/")) {
      return "Loading Product Details...";
    }

    return loadingTextMap[pathName] || "Loading Page...";
  };
  const loadingText = getLoadingText();

  if (isCheckingAuth) {
    return (
      <>
        <ToastContainer {...toastContainerProps} />
        <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-gray-900 animate-spin"></div>
            <p className="text-sm font-medium text-gray-600">{loadingText}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer {...toastContainerProps} />
      {userData && <Nav />}
      <Routes>
        <Route
          path="/login"
          element={
            userData ? <Navigate to={location.state?.from || "/"} /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registration />
            )
          }
        />
        <Route
          path="/"
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/about"
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/collections"
          element={
            userData ? (
              <Collections />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/contact"
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/ProductDetails/:productid"
          element={
            userData ? (
              <ProductDetails />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/cart"
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/placeorder"
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/order"
          element={
            userData ? (
              <Order />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <AiAssistantButton />
    </>
  );
};

export default App;
