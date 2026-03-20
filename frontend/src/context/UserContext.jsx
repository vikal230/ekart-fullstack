import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authcontext";
import axios from "axios";
// import { Navigate } from "react-router-dom";


export const userDataContext = createContext();

const UserContext =  ({ children }) => {
  let [userData, setUserData] = useState("");
  let { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      let result = await axios.post(serverUrl + "/api/user/getCurrentUser", {}, {
        withCredentials: true,
      });
      setUserData(result.data);
      // console.log(result.data);
    } catch (error) {
      setUserData(null);
      console.log("error hai!", error)
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  let value = {
    userData,
    setUserData,
    getCurrentUser,
  };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
