import { createContext, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import myAxios from "../services/myAxios";

const AdminContext = createContext();

export function AdminProvider({ children }) {

    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAccess = async () => {
          try {
            await myAxios.get(`/api/admin/verify`, {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            });
          } catch (error) {
            if (error.response.data.access === "denied") {
              navigate("/erreur");
            }
          }
        };
    
        verifyAccess();
      }, [auth, navigate]);

  const contextValue = useMemo(
    () => ({
    }),
    []
  );

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAdmin = () => useContext(AdminContext);
