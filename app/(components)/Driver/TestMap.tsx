'use client'

import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import "leaflet/dist/leaflet.css";
import { Location } from '@/types/Location';
import { initializeMap, requestLocationAccess, geoSuccess, geoError, RouteHandle, isWithinRadius, currentPos } from '../../actions/MapUtils';
import axios from 'axios';
import L, { LatLng } from 'leaflet';

interface Suggestion {
    properties: {
        formatted: string;
    };
}

const TestMap = () => {
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [mapCenter, setMapCenter] = useState<Location>({ latitude: 0, longitude: 0 });
    const [destination, setDestination] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const Ballarpur: LatLng = L.latLng(19.869229, 79.340409);
    const [shouldEffectRun, setShouldEffectRun] = useState(true);

    useEffect(() => {
        if (!shouldEffectRun) {
            return;
        }

        initializeMap(setMapCenter);

        const cleanup = requestLocationAccess(
            (pos) => geoSuccess(pos, location, setLocation, setShouldEffectRun, isWithinRadius, Ballarpur),
            geoError
        )

        return () => {
            if (cleanup instanceof Function ) cleanup();
        };
    }, [location, shouldEffectRun]);

    useEffect(() => {
        if (destination.length >= 2) {
            const requestOptions = {
                method: 'GET',
            };

            fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${destination}&apiKey=ea123ae80a2f4a7b845d4f5574cc9ae3`, requestOptions)
                .then(response => response.json())
                .then(result => setSuggestions(result.features))
                .catch(error => console.log('error', error));
        } else {
            setSuggestions([]);
        }
    }, [destination]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDestination(e.target.value);
    };

    const handleSuggestionClick = async (formatted: string) => {
        setDestination(formatted);
        try {
            const response = await axios.get<{ lat: string; lon: string; }[]>(
                `https://nominatim.openstreetmap.org/search?format=json&q=${formatted}&limit=1`
            );
            const latitude = parseFloat(response.data[0].lat);
            const longitude = parseFloat(response.data[0].lon);
            RouteHandle(L.latLng(currentPos!), L.latLng(latitude, longitude));
            setSuggestions([]);
        } catch (error) {
            console.error("Error fetching coordinates:", error);
        }
    };

    return (
        <div>
            <div id="map" style={{ height: "80vh", width: "100vw" }}></div>
            <div>
                Current Map Center: Latitude: {Number(mapCenter.latitude)}, Longitude: {Number(mapCenter.longitude)}
            </div>
            <div className="mt-4 text-sm">
                <label>Destination:</label><br />
                <input
                    type="text"
                    className="bg-neutral-300 w-96 h-8 mt-2 p-2 rounded"
                    value={destination}
                    onChange={handleInputChange}
                />
                {suggestions.length > 0 && (
                    <ul className="bg-white border border-gray-300 mt-2 rounded w-96">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleSuggestionClick(suggestion.properties.formatted)}
                            >
                                {suggestion.properties.formatted}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TestMap;
