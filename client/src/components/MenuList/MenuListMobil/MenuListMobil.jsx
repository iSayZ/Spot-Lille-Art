import "../MenuList.css";
import PropTypes from "prop-types";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

function MenuListMobil({ setOpenMenuList }) {

    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const menuList = useRef();

    const handleLogout = () => {
        logout();
        setOpenMenuList(false);
    }

    const goToProfile = () => {
        navigate(`/profil/${auth.account.id_member_fk}`)
        setOpenMenuList(false);
    }

    const goToRegister = () => {
        navigate("/inscription")
        setOpenMenuList(false);
    }

    const goToLogin = () => {
        navigate("/connexion")
        setOpenMenuList(false);
    }

    const handleOutsideClick = () => {
        setOpenMenuList(false);
      };
    
    return (
        <ClickAwayListener onClickAway={handleOutsideClick}>
            <div ref={menuList} className="menu-list mobil">
                {auth.account ? 
                <>
                    <button type="button" onClick={goToProfile} className="menu-item">
                        <p>Mon profil</p>
                    </button>
                    <button type="button" onClick={handleLogout} className="menu-item">
                        <p>Se déconnecter</p>
                    </button>
                </>
                :
                <>
                    <button type="button" onClick={goToRegister} className="menu-item">
                        <p>Inscription</p>
                    </button>
                    <button type="button" onClick={goToLogin} className="menu-item">
                        <p>Connexion</p>
                    </button>
                </>
                }
            </div>
        </ClickAwayListener>
        )
}

MenuListMobil.propTypes = {
    setOpenMenuList: PropTypes.func.isRequired
};

export default MenuListMobil;