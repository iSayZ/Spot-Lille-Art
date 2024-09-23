import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./styles/Login.css";
import myAxios from "../services/myAxios";

function Login() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdVisible, setPwdVisible] = useState("password");
  const [rememberMail, setRememberMail] = useState(false);
  const [connexionError, setConnexionError] = useState("");

  useEffect(() => {
    if (auth.account) {
      navigate("/");
    }
  }, [auth, navigate]);

  // IF REMEMBER MAIL IS TRUE, CHECK ON THE COOKIE THE LAST MAIL ADRESS
  useEffect(() => {
    const lastEmail = Cookies.get("lastEmail");
    if (lastEmail) {
      setRememberMail(true);
      setEmail(lastEmail);
    }
  }, []);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePwd = (e) => {
    setPwd(e.target.value);
  };

  // TOGGLE VISIBILITY PASSWORD
  const toggleVisibilityPwd = () => {
    if (pwdVisible === "password") {
      setPwdVisible("text");
    } else {
      setPwdVisible("password");
    }
  };

  const handleRememberMail = () => {
    if (rememberMail) {
      setRememberMail(false);
      Cookies.remove("lastEmail");
    } else {
      setRememberMail(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rememberMail) {
      Cookies.set("lastEmail", email, { expires: 3650 });
    }

    try {
      // API call to request a connection
      const response = await myAxios.post(
        `/api/login`,
        {
          email,
          pwd,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const { token, account } = response.data;

        // Store the token and account information in localStorage
        Cookies.set("authToken", token, { expires: 1 / 24 }); // Expires in 1 hour
        Cookies.set("account", JSON.stringify(account), { expires: 1 / 24 }); // Expires in 1 hour

        setAuth({ token, account });
        if (account.assignment === "user") {
          navigate(`/profil/${account.id_member_fk}`);
        } else if (account.assignment === "admin") {
          navigate("/admin/statistiques");
        }
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
      setConnexionError(err.response.data.message);
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
      <form onSubmit={handleSubmit} className="login-formulaire">
        <div className="connexion-field">
          <h2 className="login-title">Connexion</h2>
          <div className="field">
            <input type="email" className="input-default login-field" placeholder="E-mail" onChange={handleChangeEmail} value={email}/>
            <div className="line" />
          </div>
          <div className="field field-password input-default">
          <input
            type={pwdVisible}
            name="pwd"
            className="input-default login-field"
            placeholder="Mot de passe"
            maxLength="25"
            value={pwd}
            onChange={handleChangePwd}
            required
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
            {connexionError && <div><p style={{ color: "red", textAlign: "center", fontSize: "0.8em"}}>{connexionError}</p></div>}
          <div className="stay-connected">
            <input
              type="checkbox"
              id="stay-connected-checkbox"
              checked={rememberMail}
              value={rememberMail}
              onChange={handleRememberMail}
            />
            <label htmlFor="stay-connected-checkbox">Se souvenir de moi</label>
          </div>
          <button type="submit" className="btn">
            Me connecter
          </button>
          <Link to="/recuperation-mdp" className="link-recover-pwd">
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="inscription-field">
          <Link to="/inscription" className="link-inscription">
            Pas encore inscrit ? C'est par ici
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;