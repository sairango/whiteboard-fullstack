import { useState, useEffect } from "react";
import authContext from "./auth-context";

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const authContextValue = {
    isAuthenticated,
    login,
    logout,
  };

  if (isLoading) {
    return null; 
  }

  return (
    <authContext.Provider value={authContextValue}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
