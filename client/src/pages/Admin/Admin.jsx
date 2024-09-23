import "./styles/Admin.css";
import { Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BurgerMenuProvider } from "../../contexts/BurgerMenuContext";
import { AuthProvider } from "../../contexts/AuthContext";
import { AdminProvider } from "../../contexts/AdminContext";
import AsideMenuAdmin from "../../components/AsideMenu/AsideMenuAdmin";
import NavBarBottomAdmin from "../../components/NavBarBottom/NavBarBottomAdmin";
import TopBarAdmin from "../../components/TopBar/TopBarAdmin";

function Admin() {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <AuthProvider>
      <AdminProvider>
        <BurgerMenuProvider>
          <TopBarAdmin title="Administrateur" />
          <AsideMenuAdmin />
          <main className="main-container">
            <Outlet />
          </main>
          {isMobile && <NavBarBottomAdmin />}
        </BurgerMenuProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default Admin;
