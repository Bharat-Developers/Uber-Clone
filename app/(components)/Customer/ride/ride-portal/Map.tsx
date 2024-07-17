'use client'
import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import { Location } from '@/types/Location';
import axios from 'axios';
import L, { LatLng, latLng } from 'leaflet';
import socket from '@/webSocket/riderSocket';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png';
import { RouteHandle } from '@/app/utilities/MapUtils';


interface MapProps {
    currentTrip: Object
    isAccepted: boolean
    started: boolean
}
let mapRef: L.Map | null = null;
const Map: React.FC<MapProps> =({
currentTrip,
isAccepted,
started,
}) => {
    const Home = latLng(21.1498, 79.0806);
    
    const intervalRef = useRef(null);
    let routingControlRef: L.Routing.Control | null = null;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: MarkerIcon2x.src,
        iconUrl: MarkerIcon.src,
        shadowUrl: MarkerShadow.src,
    });

    useEffect(() => {
        mapRef = L.map("map").setView(Home, 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "OSM",
        }).addTo(mapRef);

        var markersGroup = L.layerGroup();
        mapRef?.addLayer(markersGroup);
        socket.on('drivers latLon', (data) => {
            const markers = data.map((latLon: Array<number>) => L.marker(new L.LatLng(latLon[0], latLon[1]))?.addTo(markersGroup))
        })
        socket.on('location-driver',(data)=>{
            markersGroup.clearLayers()
            //const markers = data.map((latLon: Array<number>) => L.marker(new L.LatLng(data.location.latitude,data.location.longitude))?.addTo(markersGroup))
        })
    }, [])
   
    useEffect(() => {
        // Clear the interval when the component unmounts
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const RouteHandle = async (currentLoc: LatLng, destination: LatLng, mapRef: L.Map) => {
        
        try{
            if (currentLoc !== destination) {
                const next = L.Routing.control({
                  waypoints: [currentLoc, destination],
                  fitSelectedRoutes: false,
                });
            
                routingControlRef?.remove();
                if(mapRef!=null){
                    console.log(mapRef)
                }
                routingControlRef = next.addTo(mapRef!);
                routingControlRef?.on("routesfound", (e) => {
                  const routes = e.routes;
                  const distance = routes[0].summary.totalDistance;
                  console.log('route found')
                });
              }
        }catch(error){
            console.log(error)
        }
        
      };

      useEffect(()=>{
        console.log(isAccepted,started,mapRef)
        routingControlRef?.remove();
        if(!started && isAccepted && mapRef!=null){
            routingControlRef?.remove();
            RouteHandle(new L.LatLng(currentTrip.latLon[0],currentTrip.latLon[1]),new L.LatLng(currentTrip.pickupCoor.latitude,currentTrip.pickupCoor.longitude),mapRef!)
        }
        if(started && mapRef!=null){
            routingControlRef?.remove();
            RouteHandle(new L.LatLng(currentTrip.pickupCoor.latitude,currentTrip.pickupCoor.longitude),new L.LatLng(currentTrip.dropoffCoor.latitude,currentTrip.dropoffCoor.longitude),mapRef!)
        }
      },[isAccepted,started])





    return (
        <div className="">
            <div id="map" className="h-[655px] rounded-lg shadow-lg w-[600px]"></div>
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
