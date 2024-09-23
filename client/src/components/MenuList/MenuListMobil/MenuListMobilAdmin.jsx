import "../MenuList.css";
import PropTypes from "prop-types";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";

function MenuListMobilAdmin({ setOpenMenuList }) {
  const { logout } = useAuth();
  const menuList = useRef();

  const handleLogout = () => {
    logout();
    setOpenMenuList(false);
  };

  const handleOutsideClick = () => {
    setOpenMenuList(false);
  };

  return (
    <ClickAwayListener onClickAway={handleOutsideClick}>
      <div ref={menuList} className="menu-list">
        <button type="button" onClick={handleLogout} className="menu-item">
          <p>Se déconnecter</p>
        </button>
      </div>
    </ClickAwayListener>
  );
}

MenuListMobilAdmin.propTypes = {
  setOpenMenuList: PropTypes.func.isRequired,
};

export default MenuListMobilAdmin;
