import { useState } from "react";
import myAxios from "../services/myAxios";

function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [confEmail, setConfEmail] = useState("");
  const [status, setStatus] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeConfEmail = (e) => {
    setConfEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === confEmail) {
      try {
        // API call to request a connection
        const response = await myAxios.post(`/api/recover`, {
          email,
        });
        setEmailSent(true);
        setStatus(response.data.message);
        console.info(response);
      } catch (err) {
        console.error(err);
        setStatus(err.response.data.message);
      }
    } else {
      setStatus("Les adresses e-mail ne correspondent pas.");
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
      {emailSent ? (
        <div className="login-formulaire">
          <h2 className="status-recover">{status}</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-formulaire">
          <h2 className="login-title">Mot de passe oublié</h2>
          <div className="field">
            <input
              className="input-default"
              type="text"
              value={email}
              onChange={handleChangeEmail}
              placeholder="Saisissez votre adresse mail"
            />
            <div className="line" />
          </div>
          <div className="field">
            <input
              className="input-default"
              type="text"
              value={confEmail}
              onChange={handleChangeConfEmail}
              placeholder="Confirmez votre adresse mail"
            />
            <div className="line" />
          </div>
          <button type="submit" className="btn">
            Confirmer
          </button>
          {status && <p className="error-message recover">{status}</p>}
        </form>
      )}
    </div>
  );
}

export default RecoverPassword;
