import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Menu from '@mui/icons-material/Menu';
import Camera from '@mui/icons-material/AddAPhoto';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useBurgerMenu } from '../../contexts/BurgerMenuContext';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MenuListMobil from '../MenuList/MenuListMobil/MenuListMobil';

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(null);
  const ref = React.useRef(null);
  const [ OpenMenuList, setOpenMenuList ] = useState(false);

    const navigate = useNavigate()

    const { isMenuOpen, handleOpenMenu } = useBurgerMenu();

  const goToCamera = () => {
    navigate("/ajouter-oeuvre/camera")
  }

  const handleClick = () => {
    setOpenMenuList(!OpenMenuList)
  }

  return (
    <div className='navbar-bottom'>
        {OpenMenuList && <MenuListMobil setOpenMenuList={setOpenMenuList} />}
        {isMenuOpen && <BurgerMenu />}
        <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 3 }} elevation={4}>
            <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            >
            <BottomNavigationAction icon={<Menu fontSize="large" />} onClick={handleOpenMenu}/>
            <BottomNavigationAction icon={<Camera fontSize="large" />} onClick={() => goToCamera()} />
            <BottomNavigationAction icon={<AccountCircle fontSize="large" />} onClick={() => handleClick()} />
            </BottomNavigation>
        </Paper>
        </Box>
    </div>
  );
}
