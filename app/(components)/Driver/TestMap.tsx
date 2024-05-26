'use client'
import React, { useEffect, useState, ChangeEvent } from 'react';
import "leaflet/dist/leaflet.css";
import { Location } from '@/types/Location';
import { initializeMap, requestLocationAccess, geoSuccess, geoError, RouteHandle, isWithinRadius, currentPos, Tracker, OffTracker } from '../../actions/MapUtils';
import axios from 'axios';
import L from 'leaflet';
import { getS2Id } from '@/app/actions/getCell_Ids';
import { UpdateDriverLocation } from "../../actions/DriverUpdate";
import mongoose from 'mongoose';

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
    const [GO, setGO] = useState<boolean | null>(false);
    const [shouldEffectRun, setShouldEffectRun] = useState<boolean | null>(false);

    useEffect(() => {
        // Check if GO is stored in localStorage
        const storedGO = localStorage.getItem('GO');
        if (storedGO !== null) {
            setGO(storedGO === 'true');
            setShouldEffectRun(storedGO === 'true');
        }

        // Run handleGOchange function on component mount
        handleGOchange();

        // Add event listener for beforeunload
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (GO) {
            initializeMap(setMapCenter);

            const cleanup = requestLocationAccess(
                (pos) => geoSuccess(pos, location, setLocation, isWithinRadius, GO!),
                geoError
            );

            return () => {
                if (cleanup instanceof Function) cleanup();
            };
        }
        else{
            // OffTracker()
        }
    }, [location, shouldEffectRun, GO]);

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

    const handleGOchange = async () => {
        const id = await getS2Id({ latitude: location.latitude, longitude: location.longitude })
        
        setGO(prev => !prev);
        console.log(GO)
        if (GO === false) {
            await UpdateDriverLocation(id?.toString() || "", id?.toString() || "", new mongoose.Types.ObjectId('664894587f88adf05ee6e017'), true);
        }
        if (GO === true) {
            // Tracker.length = 0
            await UpdateDriverLocation(id?.toString() || "", id?.toString() || "", new mongoose.Types.ObjectId('664894587f88adf05ee6e017'), false);
            window.location.reload()
        }
        setShouldEffectRun(!GO);
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

    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
        if(GO){
            const id = await getS2Id({ latitude: location.latitude, longitude: location.longitude })
            await UpdateDriverLocation(id?.toString() || "", id?.toString() || "", new mongoose.Types.ObjectId('664894587f88adf05ee6e017'), false);
        }
        // alert('refresh')
    }

    return (
        <div className='w-full'>
            <div id="map" style={{ height: "80vh", width: "100%" }}></div>
            {!GO && <div className='absolute top-0 text-red-900 h-[80vh] w-[100%] text-[20vh] z-10'>GO</div>}
            <div>
                Current Map Center: Latitude: {Number(mapCenter.latitude)}, Longitude: {Number(mapCenter.longitude)}
            </div>
            <div>
                Your Current Location: Latitude: {Number(location.latitude)}, Longitude: {Number(location.longitude)}
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
            <button onClick={() => handleGOchange()} className={`${GO ? 'text-green-700' : 'text-red-700'} p-2 m-2 text-xl`}>
                GO
            </button>
        </div>
    );
};

export default TestMap;
