'use client'
import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import { Location } from '@/types/Location';
import { initializeMap, requestLocationAccess, geoSuccess, geoError, RouteHandle, MarkMarkers } from '@/app/utilities/MapUtils';
import axios from 'axios';
import L from 'leaflet';
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

interface Suggestion {
    properties: {
        formatted: string;
    };
}

interface MapProps {
    setLocation1: (location1: string) => void
    setLocation2: (location2: string) => void
}

const Map:React.FC<MapProps> = ({
    setLocation1,
    setLocation2
}) => {
    const intervalRef = useRef(null);
     
    L.Icon.Default.mergeOptions({
        iconUrl,
        iconRetinaUrl,
        shadowUrl,
    });

    
    useEffect(() => {
            initializeMap();
    }, []);
 

    useEffect(() => {
        // Clear the interval when the component unmounts
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);


    return (
        <div className=""> 
            <div id="map" className="h-[655px] rounded-lg shadow-lg w-[900px]"></div>
        </div>
    );
};

export default Map;


// why map is used
// in customer side 
// select pickup and drop off by clicking on map
// -to repersent cabs on map 
// -to show route from driver to pickup
// -to show route from pickup to dropoff
// -then update marker position on map by socket event
