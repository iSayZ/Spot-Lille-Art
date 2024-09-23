import "./styles/Contact.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import myAxios from "../services/myAxios";
import PopupAnswer from "../components/PopupAnswer/PopupAnswer";

function Contact() {
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    content: "",
  });
  const [confidentiality, setConfidentiality] = useState(false);
  const [statut, setStatut] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const stateStatut =
    statut === "Votre message a bien été envoyé."
      ? "state-statut"
      : "state-statut error";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confidentiality) {
    try {
      // debugger;
        await myAxios.post("/api/mails/contact", {
          name: `${formData.firstname} ${formData.lastname}`,
          to: formData.email,
          content: formData.content,
        });
        setStatut("Votre message a bien été envoyé.");
        setFormData({
          lastname: "",
          firstname: "",
          email: "",
          content: "",
        });
        setConfidentiality(false);
        // // SHOW POPUP
        setShowPopup(true);
    } catch (error) {
      console.error(error)
    }
    } else if (!confidentiality) {
      setStatut("Veuillez accepter la politique de confidentialité.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleShowPopupEnd = () => {
    navigate("/");
  };

  return (
    <div className="contact-container">
      <div className="contact-img-container">
        <img
          className="contact-img"
          src="/assets/images/artworks/artwork8.png"
          alt="street art représentant une tête de guépard robotisée"
        />
      </div>
      <form className="contact-formulaire" onSubmit={handleSubmit}>
        <h2 className="contact-title">Contact</h2>
        <div className="field">
          <input
            name="lastname"
            type="text"
            className="input-default"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Nom"
            required
          />
          <div className="line" />
        </div>
        <div className="field">
          <input
            name="firstname"
            type="text"
            className="input-default"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Prénom"
            required
          />
          <div className="line" />
        </div>
        <div className="field">
          <input
            name="email"
            type="email"
            className="input-default"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <div className="line" />
        </div>
        <div className="field">
          <textarea
            type="text"
            name="content"
            className="input-default"
            value={formData.content}
            onChange={handleChange}
            placeholder="Votre demande"
            rows="8"
            cols="40"
            required
          />
          <div className="line" />
        </div>
        <div className="field confidentiality">
          <input
            type="checkbox"
            id="confidentialite"
            value={confidentiality}
            checked={confidentiality}
            onChange={() => setConfidentiality(!confidentiality)}
          />
          <label htmlFor="confidentialite" id="confidentialite">
            J'accepte la politique de confidentialité
          </label>
        </div>
        {statut && <p className={stateStatut}>{statut}</p>}
        <button type="submit" className="btn">
          Envoyer
        </button>
      </form>
      {showPopup && (
        <PopupAnswer
          title="Confirmation de votre demande"
          content="Votre message a bien été envoyé. Vous allez recevoir un email de confirmation. Notre équipe revient vers vous dans les plus brefs délais."
          choiceTwo="Fermer"
          roleTwo={handleShowPopupEnd}
        />
      )}
    </div>
  );
}

export default Contact;
