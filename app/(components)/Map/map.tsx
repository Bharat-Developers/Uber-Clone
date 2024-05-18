import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";


type LocationType = {
  location: string;
};

// Create the custom icon
const customIcon = L.icon({
  iconRetinaUrl: MarkerIcon2x.src,
  iconUrl: MarkerIcon.src,
  shadowUrl: MarkerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

const Map = ({ location }:LocationType) => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${location}&limit=1`
        );
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
          });
        } else {
          console.error("Location not found");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [location]);

  return (
    <MapContainer
      center={[coordinates.latitude, coordinates.longitude]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        draggable
        icon={customIcon}
        position={[coordinates.latitude, coordinates.longitude]}
      />
    </MapContainer>
  );
};

export default Map;