'use client'
import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import { Location } from '@/types/Location';
import axios from 'axios';
import L, { LatLng, latLng } from 'leaflet';

import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png';
import { reverseGeocode } from "@/app/utilities/MapUtils"


interface MapProps {
    setLocation1: (location1: string) => void
    setLocation2: (location2: string) => void
    Setcoor1: (coor: Location) => void
    Setcoor2: (coor: Location) => void
    setDistance: (dis: number) => void
    showPrice: boolean
    coor1: Location
    coor2: Location

}
let mapRef: L.Map | null = null;
let routingControlRef: L.Routing.Control | null = null;
const Map: React.FC<MapProps> = ({
    setLocation1,
    setLocation2,
    Setcoor1,
    Setcoor2,
    setDistance,
    showPrice,
    coor1,
    coor2,
}) => {
    const Home = latLng(21.1498, 79.0806);

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: MarkerIcon2x.src,
        iconUrl: MarkerIcon.src,
        shadowUrl: MarkerShadow.src,
    });

    useEffect(() => {
        try{
            if(mapRef===null){
                mapRef = L.map("map").setView(Home, 14);
    
               L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "OSM",
                }).addTo(mapRef);
            }
            
            
            // a layer group, used here like a container for markers
            var markersGroup = L.layerGroup();
            mapRef?.addLayer(markersGroup); // if not null
            mapRef?.on('click', async (e) => {
                const locadd = await reverseGeocode(e.latlng.lat, e.latlng.lng)
                var markersCount = markersGroup.getLayers().length;
                console.log(locadd)
                console.log(e.latlng)
                console.log(markersCount)
    
                if (markersCount == 0) {
                    var marker = L.marker(e.latlng).addTo(markersGroup);
                    setLocation1(locadd)
                    Setcoor1({ latitude: e.latlng.lat, longitude: e.latlng.lng })
    
                    return;
                }
                if (markersCount == 1) {
                    var marker = L.marker(e.latlng).addTo(markersGroup);
                    setLocation2(locadd)
                    Setcoor2({ latitude: e.latlng.lat, longitude: e.latlng.lng })
                    return;
                }
                
                markersGroup?.clearLayers();
                
            })
    
             // unmount map function
             return () =>{
                if(mapRef!==null){
                   // mapRef?.remove();
                }
             } 
        }catch(error){
            console.log(error);
        }
        
       
    }, [])

    
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
                  setDistance(distance/1000)
                  console.log('route found')
                });
              }
        }catch(error){
            console.log(error)
        }
        
      };

      useEffect(()=>{
        if(showPrice && mapRef!=null){
            RouteHandle(new L.LatLng(coor1.latitude,coor1.longitude),new L.LatLng(coor2.latitude,coor2.longitude),mapRef!)
        }else{
            routingControlRef?.remove();
        }
      },[showPrice])



    return (
        <div className="">
            <div id="map" className="h-[655px] rounded-lg shadow-lg w-[auto]"></div>
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

