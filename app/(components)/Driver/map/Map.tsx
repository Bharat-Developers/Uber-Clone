'use client';
import React, { useRef, useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import "leaflet-routing-machine";
 // Ensure this import matches the path to your CSS file

const TestMap = () => {
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current === null) {
            mapRef.current = L.map('map').setView([0, 0], 10);

            L.tileLayer("http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png", {
                attribution: "OSM",
            }).addTo(mapRef.current);

            navigator.geolocation.watchPosition(GeoSuccess, GeoError, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });

        } else {
            mapRef.current.setView([0, 0], 10);
        }

        function GeoSuccess(pos: GeolocationPosition) {
            const { latitude, longitude, accuracy } = pos.coords;
            const currentPos: LatLngTuple = [latitude, longitude];

            mapRef.current?.setView(currentPos, 13);
            L.marker(currentPos).addTo(mapRef.current!).bindPopup("I am Here").openPopup();
            L.circleMarker(currentPos, { radius: accuracy / 2 }).addTo(mapRef.current!);
            console.log(latitude, longitude);
            // const distance = calculateDistance(currentPos, targetPos);   
            // console.log(`Distance: ${distance} km`);
        }

        function GeoError(error: GeolocationPositionError) {
            console.error(error);
        }

        function calculateDistance([lat1, lon1]: [number, number], [lat2, lon2]: [number, number]): number {
            const toRad = (x: number) => x * Math.PI / 180;

            const R = 6371; // Radius of the Earth in km
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        }
    }, []);

    return (
        <div>
            <div id="map" className="mapContainer"></div>
        </div>
    );
}

export default TestMap;
