import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const adminDataContext = createContext();
const AdminContext = ({ children }) => {
  let [admindata, setAdminData] = useState(null);
  let { serverUrl } = useContext(authDataContext);


 let getAdmin = async () => {
      try {
        let result = await axios.get(serverUrl + "/api/user/getAdmin", {withCredentials:true})
        console.log(result.data)
        setAdminData(result.data)
      } catch (error) {
        setAdminData(null)
        console.log("error hai admin context ke ander!", error)
      }
    }

    useEffect(() => {
      getAdmin()
    }, [])


     let value = {
      admindata, setAdminData,getAdmin
    }
  return (

    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
};

export default AdminContext;
