import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import myAxios from "../../services/myAxios";
import "./styles/ArtworkReportedDetails.css";

function ArtworkReportedDetails() {

  const artworksReportedByID = useLoaderData();
  const navigate = useNavigate();

  // VALIDATE A NEW ARTWORK
  const handleValidate = async () => {
    // Validate if necessary properties are present

    try {
      const response = await myAxios.post(
        `/api/artworks/admin/reported/${artworksReportedByID.id_artwork}/validate`
      );
      navigate(`/admin/oeuvres-signalees`);
      console.info("Oeuvre conservée", response.data);
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  // DENY A NEW ARTWORK
  const handleDeny = async () => {
    try {
      const response = await myAxios.delete(
        `/api/artworks/admin/reported/${artworksReportedByID.id_artwork}/deny`
      );
      navigate(`/admin/oeuvres-signalees`);
      console.info("Oeuvre supprimée", response.data);
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  // GET THE ADRESS
  const [city, setCity] = useState(null);

  // StreetMap API for get the adress with latitude and longitude
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${artworksReportedByID.latitude}&lon=${artworksReportedByID.longitude}&zoom=10&addressdetails=1`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.address) {
        setCity(data.address.city || data.address.town || data.address.village);
      } else {
        setCity("inconnu");
      }
    });

  return (
    <div className="artworkReported-container">
      <img
        className="artworkReported-img"
        src={artworksReportedByID.picture}
        alt={artworksReportedByID.title}
      />
      <div className="artworkReportedDetails-info">
        <h5 className="title-info">Informations sur l'oeuvre :</h5>
        <div className="title">
        <p>Titre : </p>
        <p className="focus-text title">{" "}{artworksReportedByID.title}</p>
      </div>
        <div className="user">
          <p>Ajoutée par : </p>

          <p className="focus-text pseudo">
              {artworksReportedByID.pseudo}
          </p>
        </div>
        <div className="city">
          <p>Ville :</p>
          <p className="focus-text cityname">{city}</p>
        </div>
        <div className="date">
          <p>Le : </p>
          <p className="focus-text datepic">
            {artworksReportedByID.date_creation}
          </p>
        </div>
      </div>
      <div className="artworkReportedDetails-btn">
        <button
          type="button"
          onClick={handleValidate}
          className="validate-btn btn"
        >
          Conserver
        </button>
        <button type="button" onClick={handleDeny} className="deny-btn btn">
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default ArtworkReportedDetails;
