import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: sessionStorage.getItem("auth_token") !== null,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
});

export default AuthContext;
