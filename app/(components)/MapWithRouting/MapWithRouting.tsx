import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import axios from "axios";
import { LatLng } from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";

// Override the default icon URLs
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

const movingIcons: { [key: string]: L.Icon } = {
  auto: L.icon({
    iconUrl: "/auto.png",
    iconSize: [25, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  carMini: L.icon({
    iconUrl: "/car-mini.png",
    iconSize: [25, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  carMax: L.icon({
    iconUrl: "/car-max.png",
    iconSize: [25, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
};

const locIcon = L.icon({
  iconRetinaUrl: MarkerIcon2x.src,
  iconUrl: MarkerIcon.src,
  shadowUrl: MarkerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

const MapWithRouting: React.FC = () => {
  const [startCity, setStartCity] = useState<string>("");
  const [endCity, setEndCity] = useState<string>("");
  const [startCoords, setStartCoords] = useState<[number, number] | null>(null);
  const [endCoords, setEndCoords] = useState<[number, number] | null>(null);
  const [selectedMarkerType, setSelectedMarkerType] = useState<string>("auto");
  const mapRef = useRef<L.Map | null>(null);
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const startMarkerRef = useRef<L.Marker | null>(null);
  const endMarkerRef = useRef<L.Marker | null>(null);
  const movingMarkerRef = useRef<L.Marker | null>(null);
  const movingMarkerTimeouts = useRef<NodeJS.Timeout[]>([]);

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
      // Initialize the map only if it doesn't exist
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView(startCoords, 10);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "OSM",
        }).addTo(mapRef.current);
      } else {
        // Update the map view for new coordinates
        mapRef.current.setView(startCoords, 10);
      }

      // Add a null check before using the mapRef.current
      if (mapRef.current) {
        const map = mapRef.current; // Type assertion
        // Clear the previous routing control if it exists
        if (routingControlRef.current) {
          routingControlRef.current.getPlan().setWaypoints([]);
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }

        // Remove existing markers if they exist
        if (startMarkerRef.current) {
          map.removeLayer(startMarkerRef.current);
          startMarkerRef.current = null;
        }
        if (endMarkerRef.current) {
          map.removeLayer(endMarkerRef.current);
          endMarkerRef.current = null;
        }
        if (movingMarkerRef.current) {
          map.removeLayer(movingMarkerRef.current);
          movingMarkerRef.current = null;
        }

        // Clear any existing timeouts for moving the marker
        movingMarkerTimeouts.current.forEach(clearTimeout);
        movingMarkerTimeouts.current = [];
      }

      // Convert coordinates to LatLng objects
      const startLatLng: LatLng = L.latLng(startCoords[0], startCoords[1]);
      const endLatLng: LatLng = L.latLng(endCoords[0], endCoords[1]);

      // Add markers to the map
      startMarkerRef.current = L.marker(startLatLng).addTo(mapRef.current);
      startMarkerRef.current.setIcon(locIcon);
      endMarkerRef.current = L.marker(endLatLng).addTo(mapRef.current);
      endMarkerRef.current.setIcon(locIcon);

      // Add routing control to the map
      routingControlRef.current = L.Routing.control({
        waypoints: [startLatLng, endLatLng],
      }).addTo(mapRef.current);

      // Listen for routesfound event to update marker along the route
      routingControlRef.current.on("routesfound", (e) => {
        const routes = e.routes;
        const totalDistance = routes[0].summary.totalDistance; // Total distance in meters
        const totalTime = routes[0].summary.totalTime; // Total time in seconds

        // Convert distance to kilometers and time to minutes for better readability
        const totalDistanceKm = totalDistance / 1000;
        const totalTimeMin = totalTime / 60;

        console.log("Total Distance:", totalDistanceKm.toFixed(2), "km");
        console.log("Total Time:", totalTimeMin.toFixed(2), "minutes");
        const coordinates = routes[0].coordinates;
        const lastIndex = coordinates.length - 1;

        // Add a moving marker to the map
        movingMarkerRef.current = L.marker(coordinates[0], {
          icon: movingIcons[selectedMarkerType],
        }).addTo(mapRef.current);

        // Update marker position along the route
        coordinates.forEach((coord: L.LatLng, index: number) => {
          const timeout = setTimeout(() => {
            if (movingMarkerRef.current) {
              movingMarkerRef.current.setLatLng([coord.lat, coord.lng]);
              mapRef.current?.panTo([coord.lat, coord.lng]);
            }
            // Check if this is the last coordinate
            if (index === lastIndex) {
              alert("Journey Complete!");
            }
          }, 100 * index);
          movingMarkerTimeouts.current.push(timeout);
        });
      });
    }
  }, [startCoords, endCoords, selectedMarkerType]);

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
      />
      <label htmlFor="markerType">Select Marker Type:</label>
      <select
        id="markerType"
        value={selectedMarkerType}
        onChange={(e) => setSelectedMarkerType(e.target.value)}
      >
        <option value="auto">Auto</option>
        <option value="carMini">Car Mini</option>
        <option value="carMax">Car Max</option>
      </select>
      <br />
      <button onClick={handleRouting}>Show Route</button>
      <div id="map" style={{ height: "500px" }} />
    </div>
  );
};

export default MapWithRouting;