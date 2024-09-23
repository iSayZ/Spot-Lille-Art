import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import myAxios from "../services/myAxios";

function PwdEdition() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [pwdVisible, setPwdVisible] = useState("password");
  const [pwd, setPwd] = useState("");
  const [confPwd, setConfPwd] = useState("");
  const [status, setStatus] = useState("");
  const [editionSent, setEditionSent] = useState(false);
  const [errorEdition, setErrorEdition] = useState(false);
  const [pwdError, setPwdError] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await myAxios.get(
          `/api/recover/verify-reset-token/${token}`,
          {
            token,
          }
        );
        console.info(response.data);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    verifyToken();
  }, [token, navigate]);

  // TOGGLE VISIBILITY PASSWORD
  const toggleVisibilityPwd = () => {
    if (pwdVisible === "password") {
      setPwdVisible("text");
    } else {
      setPwdVisible("password");
    }
  };

  const handleChangePwd = (e) => {
    setPwd(e.target.value);

    const pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    setPwdError(
      pwdPattern.test(pwd)
        ? ""
        : "Votre mot de passe doit contenir au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial."
    );
  };

  const handleChangeConfPwd = (e) => {
    setConfPwd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwdError !== "") {
      setStatus(
        "Votre mot de passe doit contenir au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
      return;
    }

    if (pwd === confPwd) {
      try {
        // API call to request a connection
        const response = await myAxios.post(`/api/recover/${token}`, {
          pwd,
        });
        console.info(response.data.message);
        setEditionSent(true);
        setStatus(response.data.message);
      } catch (err) {
        console.error(err);
        setEditionSent(true);
        setErrorEdition(true);
        setStatus(err.response.data.message);
      }
    } else {
      setStatus("Les mots de passes ne correspondent pas.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-img-container">
        <img
          className="login-img"
          src="/assets/images/login-img.png"
          alt="street art représentant un DJ"
        />
      </div>
      {editionSent ? (
        <h2 className="login-formulaire status-recover">
          {status} {errorEdition && <Link to="/contact">support.</Link>}
        </h2>
      ) : (
        <form onSubmit={handleSubmit} className="login-formulaire">
          <h2 className="login-title">Récupération de mot de passe</h2>
          <div className="field field-password">
            <input
              className="input-default"
              type={pwdVisible}
              value={pwd}
              onChange={handleChangePwd}
              placeholder="Saisissez votre nouveau mot de passe"
            />
            <div className="line" />
            <div className="password-visible">
              {pwdVisible === "text" ? (
                <img
                  src="/assets/images/icons/oeil-barre.png"
                  className="eye-pwd"
                  role="presentation"
                  onClick={toggleVisibilityPwd}
                  alt="oeil barré pour cacher le mot de passe"
                />
              ) : (
                <img
                  src="/assets/images/icons/oeil-ouvert.png"
                  className="eye-pwd"
                  role="presentation"
                  onClick={toggleVisibilityPwd}
                  alt="oeil ouvert pour afficher le mot de passe"
                />
              )}
            </div>
          </div>
          <div className="field field-password">
            <input
              className="input-default"
              type={pwdVisible}
              value={confPwd}
              onChange={handleChangeConfPwd}
              placeholder="Confirmez votre nouveau mot de passe"
            />
            <div className="line" />
            <div className="password-visible">
              {pwdVisible === "text" ? (
                <img
                  src="/assets/images/icons/oeil-barre.png"
                  className="eye-pwd"
                  role="presentation"
                  onClick={toggleVisibilityPwd}
                  alt="oeil barré pour cacher le mot de passe"
                />
              ) : (
                <img
                  src="/assets/images/icons/oeil-ouvert.png"
                  className="eye-pwd"
                  role="presentation"
                  onClick={toggleVisibilityPwd}
                  alt="oeil ouvert pour afficher le mot de passe"
                />
              )}
            </div>
          </div>
          {pwdError && <p className="error-message recover">{pwdError}</p>}
          <button type="submit" className="btn" disabled={pwdError !== ""}>
            Confirmer
          </button>
          {status && <p className="error-message recover">{status}</p>}
        </form>
      )}
    </div>
  );
}

export default PwdEdition;
