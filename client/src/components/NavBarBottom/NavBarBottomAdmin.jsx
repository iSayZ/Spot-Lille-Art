import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Menu from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useBurgerMenu } from "../../contexts/BurgerMenuContext";
import BurgerMenuAdmin from "../BurgerMenu/BurgerMenuAdmin";
import MenuListMobilAdmin from "../MenuList/MenuListMobil/MenuListMobilAdmin";

export default function FixedBottomNavigationAdmin() {
  const [value, setValue] = React.useState(null);
  const ref = React.useRef(null);
  const [OpenMenuList, setOpenMenuList] = useState(false);

  const { isMenuOpen, handleOpenMenu } = useBurgerMenu();

  const handleClick = () => {
    setOpenMenuList(!OpenMenuList);
  };

  return (
    <div className="navbar-bottom">
      {OpenMenuList && <MenuListMobilAdmin setOpenMenuList={setOpenMenuList} />}
      {isMenuOpen && <BurgerMenuAdmin />}
      <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 3 }}
          elevation={4}
        >
          <BottomNavigation
            showLabels={false}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              icon={<Menu fontSize="large" />}
              onClick={handleOpenMenu}
            />
            <BottomNavigationAction
              icon={<AccountCircle fontSize="large" />}
              onClick={() => handleClick()}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}
