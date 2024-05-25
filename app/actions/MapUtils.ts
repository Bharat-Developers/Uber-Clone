import L, { LatLng, LatLngExpression, Marker, Circle, latLng } from "leaflet";
import "leaflet-routing-machine";

export let mapRef: L.Map | null = null;
export const markersRef: Marker[] = [];
export const Tracker: LatLngExpression[] = [];
export const CircleRef: Circle[] = [];
export let routingControlRef: L.Routing.Control | null = null;
export let currentPos: LatLngExpression | undefined = undefined;
const Home = latLng(19.86925, 79.337909);

export const initializeMap = (
  setMapCenter: (location: { latitude: number; longitude: number }) => void
) => {
  if (mapRef === null) {
    mapRef = L.map("map").setView(Home, 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "OSM",
    }).addTo(mapRef);

    mapRef.on("moveend", () => {
      const center = mapRef!.getCenter();
      setMapCenter({ latitude: center.lat, longitude: center.lng });
    });
  }
};

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

export const geoSuccess = (
  pos: GeolocationPosition,
  location: { latitude: number; longitude: number },
  setLocation: (location: { latitude: number; longitude: number }) => void,
  setShouldEffectRun: (shouldRun: boolean) => void,
  isWithinRadius: (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    radius?: number
  ) => boolean,
  Ballarpur: LatLng
) => {
  const { latitude, longitude, accuracy } = pos.coords;
  currentPos = [latitude, longitude];

  if (routingControlRef === null) {
    RouteHandle(latLng(latitude, longitude), latLng(latitude, longitude));
  }

  if (location.latitude !== latitude || location.longitude !== longitude) {
    markersRef.forEach((marker) => marker.remove());
    CircleRef.forEach((circle) => circle.remove());
    markersRef.length = 0;
    CircleRef.length = 0;

    const newMarker = L.marker(currentPos).addTo(mapRef!);
    markersRef.push(newMarker);
    const lastLocation: LatLngExpression = Tracker[Tracker.length - 1] || [
      0, 0,
    ];
    if (
      lastLocation[0] !== currentPos[0] ||
      lastLocation[1] !== currentPos[1]
    ) {
      if (
        isWithinRadius(
          lastLocation[0],
          lastLocation[1],
          currentPos[0],
          currentPos[1]
        )
      ) {
        setShouldEffectRun(false);
        alert("You have reached");
      }
      Tracker.push(currentPos);
    }
    L.polyline(Tracker, { color: "blue" }).addTo(mapRef!);

    const newCircle = L.circle(currentPos, { radius: accuracy }).addTo(mapRef!);
    CircleRef.push(newCircle);

    setLocation({ latitude, longitude });
  }
};

export const geoError = (error: GeolocationPositionError) => {
  // console.error(error);
};

export const RouteHandle = (currentLoc: LatLng, destination: LatLng) => {
  if (currentLoc !== destination) {
    routingControlRef?.remove();
    routingControlRef = L.Routing.control({
      waypoints: [currentLoc, destination],
    }).addTo(mapRef!);

    const bounds = L.latLngBounds([currentLoc, destination]).pad(1);
    mapRef?.fitBounds(bounds);
  }
};

export const isWithinRadius = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  radius: number = 30
): boolean => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in metres
  return distance <= radius;
};
