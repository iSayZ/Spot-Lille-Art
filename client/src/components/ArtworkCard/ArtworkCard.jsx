import "./ArtworkCard.css";
import PropTypes from "prop-types";

function ArtworkCard({ artwork }) {
  return (
    <div className="artwork-card">
      <img src={artwork.picture} alt={artwork.title} />
      <div className={artwork.validate === 1 ? "artwork-info" : "artwork-info not-validated"}>
        <h3>{artwork.title}</h3>
        {artwork.validate === 0 && <p id="not-validated">En attente de validation</p>}
      </div>
    </div>
  );
}

ArtworkCard.propTypes = {
  artwork: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    validate: PropTypes.number.isRequired,
  }).isRequired,
};

export default ArtworkCard;
