import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, _setUser] = useState(localStorage.getItem("CURRENT_USER"));
  const [token, _setToken] = useState(Cookies.get("token"));

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      Cookies.set("token", token, { expires: 7 });
    } else {
      Cookies.remove("token");
    }
  };

  const setUser = (user) => {
    _setUser(user);
    if (user) {
      localStorage.setItem("CURRENT_USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("CURRENT_USER");
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      _setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
