import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import Cookies from "js-cookie";
import CheckUserStatut from "../services/CheckUserStatut";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: Cookies.get("authToken"),
    account: Cookies.get("account"),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    const account = Cookies.get("account")
      ? JSON.parse(Cookies.get("account"))
      : null;

    if (token && account) {
      setAuth({ token, account });
    }
  }, []);

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("account");
    setAuth({ token: null, account: null });
    navigate("/connexion");
  };

  // Check if the user was banned or not
  useEffect(
    () => {
      const verify = async () => {
          if (auth.account) {
            if(await CheckUserStatut(auth) === "banned") {
              logout()
              navigate("/connexion");
            };
          };
      };
      const interval = setInterval(verify, 100000); // Check every 2 minutes

      // Clean the interval each time
      return () => clearInterval(interval);
    }, [auth, logout, navigate]
  );

  const contextValue = useMemo(
    () => ({ auth, setAuth, logout }),
    [auth, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
