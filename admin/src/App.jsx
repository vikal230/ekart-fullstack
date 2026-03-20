import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Lists from "./pages/Lists";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import { adminDataContext } from "./context/AdminContext";
 import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  let { admindata } = useContext(adminDataContext);
  return (
    <>
    <ToastContainer/>
      {!admindata ? (
        <Login />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
          </Routes>{" "}
        </>
      )}
    </>
  );
};

export default App;
