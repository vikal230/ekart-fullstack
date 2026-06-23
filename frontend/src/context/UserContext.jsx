import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();
const SESSION_HINT_KEY = "ekart-user-session";

const UserContext = ({ children }) => {
  const publicPaths = ["/login", "/signup"];
  const isPublic = publicPaths.includes(window.location.pathname.toLowerCase());
  
  let [userData, setUserData] = useState("");
  let [isCheckingAuth, setIsCheckingAuth] = useState(!isPublic);
  let { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    setIsCheckingAuth(!isPublic);
    try {
      let result = await axios.post(serverUrl + "/api/user/getCurrentUser", {}, {
        withCredentials: true,
      });
      setUserData(result.data);
      sessionStorage.setItem(SESSION_HINT_KEY, "true");
    } catch (error) {
      setUserData(null);
      sessionStorage.removeItem(SESSION_HINT_KEY);
      console.log("error hai!", error);
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