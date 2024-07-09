
'use client'
import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import { Location } from '@/types/Location';
import { initializeMap, requestLocationAccess, geoSuccess, geoError, RouteHandle, MarkMarkers } from '@/app/utilities/MapUtils';
import L, { icon, Marker } from 'leaflet';
import { getS2Id } from '@/app/functions/getCell_Ids';
import { UpdateDriverLocation } from '@/app/utilities/DriverUpdate';
import cookie from 'cookie'
import mongoose from 'mongoose';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png';
import socket from '@/webSocket/driverSocket';
interface Suggestion {
    properties: {
        formatted: string;
    };
}

interface MapProps{
    isAccepted: boolean
    isOnGoing: boolean
}

const Map =  () => {
    const intervalRef = useRef(null);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [IsCurrent, setIsCurrent] = useState<boolean>(false);
    const [sourceCoords, setSourceCoords] = useState<L.LatLng>();
    const [destCords, setdestCords] = useState<L.LatLng>();
    const [GO, setGO] = useState<boolean | null>(false);
    const cookies = cookie.parse(document.cookie);
    
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: MarkerIcon2x.src,
        iconUrl: MarkerIcon.src,
        shadowUrl: MarkerShadow.src,
      });
     
      

    useEffect(() => {
        // Check if GO is stored in localStorage
        const storedGO = cookies.GO
        if (storedGO !== null) {
            setGO(storedGO === 'true');
        }
        // Run handleGOchange function on component mount

        // Add event listener for beforeunload
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    useEffect(() => {
        if (GO ) {
            initializeMap();

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
    }, [location, GO]);

   



    //TODO - Implement websocket server response here

    const handleReqFromUser = async () => {
        // Get response from the server to show if any user has sent req to this id
        // the response will include Name, latlngs, time, 
        // Destructure them and then pass it to various RouteHandle to get the peoper route from driver current loc to the user loc
    }

    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
        if (GO) {
            const id = await getS2Id({ latitude: location.latitude, longitude: location.longitude })
            await UpdateDriverLocation(id?.toString() || "", id?.toString() || "", false);
        }
        // alert('refresh')
    }

    return (
        <div className="p-4">
            <div id="map" className=" h-[655px] rounded-lg shadow-lg w-[100%]"></div>
        </div>
    );
};

export default Map;