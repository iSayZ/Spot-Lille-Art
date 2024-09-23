import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import myAxios from "../../services/myAxios";
import "./styles/ArtworkValidationDetails.css";

function ArtworksValidationDetails() {

  const navigate = useNavigate();
  const artworksNVD = useLoaderData();

  // VALIDATE A NEW ARTWORK
  const handleValidate = async () => {
    // Validate if necessary properties are present

    try {
      const response = await myAxios.post(
        `/api/artworks/admin/not-validate/${artworksNVD.id_artwork}/validate`,
        {
          id: artworksNVD.id_artwork,
          dateOperation: new Date().toISOString(),
          idAccount: artworksNVD.id_account,
          idMember: artworksNVD.id_member,
        }
      );

      navigate(`/admin/oeuvres-a-valider`);
      console.info("Oeuvre validée", response.data);
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  // DENY A NEW ARTWORK
  const handleDeny = async () => {
    try {
      const response = await myAxios.delete(
        `/api/artworks/admin/not-validate/${artworksNVD.id_artwork}/deny`
      );
      navigate(`/admin/oeuvres-a-valider`);
      console.info("Oeuvre refusée", response.data);
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  // GET THE ADRESS
  const [city, setCity] = useState(null);

  // StreetMap API for get the adress with latitude and longitude
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${artworksNVD.latitude}&lon=${artworksNVD.longitude}&zoom=10&addressdetails=1`;

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
    <div className="artworkNV-container">
  
      <img
        className="artworkNV-img"
        src={artworksNVD.picture}
        alt={artworksNVD.title}
      />
      <div className="artworkNVDetails-info">
        <h5 className="title-info">Informations sur l'oeuvre :</h5>

      <div className="artworksNV-title">
        <p>Titre : </p>
        <p className="focus-text title">{artworksNVD.title}</p>
</div>

        <div className="user">
          <p>Ajoutée par :</p>

          <p className="focus-text pseudo">
            <Link to={`/profile/${artworksNVD.id_member}`}>
              {artworksNVD.pseudo}
            </Link>
          </p>
        </div>
        <div className="city">
          <p>Ville : </p>
          <p className="focus-text cityname">{city}</p>
        </div>
        <div className="date">
          <p>Le : </p>
          <p className="focus-text datepic">{artworksNVD.date_creation}</p>
        </div>
      </div>
      <div className="artworksNVDetails-btn">
        <button
          type="button"
          onClick={handleValidate}
          className="validate-btn btn"
        >
          Valider l'oeuvre
        </button>
        <button type="button" onClick={handleDeny} className="deny-btn btn">
          Refuser l'oeuvre
        </button>
      </div>
    </div>
  );
}

export default ArtworksValidationDetails;
