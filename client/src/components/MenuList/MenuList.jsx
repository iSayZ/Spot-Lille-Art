import "./MenuList.css";
import PropTypes from "prop-types";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function MenuList({ setOpenMenuList }) {

    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const menuList = useRef();

    const handleLogout = () => {
        logout();
    }

    const goToProfile = () => {
        navigate(`/profil/${auth.account.id_member_fk}`)
    }

    const handleOutsideClick = () => {
        setOpenMenuList(false);
      };
    
    return (
        <ClickAwayListener onClickAway={handleOutsideClick}>
            <div ref={menuList} className="menu-list">
                <button type="button" onClick={goToProfile} className="menu-item">
                    <p>Mon profil</p>
                </button>
                <button type="button" onClick={handleLogout} className="menu-item">
                    <p>Se déconnecter</p>
                </button>
            </div>
        </ClickAwayListener>
        )
}

MenuList.propTypes = {
    setOpenMenuList: PropTypes.func.isRequired
};

export default MenuList;