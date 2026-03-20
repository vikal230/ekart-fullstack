import React, { createContext } from "react";
export const authDataContext = createContext();
function AuthContext({ children }) {
  let serverUrl = import.meta.env.VITE_API_URL;
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
