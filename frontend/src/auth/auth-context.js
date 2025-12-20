import { createContext } from "react";

const authContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export default authContext;
