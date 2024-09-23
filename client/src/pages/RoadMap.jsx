import { useLoaderData, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import "./styles/RoadMap.css";
import SearchRoadMap from "../components/SearchRoadMap/SearchRoadMap";

// Fix marker icon issues with Webpack
delete L.Icon.Default.prototype._getIconUrl;
/* eslint no-underscore-dangle: 0 */
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function RoadMap() {
  
  const artworkMap = useLoaderData();

  return (
    <div className="roadmap-container">
      <p className="text-roadmap">
        Retrouve ici les oeuvres street art de la MEL
      </p>
      <div className="carte">
        <MapContainer className="map" center={[50.632557, 3.065451]} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {artworkMap.map((markerArtwork) => (
            <Marker
              position={[markerArtwork.latitude, markerArtwork.longitude]}
              key={markerArtwork.id_artwork}
            >
              <Popup className="popup" key={markerArtwork.artwork_id}>
                <img
                  src={markerArtwork.picture}
                  alt={markerArtwork.title}
                  className="marker-img"
                />
                <br />
                <p className="marker-title">{markerArtwork.title}</p>
                <div className="link-artwork-maproad">
                  <Link to={`/oeuvre/${markerArtwork.id_artwork}`} className="btn link-roadmap">
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

export default RoadMap;
