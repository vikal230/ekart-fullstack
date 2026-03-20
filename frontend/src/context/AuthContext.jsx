import React, { createContext } from "react";
export const authDataContext = createContext();
function AuthContext({ children }) {
  let serverUrl = "https://ekart-fullstack-l0vz.onrender.com";

  let value = {
    serverUrl,
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
