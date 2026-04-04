import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
// import { Navigate } from "react-router-dom";


export const userDataContext = createContext();

const UserContext =  ({ children }) => {
  let [userData, setUserData] = useState("");
  let [isCheckingAuth, setIsCheckingAuth] = useState(true);
  let { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    setIsCheckingAuth(true);
    try {
      let result = await axios.post(serverUrl + "/api/user/getCurrentUser", {}, {
        withCredentials: true,
      });
      setUserData(result.data);
      // console.log(result.data);
    } catch (error) {
      setUserData(null);
      console.log("error hai!", error)
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  let value = {
    userData,
    setUserData,
    getCurrentUser,
    isCheckingAuth,
  };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
