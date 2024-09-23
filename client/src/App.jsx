import "./App.css";
import { Outlet } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBarBottom from "./components/NavBarBottom/NavBarBottom";
import { BurgerMenuProvider } from "./contexts/BurgerMenuContext";
import { BadgeProvider } from "./contexts/BadgeContext";
import { AuthProvider } from "./contexts/AuthContext";
import AsideMenu from "./components/AsideMenu/AsideMenu";
import TopBar from "./components/TopBar/TopBar";
//  Road Map
import "leaflet/dist/leaflet.css";

function App() {
  
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <AuthProvider>
      <BurgerMenuProvider>
        <BadgeProvider>
          <TopBar title="Spot Lille Art" />
          <AsideMenu />
          <main className="main-container">
            <Outlet />
          </main>
          {isMobile && <NavBarBottom />}
        </BadgeProvider>
      </BurgerMenuProvider>
    </AuthProvider>
  );
}

export default App;
