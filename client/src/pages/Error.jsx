import "./styles/Error.css"
import { Link } from "react-router-dom";

function Error() {
    return (
        <div className="error-page">
            <div className="error-container">
                <h2>Oops ! Une erreur est survenue.</h2>
                <p>Il semble que la page que vous recherchez n'est pas accessible. Cela peut être dû à une URL incorrecte, des permissions insuffisantes, ou une erreur inattendue. Veuillez vérifier l'URL, retourner à la page d'accueil, ou contacter l'administrateur du site si le problème persiste.</p>
                <Link className="btn error-btn" to="/">Revenir au site</Link>
            </div>
        </div>
    )
}

export default Error;