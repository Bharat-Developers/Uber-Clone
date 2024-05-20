"use client";

import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [circle, setCircle] = useState(null);

    useEffect(() => {
        // Map initialization
        const mapInstance = L.map('map').setView([20.5937, 78.9629], 6);

        // OSM layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        setMap(mapInstance);

        return () => {
            if (mapInstance) {
                mapInstance.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (map && navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                getPosition,
                error => console.log(error),
                { enableHighAccuracy: true }
            );

            return () => {
                navigator.geolocation.clearWatch(watchId);
            };
        } else {
            console.log("Your browser doesn't support geolocation feature!");
        }
    }, [map]);

    const getPosition = position => {
        const { latitude, longitude, accuracy } = position.coords;

        if (marker) {
            marker.setLatLng([latitude, longitude]);
        } else {
            const newMarker = L.marker([latitude, longitude]).addTo(map);
            setMarker(newMarker);
        }

        if (circle) {
            circle.setLatLng([latitude, longitude]);
            circle.setRadius(accuracy);
        } else {
            const newCircle = L.circle([latitude, longitude], { radius: accuracy }).addTo(map);
            setCircle(newCircle);
        }

        console.log(`Your coordinate is: Lat: ${latitude} Long: ${longitude} Accuracy: ${accuracy}`);
    };

    return <div id="map" style={{ height: '100vh', zIndex: 2 }} />; // Higher z-index
};

export default MapComponent;
