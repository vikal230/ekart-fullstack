import React, { createContext } from "react";
export const authDataContext = createContext();
function AuthContext({ children }) {
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  let serverUrl = isLocalhost
    ? "http://localhost:3000"
    : import.meta.env.VITE_API_URL;
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
