import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import axios from "axios";
import { LatLng } from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Override the default icon URLs
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

const MapWithRouting: React.FC = () => {
  const [startCity, setStartCity] = useState<string>("");
  const [endCity, setEndCity] = useState<string>("");
  const [startCoords, setStartCoords] = useState<[number, number] | null>(null);
  const [endCoords, setEndCoords] = useState<[number, number] | null>(null);

  const handleRouting = async () => {
    try {
      const startResponse = await axios.get<{ lat: string; lon: string }[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${startCity}&limit=1`
      );
      const endResponse = await axios.get<{ lat: string; lon: string }[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${endCity}&limit=1`
      );

      const startLat = parseFloat(startResponse.data[0].lat);
      const startLon = parseFloat(startResponse.data[0].lon);
      const endLat = parseFloat(endResponse.data[0].lat);
      const endLon = parseFloat(endResponse.data[0].lon);

      setStartCoords([startLat, startLon]);
      setEndCoords([endLat, endLon]);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  useEffect(() => {
    if (startCoords && endCoords) {
      const map = L.map("map").setView(startCoords, 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "OSM",
      }).addTo(map);

      // Convert coordinates to LatLng objects
      const startLatLng: LatLng = L.latLng(startCoords[0], startCoords[1]);
      const endLatLng: LatLng = L.latLng(endCoords[0], endCoords[1]);

      // Add markers to the map
      L.marker(startLatLng).addTo(map);
      L.marker(endLatLng).addTo(map);

      // Add routing control to the map
      L.Routing.control({
        waypoints: [startLatLng, endLatLng],
      }).addTo(map);
    }
  }, [startCoords, endCoords]);

  return (
    <div>
      <label htmlFor="Start">Start:</label>&nbsp;&nbsp;
      <input
        type="text"
        placeholder="Enter start city"
        value={startCity}
        onChange={(e) => setStartCity(e.target.value)}
      />
      <label htmlFor="Destination">Destination:</label>&nbsp;&nbsp;
      <input
        type="text"
        placeholder="Enter end city"
        value={endCity}
        onChange={(e) => setEndCity(e.target.value)}
      />{" "}
      <br />
      <button onClick={handleRouting}>Show Route</button>
      <div id="map" style={{ height: "500px" }} />
    </div>
  );
};

export default MapWithRouting;