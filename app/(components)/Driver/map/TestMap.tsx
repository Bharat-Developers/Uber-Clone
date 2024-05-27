'use client'
import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import { Location } from '@/types/Location';
import { initializeMap, requestLocationAccess, geoSuccess, geoError, RouteHandle, currentPos } from '../../../actions/MapUtils';
import axios from 'axios';
import L from 'leaflet';
import { getS2Id } from '../../../actions/getCell_Ids';
import { UpdateDriverLocation } from '../../../actions/DriverUpdate';
import mongoose from 'mongoose';

interface Suggestion {
    properties: {
        formatted: string;
    };
}

const TestMap = () => {
    const intervalRef = useRef(null);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [mapCenter, setMapCenter] = useState<Location>({ latitude: 0, longitude: 0 });
    const [destination, setDestination] = useState<string>('');
    const [Source, setSource] = useState<string>('');
    const [suggestions1, setSuggestions1] = useState<Suggestion[]>([]);
    const [suggestions2, setSuggestions2] = useState<Suggestion[]>([]);
    const [GO, setGO] = useState<boolean | null>(false);
    const [shouldEffectRun, setShouldEffectRun] = useState<boolean | null>(false);

    useEffect(() => {
        // Check if GO is stored in localStorage
        // const storedGO = localStorage.getItem('GO');
        // if (storedGO !== null) {
        //     setGO(storedGO === 'true');
        //     setShouldEffectRun(storedGO === 'true');
        // }

        // Run handleGOchange function on component mount
        // handleGOchange();

        // Add event listener for beforeunload
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    });

    useEffect(() => {
        if (GO) {
            initializeMap(setMapCenter);

            const cleanup = requestLocationAccess(
                (pos) => geoSuccess(pos, location, setLocation, GO!),
                geoError
            );

            return () => {
                if (cleanup instanceof Function) cleanup();
            };
        }
        else {
            // OffTracker()
        }
    }, [location, shouldEffectRun, GO]);

    const handleGOchange = async () => {
        const id = await getS2Id({ latitude: location.latitude, longitude: location.longitude })

        setGO(prev => !prev);
        console.log(GO)
        if (GO === false) {
            console.log('run once')
            RouteHandle(L.latLng(currentPos!), L.latLng(currentPos!));
            await UpdateDriverLocation(id?.toString() || "", id?.toString() || "", new mongoose.Types.ObjectId('664894587f88adf05ee6e017'), true);
        }
        if (GO === true) {
            // Tracker.length = 0
            await UpdateDriverLocation(id?.toString() || "", id?.toString() || "", new mongoose.Types.ObjectId('664894587f88adf05ee6e017'), false);
            window.location.reload()
        }
        setShouldEffectRun(!GO);
    };

    useEffect(() => {
        if (destination.length >= 2) {
            const requestOptions = {
                method: 'GET',
            };

            fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${destination}&apiKey=ea123ae80a2f4a7b845d4f5574cc9ae3`, requestOptions)
                .then(response => response.json())
                .then(result => setSuggestions2(result.features))
                .catch(error => console.log('error', error));
        } else {
            setSuggestions2([]);
        }
    }, [destination]);

    useEffect(() => {
        if (Source.length >= 2) {
            const requestOptions = {
                method: 'GET',
            };

            fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${Source}&apiKey=ea123ae80a2f4a7b845d4f5574cc9ae3`, requestOptions)
                .then(response => response.json())
                .then(result => setSuggestions1(result.features))
                .catch(error => console.log('error', error));
        } else {
            setSuggestions1([]);
        }
    }, [Source]);

    const handleInputChange2 = (e: ChangeEvent<HTMLInputElement>) => {
        setDestination(e.target.value);
    };

    const handleSuggestion2Click = async (formatted: string) => {
        setDestination(formatted);
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${formatted}&limit=1`
            );
            const latitude = parseFloat(response.data[0].lat);
            const longitude = parseFloat(response.data[0].lon);
            RouteHandle(L.latLng(currentPos!), L.latLng(latitude, longitude));
            startInterval(formatted);
            setSuggestions2([]);
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    };

    const handleInputChange1 = (e: ChangeEvent<HTMLInputElement>) => {
        setSource(e.target.value);
    };

    const handleSuggestion1Click = async (formatted: string) => {
        setSource(formatted);
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${formatted}&limit=1`
            );
            const latitude = parseFloat(response.data[0].lat);
            const longitude = parseFloat(response.data[0].lon);
            // RouteHandle(L.latLng(currentPos!), L.latLng(latitude, longitude));
            startInterval(formatted);
            setSuggestions1([]);
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    };

    const startInterval = (formatted: string) => {
        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Start a new interval
        intervalRef.current = setInterval(() => {
            // handleSuggestion1Click(formatted);
            handleSuggestion2Click(formatted);
        }, 30000); // 15 seconds
    };

    useEffect(() => {
        // Clear the interval when the component unmounts
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    //TODO - Implement websocket server response here

    const handleReqFromUser = async () => {
        // Get response from the server to show if any user has sent req to this id
        // the response will include Name, latlngs, time, 
        // Destructure them and then pass it to various RouteHandle to get the peoper route from driver current loc to the user loc
    }

    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
        if (GO) {
            const id = await getS2Id({ latitude: location.latitude, longitude: location.longitude })
            await UpdateDriverLocation(id?.toString() || "", id?.toString() || "", new mongoose.Types.ObjectId('664894587f88adf05ee6e017'), false);
        }
        // alert('refresh')
    }

    return (
        <div className="p-4 flex items-center gap-4">
            <div className="flex flex-col space-y-4 mt-[40px] ml-[100px] w-[300px] p-6 bg-white rounded-lg shadow-md">
                <div><h1 className="font-bold text-3xl p-6">Get a ride</h1>
                    <label htmlFor="Start" className="block text-sm font-medium text-gray-1000">Start:</label>
                    <input
                        type="text"
                        placeholder="Enter start city"
                        value={Source}
                        onChange={handleInputChange1}
                        className="mt-1 block w-60 pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {suggestions1.length > 0 && (
                        <ul className="bg-white border border-gray-300 mt-2 rounded w-96">
                            {suggestions2.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSuggestion1Click(suggestion.properties.formatted)}
                                >
                                    {suggestion.properties.formatted}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <label htmlFor="Destination" className="block text-sm font-medium text-gray-700">Destination:</label>
                    <input
                        type="text"
                        // className="bg-neutral-300 w-96 h-8 mt-2 p-2 rounded"
                        value={destination}
                        className="mt-1 block w-60 pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleInputChange2}
                    />
                    {suggestions2.length > 0 && (
                        <ul className="bg-white border border-gray-300 mt-2 rounded w-96">
                            {suggestions2.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSuggestion2Click(suggestion.properties.formatted)}
                                >
                                    {suggestion.properties.formatted}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
                <button onClick={() => handleGOchange()} className={`${GO ? 'text-green-700' : 'text-red-700'} border-black border-2 rounded-xl p-2 m-2 text-xl`}>
                    GO
                </button>
            <div className='flex '>
                <div id="map" className=" h-[655px] rounded-lg shadow-lg w-[900px]"></div>
            </div>
        </div>
    );
};

export default TestMap;