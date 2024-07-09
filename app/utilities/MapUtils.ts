import L, { LatLng, LatLngExpression, Marker, Circle, latLng } from "leaflet";
import "leaflet-routing-machine";
import { getS2Id } from "../functions/getCell_Ids";
import { UpdateDriverLocation } from "./DriverUpdate";
import mongoose from "mongoose";

export let mapRef: L.Map | null = null;
export const markersRef: Marker[] = [];
export let Tracker: LatLngExpression[] = [];
export const CircleRef: Circle[] = [];
export let routingControlRef: L.Routing.Control | null = null;
export let PrevS2Id: String = "";
export let currentPos: LatLngExpression | undefined = undefined;

const Home = latLng(21.1498, 79.0806);

export const initializeMap = (
  // setMapCenter: () => void
) => {
  if (mapRef === null) {
    mapRef = L.map("map").setView(Home, 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "OSM",
    }).addTo(mapRef);

    // mapRef.on("moveend", () => {
    //   const center = mapRef!.getCenter();
    //   setMapCenter({ latitude: center.lat, longitude: center.lng });
    // });
  }
};

// function role , access current location
// on location permission granted the geosuccess function is called
export const requestLocationAccess = (
  geoSuccess: (pos: GeolocationPosition) => void,
  geoError: (error: GeolocationPositionError) => void
) => {
  if (navigator.geolocation) {
    const watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

export const geoSuccess = async (
  pos: GeolocationPosition,
  location: { latitude: number; longitude: number },
  setLocation: (location: { latitude: number; longitude: number }) => void,
  GO: boolean
) => {
  const { latitude, longitude, accuracy } = pos.coords;
  currentPos = [latitude, longitude];
  if(Tracker.length==2){
    Tracker.shift(); // remove the first element
  }
  Tracker.push(currentPos);
  // console.log("Tracker updated:", Tracker); // Debugging line

  const line = L.polyline(Tracker, { color: "blue" });
  // console.log("Adding polyline:", line); // Debugging line
  line.addTo(mapRef!);
  // the above comment out code is tracking and storing the current position  , which is display on map by blue line
    const id = await getS2Id({ latitude: latitude, longitude: longitude });
    PrevS2Id = id?.toString() || "";

  if (location.latitude !== latitude || location.longitude !== longitude) {
    markersRef.forEach((marker) => marker.remove());
    CircleRef.forEach((circle) => circle.remove());
    markersRef.length = 0;
    CircleRef.length = 0;
    // adding marker to map
    const newMarker = L.marker(currentPos).addTo(mapRef!);
    markersRef.push(newMarker);
    const lastLocation: LatLngExpression = Tracker[Tracker.length - 1] || [
      0, 0,
    ];

    if (
      lastLocation[0] !== currentPos[0] ||
      lastLocation[1] !== currentPos[1]
    ) {
      const id = await getS2Id({ latitude: latitude, longitude: longitude });
      // this change the realtime driver position(region) in db
      await UpdateDriverLocation(
        id?.toString() || "",
        PrevS2Id.toString(),
        GO
      );
      //set the current s2cellId to prev
      if (id !== PrevS2Id) {
        PrevS2Id = id?.toString() || "";
      }

    }

    const newCircle = L.circle(currentPos, { radius: accuracy }).addTo(mapRef!);
    CircleRef.push(newCircle);
    setLocation({ latitude, longitude });
  }
};

export const geoError = (error: GeolocationPositionError) => {
  console.error(error);
};

export const MarkMarkers = async () => {
  const latlngArray = [
    L.latLng(37.7749, -122.4194), // San Francisco, CA
    L.latLng(34.0522, -118.2437), // Los Angeles, CA
    L.latLng(40.7128, -74.006), // New York, NY
    L.latLng(41.8781, -87.6298), // Chicago, IL
    L.latLng(29.7604, -95.3698), // Houston, TX
    L.latLng(33.4484, -112.074), // Phoenix, AZ
    L.latLng(39.7392, -104.9903), // Denver, CO
    L.latLng(47.6062, -122.3321), // Seattle, WA
    L.latLng(38.9072, -77.0369), // Washington, D.C.
    L.latLng(25.7617, -80.1918), // Miami, FL
  ];
 
  try{
    const markers = latlngArray.map((latlng) => L.marker(latlng)?.addTo(mapRef!))
  }catch(err){
    console.log(err)
  }
  

};

export const RouteHandle = async (currentLoc: LatLng, destination: LatLng) => {
  if (currentLoc !== destination) {
    const next = L.Routing.control({
      waypoints: [currentLoc, destination],
      fitSelectedRoutes: false,
    });

    routingControlRef?.remove();
    routingControlRef = next.addTo(mapRef!);

    routingControlRef.on("routesfound", (e) => {
      const routes = e.routes;
      const totalDistance = routes[0].summary.totalDistance;
      const totalDistanceKm = totalDistance / 1000;
      if (totalDistanceKm < 0.5) {
       // alert("You have reached");
      }
    });
  }
};

export const getPrice = async (distance : number) => {
  let price = distance * 16;
  if (price <= 50)
    price = 50;
  return price
}