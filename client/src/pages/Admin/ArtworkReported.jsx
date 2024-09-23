import { useLoaderData, Link } from "react-router-dom";
import ArtworkCard from "../../components/ArtworkCard/ArtworkCard";
import "./styles/ArtworkReported.css";

function ArtworkReported() {
  const artworksReported = useLoaderData();

  return (
    <div className="artworksReported-container">
      <h3 className="titles-admin">Oeuvres signalées à vérifier</h3>
      <div className="artworksReported-cards">
        {artworksReported && artworksReported.length > 0 ? (
          artworksReported.map((artworkReported) => (
            <Link
              to={`/admin/oeuvre-a-valider/${artworkReported.id_artwork}`}
              key={artworkReported.id_artwork}
            >
              <ArtworkCard artwork={artworkReported} />
            </Link>
          ))
        ) : (
          <p className="no-artworks-reported">Aucune oeuvre signalée</p>
        )}
      </div>
    </div>
  );
}

export default ArtworkReported;