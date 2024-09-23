import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import myAxios from "../../services/myAxios";
import SearchRoadMap from "../SearchRoadMap/SearchRoadMap";

// Fix marker icon issues with Webpack
delete L.Icon.Default.prototype._getIconUrl;
/* eslint no-underscore-dangle: 0 */
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function RoadMapDetails() {
  const [mapAD, setMapAD] = useState([]);
  const artwork = useLoaderData();

  useEffect(() => {
    const mapArtworkDetails = async () => {
      try {
        const response = await myAxios.get("/api/artworks");
        setMapAD(response.data);
      } catch (error) {
        console.error("Erreur", error);
      }
    };
    mapArtworkDetails();
  }, []);

  return (
    <div>
      <div className="carte">
        <MapContainer
          className="map"
          center={[artwork.latitude, artwork.longitude]}
          zoom={15}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {mapAD &&
            mapAD.map((markerArtworkDetails) => (
              <Marker
                position={[
                  markerArtworkDetails.latitude,
                  markerArtworkDetails.longitude,
                ]}
                key={markerArtworkDetails.id_artwork}
              >
                <Popup className="popup" key={markerArtworkDetails.artwork_id}>
                  <img
                    src={markerArtworkDetails.picture}
                    alt={markerArtworkDetails.title}
                    className="marker-img"
                  />
                  <br />
                  <p className="marker-title">{markerArtworkDetails.title}</p>
                  <div className="link-artwork-maproad">
                    <Link
                      to={`/oeuvre/${markerArtworkDetails.id_artwork}`}
                      className="btn link-roadmap"
                    >
                      Voir l'oeuvre
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          <SearchRoadMap />
        </MapContainer>
      </div>
    </div>
  );
}

export default RoadMapDetails;
