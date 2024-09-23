import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

function SearchRoadMap() {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim();
    const control = L.Control.geocoder({
      query: "",
      placeholder: "Cherche un endroit...",
      // to not add a popup on the search
      defaultMarkGeocode: false,
      geocoder,
    }).addTo(map);

    // events manager for markgeocode (selected research)
    const onMarkGeocode = (e) => {
      const { bbox } = e.geocode;
      const southWest = bbox.getSouthWest();
      const northEast = bbox.getNorthEast();
      map.fitBounds([
        [southWest.lat, southWest.lng],
        [northEast.lat, northEast.lng],
      ]);
    };

    control.on("markgeocode", onMarkGeocode);

    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
}

export default SearchRoadMap;
