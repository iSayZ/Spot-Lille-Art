import { Link, useLoaderData } from "react-router-dom";
import ArtworkCard from "../../components/ArtworkCard/ArtworkCard";
import "./styles/ArtworkValidation.css";

function ArtworkValidation() {
  const artworksNV = useLoaderData();

  return (
    <div className="artworksnv-container">
      <h3 className="titles-admin">Oeuvres en attente de validation</h3>
      <div className="artworksnv-cards">
        {artworksNV && artworksNV.length > 0 ? (
          artworksNV.map((artworksNotValidate) => (
            <Link
              to={`/admin/oeuvre-non-validee/${artworksNotValidate.id_artwork}`}
              key={artworksNotValidate.id_artwork}
            >
              <ArtworkCard artwork={artworksNotValidate} />
            </Link>
          ))
        ) : (
          <p className="no-artworks-waiting">
            Aucune oeuvre en attente de validation
          </p>
        )}
      </div>
    </div>
  );
}

export default ArtworkValidation;