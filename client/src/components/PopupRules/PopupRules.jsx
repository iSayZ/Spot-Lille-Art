import PropTypes from "prop-types";
import "./PopupRules.css"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

function PopupRules({ setShowPopup }) {

    const navigate = useNavigate();
    const [ dontShowPopup, setDontShowPopup ] = useState(false);

    const handleChange = (e) => {
        setDontShowPopup(e.target.checked)
    }

    const handleClick = () => {
        navigate("/a-propos#regles")
    }

    const handleExit = () => {
        if (dontShowPopup) {
            Cookies.set('popupSLA', 'dont-show', { expires: 3650 })
        }
        setShowPopup(false)
    }

    return (
        <div className="popup-rules-container">
            <div className="popup-rules">
                <div className="rules-title">
                    <h2>SLA c'est quoi ?</h2>
                </div>
                <button type="button" id="exit-popup" onClick={handleExit}><img src="/assets/images/icons/croix-black.svg" alt="Fermer le popup" /></button>
                <p id="rules-content">
                    Bienvenue sur Spot Lille Art, votre destination en ligne pour découvrir et partager l'art urbain de la Métropole Européenne de Lille (MEL). Que vous soyez un artiste émergent, un passionné d'art urbain ou simplement curieux de découvrir de nouvelles œuvres, notre plateforme participative est là pour vous.
                </p>
                <button type="button" className="btn popup-btn" onClick={handleClick}>Comment participer ?</button>
                <div className="dont-show-again">
                    <input type="checkbox" id="input-dont-show-again" value={dontShowPopup} onChange={handleChange} />
                    <label htmlFor="input-dont-show-again">Ne plus afficher ce message.</label>
                </div>
            </div>
        </div>
    )
}

PopupRules.propTypes = {
    setShowPopup: PropTypes.func.isRequired,
};

export default PopupRules;