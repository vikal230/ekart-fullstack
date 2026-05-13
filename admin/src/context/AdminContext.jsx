import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const adminDataContext = createContext();
const SESSION_HINT_KEY = "ekart-admin-session";
const AdminContext = ({ children }) => {
  let [admindata, setAdminData] = useState(null);
  let [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  let { serverUrl } = useContext(authDataContext);


 let getAdmin = async () => {
      setIsCheckingAdmin(true);
      try {
        let result = await axios.get(serverUrl + "/api/user/getAdmin", {withCredentials:true})
        console.log(result.data)
        setAdminData(result.data)
        sessionStorage.setItem(SESSION_HINT_KEY, "true");
      } catch (error) {
        setAdminData(null)
        sessionStorage.removeItem(SESSION_HINT_KEY);
        console.log("error hai admin context ke ander!", error)
      } finally {
        setIsCheckingAdmin(false);
      }
    }

    useEffect(() => {
      getAdmin()
    }, [])


     let value = {
      admindata, setAdminData, getAdmin, isCheckingAdmin
    }
  return (

    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
};

export default AdminContext;
