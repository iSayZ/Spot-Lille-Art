import "./TopBar.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/AuthContext";

function TopBarAdmin({ title }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="top-bar mobile">
        <h2 className="title">{title}</h2>
        <div className="splash" />
      </div>
      <div className="top-bar desktop">
        <div className="left-container">
          <Link to="/">
            <img
              src="/assets/images/logo.svg"
              alt="Logo de Spot Lille Art"
              className="logo"
            />
          </Link>
          <Link to="/">
            <h2 className="title">Spot Lille Art</h2>
          </Link>
        </div>
          <h3 className="admin-page-title">Panel Administrateur</h3>

        <div className="right-container">
          <Link to="/">
            <button
              type="button"
              className="login-btn btn"
              onClick={handleLogout}
            >
              Me deconnecter
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

TopBarAdmin.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopBarAdmin;
