'use client'
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
import styles from './GetARideForm.module.css';

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

interface Suggestion {
  properties: {
    formatted: string;
  };
}

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

  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [suggestions1, setSuggestions1] = useState<Suggestion[]>([]);
  const [suggestions2, setSuggestions2] = useState<Suggestion[]>([]);

  const fetchSuggestions = (location: string, setSuggestions: React.Dispatch<React.SetStateAction<Suggestion[]>>) => {
    if (location.length >= 3) {
      const requestOptions = {
        method: 'GET',
      };

      fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=ea123ae80a2f4a7b845d4f5574cc9ae3`, requestOptions)
        .then(response => response.json())
        .then(result => setSuggestions(result.features))
        .catch(error => console.log('error', error));
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    fetchSuggestions(location1, setSuggestions1);
  }, [location1]);

  useEffect(() => {
    fetchSuggestions(location2, setSuggestions2);
  }, [location2]);

  const handleRouting = async () => {
    try {
      const startResponse = await axios.get<{ lat: string; lon: string }[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location1}&limit=1`
      );
      const endResponse = await axios.get<{ lat: string; lon: string }[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location2}&limit=1`
      );

      const startLat = parseFloat(startResponse.data[0].lat);
      const startLon = parseFloat(startResponse.data[0].lon);
      const endLat = parseFloat(endResponse.data[0].lat);
      const endLon = parseFloat(endResponse.data[0].lon);

      setStartCoords([startLat, startLon]);
      console.log(startLat, startLon)
      setEndCoords([endLat, endLon]);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  useEffect(() => {
    if (startCoords && endCoords) {
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView(startCoords, 10);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "OSM",
        }).addTo(mapRef.current);
      } else {
        mapRef.current.setView(startCoords, 10);
      }

      if (mapRef.current) {
        const map = mapRef.current;
        if (routingControlRef.current) {
          routingControlRef.current.getPlan().setWaypoints([]);
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }

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

        movingMarkerTimeouts.current.forEach(clearTimeout);
        movingMarkerTimeouts.current = [];
      }

      const startLatLng: LatLng = L.latLng(startCoords[0], startCoords[1]);
      const endLatLng: LatLng = L.latLng(endCoords[0], endCoords[1]);

      startMarkerRef.current = L.marker(startLatLng).addTo(mapRef.current);
      startMarkerRef.current.setIcon(locIcon);
      endMarkerRef.current = L.marker(endLatLng).addTo(mapRef.current);
      endMarkerRef.current.setIcon(locIcon);

      routingControlRef.current = L.Routing.control({
        waypoints: [startLatLng, endLatLng],
      }).addTo(mapRef.current);

      routingControlRef.current.on("routesfound", (e) => {
        const routes = e.routes;
        const totalDistance = routes[0].summary.totalDistance;
        const totalTime = routes[0].summary.totalTime;

        const totalDistanceKm = totalDistance / 1000;
        const totalTimeMin = totalTime / 60;

        console.log("Total Distance:", totalDistanceKm.toFixed(2), "km");
        console.log("Total Time:", totalTimeMin.toFixed(2), "minutes");
        const coordinates = routes[0].coordinates;
        const lastIndex = coordinates.length - 1;

        movingMarkerRef.current = L.marker(coordinates[0], {
          icon: movingIcons[selectedMarkerType],
        }).addTo(mapRef.current);

        coordinates.forEach((coord: L.LatLng, index: number) => {
          const timeout = setTimeout(() => {
            if (movingMarkerRef.current) {
              movingMarkerRef.current.setLatLng([coord.lat, coord.lng]);
              mapRef.current?.panTo([coord.lat, coord.lng]);
            }
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
    <div className={styles.container}>
      <h2 className={styles.title}>Get a ride</h2>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Start:</label>&nbsp;&nbsp;
          <input
            type="text"
            className={styles.input}
            value={location1}
            onChange={(e) => setLocation1(e.target.value)}
            placeholder="Enter start city"
          />
          {suggestions1.length > 0 && (
            <ul className="bg-white border border-gray-300 mt-2 rounded w-96">
              {suggestions1.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => setLocation1(suggestion.properties.formatted)}
                >
                  {suggestion.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Destination:</label>&nbsp;&nbsp;
          <input
            type="text"
            className={styles.input}
            value={location2}
            onChange={(e) => setLocation2(e.target.value)}
            placeholder="Enter end city"
          />
          {suggestions2.length > 0 && (
            <ul className="bg-white border border-gray-300 mt-2 rounded w-96">
              {suggestions2.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => setLocation2(suggestion.properties.formatted)}
                >
                  {suggestion.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Select Marker Type:</label>
          <select
            className={styles.select}
            id="markerType"
            value={selectedMarkerType}
            onChange={(e) => setSelectedMarkerType(e.target.value)}
          >
            <option value="auto">Auto</option>
            <option value="carMini">Car Mini</option>
            <option value="carMax">Car Max</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Pickup Time:</label>
          <select className={styles.select}>
            <option>Pickup now</option>
            <option>Schedule for later</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>For:</label>
          <select className={styles.select}>
            <option>For me</option>
            <option>For anyone else</option>
          </select>
        </div>
        <button type="button" className={styles.button} onClick={handleRouting}>Show Route</button>
      </form>
      <div id="map" style={{ height: "500px" }} />
    </div>
  );
};

export default MapWithRouting;
