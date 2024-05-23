"use client";

import React, { useEffect, useState } from 'react';
import L, { Map as LeafletMap, Marker as LeafletMarker, Circle as LeafletCircle } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent: React.FC = () => {
    const [map, setMap] = useState<LeafletMap | null>(null);
    const [marker, setMarker] = useState<LeafletMarker | null>(null);
    const [circle, setCircle] = useState<LeafletCircle | null>(null);

    useEffect(() => {
        // Map initialization
        const mapInstance = L.map('map').setView([20.5937, 78.9629], 6);

        // OSM layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        setMap(mapInstance);

        // Clean up the map instance on component unmount
        return () => {
            if (mapInstance) {
                mapInstance.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (map && navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                position => {
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
                },
                error => console.log(error),
                { enableHighAccuracy: true }
            );

            return () => {
                navigator.geolocation.clearWatch(watchId);
            };
        } else {
            console.log("Your browser doesn't support geolocation feature!");
        }
    }, [map, marker, circle]);

    return <div id="map" style={{ height: '100vh', zIndex: 2 }} />; // Higher z-index
};

export default MapComponent;
