import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Register.css";
import ReCAPTCHA from "react-google-recaptcha";
import myAxios from "../services/myAxios";
import { useAuth } from "../contexts/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    pseudo: "",
    lastname: "",
    firstname: "",
    email: "",
    postcode: "",
    city: "",
    pwd: "",
    confPwd: "",
    date: "",
  });

  useEffect(() => {
    if (auth.account) {
      navigate("/");
    }
  }, [auth, navigate]);

  useEffect(() => {
    const getDate = () => {
      // */////////////////////////////// Get the date of the day formated for BDD ////////////////////////////*
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: formattedDate,
      }));
    };

    getDate();
  }, []);

  // TO CHECK PASSWORDS ARE CORRECTLY WRITTEN
  const [samePwd, setSamePwd] = useState("");

  // TO HIDE AND SHOW PASSWORDS
  const [pwdVisible, setPwdVisible] = useState("password");
  const [confPwdVisible, setConfPwdVisible] = useState("password");

  // TO GET CITIES WITH THE POSTCODE
  const [cities, setCities] = useState([]);

  // ERROR MESSAGE FOR WRONG EMAIL
  const [emailError, setEmailError] = useState("");

  // ERROR MESSAGE FOR WRONG PASSWORD
  const [pwdError, setPwdError] = useState("");

  // */////////////////////////////// Get the date of the day formatted for BDD ////////////////////////////*
  useEffect(() => {
    const getDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
      setFormData((prevFormData) => ({
        ...prevFormData,
        date: formattedDate,
      }));
    };

    getDate();
  }, []);

  // TOGGLE VISIBILITY PASSWORD
  const toggleVisibilityPwd = () => {
    if (pwdVisible === "password") {
      setPwdVisible("text");
    } else {
      setPwdVisible("password");
    }
  };

  const toggleVisibilityConf = () => {
    if (confPwdVisible === "password") {
      setConfPwdVisible("text");
    } else {
      setConfPwdVisible("password");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // TO VERIFY AN EMAIL
    if (name === "email") {
      const emailPattern = /^[^\s][\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,3}$/;
      setEmailError(emailPattern.test(value) ? "" : "Adresse email invalide");
    } else if (name === "pwd") {
      const pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      setPwdError(
        pwdPattern.test(value)
          ? ""
          : "Votre mot de passe doit contenir au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
    }

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // POSTCODE TO CITY
  const handlePostCodeChange = async (e) => {
    const newPostCode = e.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, postcode: newPostCode }));

    if (newPostCode.length === 5) {
      try {
        const response = await fetch(
          `https://api.zippopotam.us/fr/${newPostCode}`
        );
        if (response.ok) {
          const data = await response.json();
          const places = data.places.map((place) => place["place name"]);
          setCities(places);
          setFormData((prevFormData) => ({ ...prevFormData, city: places[0] }));
        } else {
          setCities([]);
          setFormData((prevFormData) => ({ ...prevFormData, city: "" }));
        }
      } catch (error) {
        setCities([]);
        setFormData((prevFormData) => ({ ...prevFormData, city: "" }));
      }
    }
  };

  const [filledForm, setFilledForm] = useState(false);
  const [captchaVal, setCaptchaVal] = useState(null);

  const handleChangeCaptcha = (val) => {
    setCaptchaVal(val);
  };

  const condition =
    pwdError !== "" || formData.pwd !== formData.confPwd || emailError !== "";

  // TO CREATE A NEW MEMBER ACCOUNT/SEND DATA TO DDB
  const handleSubmit = async (e) => {
    e.preventDefault();

    // PASSWORD VERIFICATION
    if (formData.pwd !== formData.confPwd) {
      setSamePwd("Les mots de passe ne correspondent pas");
      return;
    }
    if (condition) return;
    setSamePwd("");
    setFilledForm(true);
    if (!captchaVal) return;
    try {
      const response = await myAxios.post("/api/members/new-member", {
        ...formData,
        avatar: "/assets/images/icons/profile.png",
      });
      console.info("Profil enregistré", response.data);
      navigate("/connexion");
      await myAxios.post("/api/mails/welcome", {
        to: formData.email,
        name: formData.firstname,
      });
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  return (
    <div className="register-container">
      <div className="inscription-img-container">
        <img
          className="inscription-img"
          src="/assets/images/inscription-img.png"
          alt="street art représentant un DJ"
        />
      </div>
      {filledForm ? (
        <form className="register-formulaire captcha" onSubmit={handleSubmit}>
          <h2 className="register-title captcha">Inscription</h2>
          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="6LdvAwQqAAAAADwQFaB-HUAytJjZxlo8ZCxRBbq5"
              onChange={(val) => handleChangeCaptcha(val)}
            />
            <button type="submit" className="btn" disabled={!captchaVal}>
              Envoyer
            </button>
          </div>
        </form>
      ) : (
        <form className="register-formulaire" onSubmit={handleSubmit}>
          <h2 className="register-title">Inscription</h2>
          <div className="field">
            <input
              type="text"
              name="pseudo"
              className="input-default"
              placeholder="Pseudo"
              maxLength="15"
              value={formData.pseudo}
              onChange={handleChange}
              required
            />
            <div className="line" />
          </div>

          <div className="field">
            <input
              type="text"
              name="lastname"
              className="input-default"
              placeholder="Nom"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <div className="line" />
          </div>

          <div className="field">
            <input
              type="text"
              name="firstname"
              className="input-default"
              placeholder="Prénom"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <div className="line" />
          </div>
          <div className="email">
            <div className="field">
              <input
                type="email"
                name="email"
                className="input-default"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="line" />
            </div>
            <div className="error">
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
          </div>

          <div className="field">
            <input
              type="text"
              name="postcode"
              className="input-default"
              placeholder="Code Postal"
              maxLength="5"
              value={formData.postcode}
              onChange={handlePostCodeChange}
              required
            />
            <div className="line" />
          </div>

          <div className="field">
            <select
              type="select"
              name="city"
              className="input-default city-option"
              placeholder="Ville"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">Ville</option>
              {cities.map((city) => (
                <option key={`${formData.postcode}-${city}`} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="line" />
          </div>

          <div className="field field-password input-default">
            <input
              type={pwdVisible}
              name="pwd"
              className="input-default"
              placeholder="Mot de passe"
              maxLength="25"
              value={formData.pwd}
              onChange={handleChange}
              required
            />
            <div className="line" />
            <div className="password-visible">
              <img
                src={
                  pwdVisible === "text"
                    ? "/assets/images/icons/oeil-barre.png"
                    : "/assets/images/icons/oeil-ouvert.png"
                }
                className="eye-pwd"
                role="presentation"
                onClick={toggleVisibilityPwd}
                alt={
                  pwdVisible === "text"
                    ? "oeil barré pour cacher le mot de passe"
                    : "oeil ouvert pour afficher le mot de passe"
                }
              />
            </div>
          </div>
          {pwdError && <p className="error-message">{pwdError}</p>}

          <div className="field field-password input-default">
            <input
              type={confPwdVisible}
              name="confPwd"
              className="input-default"
              placeholder="Confirmer le mot de passe"
              maxLength="25"
              value={formData.confPwd}
              onChange={handleChange}
              required
            />
            <div className="password-visible">
              <img
                src={
                  confPwdVisible === "text"
                    ? "/assets/images/icons/oeil-barre.png"
                    : "/assets/images/icons/oeil-ouvert.png"
                }
                className="eye-pwd"
                role="presentation"
                onClick={toggleVisibilityConf}
                alt={
                  confPwdVisible === "text"
                    ? "oeil barré pour cacher le mot de passe"
                    : "oeil ouvert pour afficher le mot de passe"
                }
              />
            </div>
            <div className="line" />
          </div>

          {samePwd && <p className="error-message">{samePwd}</p>}
          <button type="submit" className="btn">
            M'inscrire
          </button>
        </form>
      )}
    </div>
  );
}

export default Register;
