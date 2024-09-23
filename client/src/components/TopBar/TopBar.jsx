import "./TopBar.css";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import { useAuth } from "../../contexts/AuthContext";

function TopBar({ title }) {
  const { auth } = useAuth();

  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate(`/`);
  };

  return (
    <>
      <div
        className="top-bar mobile"
        onClick={handleGoHome}
        role="presentation"
      >
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
        {auth.account ? (
          <ProfileDetails />
        ) : (
          <div className="right-container">
            <Link to="/inscription">
              <button type="button" className="register-btn btn">
                Inscription
              </button>
            </Link>
            <Link to="/connexion">
              <button type="button" className="login-btn btn">
                Connexion
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopBar;
