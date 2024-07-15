
'use client'
import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import { Location } from '@/types/Location';
import { initializeMap, requestLocationAccess, geoSuccess, geoError, MarkMarkers,mapRef,routingControlRef ,RouteHandle} from '@/app/utilities/MapUtils';
import L, { icon, LatLng, Marker } from 'leaflet';
import { getS2Id } from '@/app/functions/getCell_Ids';
import { UpdateDriverLocation } from '@/app/utilities/DriverUpdate';
import cookie from 'cookie'
import mongoose from 'mongoose';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png';
import socket from '@/webSocket/riderSocket';
//import socket from '@/webSocket/driverSocket';


interface Suggestion {
    properties: {
        formatted: string;
    };
}

interface MapProps{
    isAccepted: boolean
    isOnGoing: boolean
    onGoing: Object
    tripAccepted: Object
}

const Map:React.FC<MapProps> =  ({
    isAccepted,
    isOnGoing,
    tripAccepted,
    onGoing
}) => {
    
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [GO, setGO] = useState<boolean | null>(false);
    const [timeout,setTime]= useState(0);
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


    useEffect(()=>{
        setTimeout(()=>{
            if(isAccepted){
                socket.emit('driver-location',{room_id: tripAccepted.room_id,location:location})
            }
            if(isOnGoing){
                socket.emit('driver-location',{room_id: onGoing.room_id,location:location})
            }
            setTime(timeout+1);
        },3000)
    })

   useEffect(()=>{
    
    if(mapRef!=null &&  isOnGoing ){
        routingControlRef?.remove();
        RouteHandle(new L.LatLng(location.latitude,location.longitude),new L.LatLng(onGoing.details.dropoffCoor.latitude,onGoing.details.dropoffCoor.longitude),mapRef!)
    }
    if(!isOnGoing && isAccepted && mapRef!=null ){
        routingControlRef?.remove();
        RouteHandle(new L.LatLng(location.latitude,location.longitude),new L.LatLng(tripAccepted.details.pickupCoor.latitude,tripAccepted.details.pickupCoor.longitude),mapRef!)
    }

   },[isAccepted,isOnGoing])



   

    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
        if (GO) {
            const id = await getS2Id({ latitude: location.latitude, longitude: location.longitude })
            await UpdateDriverLocation(id?.toString() || "", id?.toString() || "",location.latitude,location.longitude, false);
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