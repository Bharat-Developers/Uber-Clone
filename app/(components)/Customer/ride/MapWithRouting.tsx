// 'use client';
// import React, { useState, useEffect, useRef } from "react";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import { LatLng } from "leaflet";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";
// import MarkerIcon from "leaflet/dist/images/marker-icon.png";
// import MarkerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
// import '@fortawesome/fontawesome-free/css/all.min.css';

// // Override the default icon URLs
// L.Icon.Default.mergeOptions({
//   iconUrl,
//   iconRetinaUrl,
//   shadowUrl,
// });

// const movingIcons: { [key: string]: L.Icon } = {
//   auto: L.icon({
//     iconUrl: "/auto.png",
//     iconSize: [25, 60],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   }),
//   carMini: L.icon({
//     iconUrl: "/car-mini.png",
//     iconSize: [25, 60],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   }),
//   carMax: L.icon({
//     iconUrl: "/car-max.png",
//     iconSize: [25, 60],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   }),
// };

// const locIcon = L.icon({
//   iconRetinaUrl: MarkerIcon2x.src,
//   iconUrl: MarkerIcon.src,
//   shadowUrl: MarkerShadow.src,
//   iconSize: [25, 41],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41],
// });

// const MapWithRouting: React.FC = () => {
//   const [startCity, setStartCity] = useState<string>("nagpur");
//   const [endCity, setEndCity] = useState<string>("gurgaon");
//   const [startCoords, setStartCoords] = useState<[number, number] | null>(null);
//   const [endCoords, setEndCoords] = useState<[number, number] | null>(null);
//   const [selectedMarkerType, setSelectedMarkerType] = useState<string>("carMax");
//   const mapRef = useRef<L.Map | null>(null);
//   const routingControlRef = useRef<L.Routing.Control | null>(null);
//   const startMarkerRef = useRef<L.Marker | null>(null);
//   const endMarkerRef = useRef<L.Marker | null>(null);
//   const movingMarkerRef = useRef<L.Marker | null>(null);
//   const movingMarkerTimeouts = useRef<NodeJS.Timeout[]>([]);
  
//   // const navigate = useNavigate(); // Initialize useNavigate hoo
//   async function handleRouting() {
//     try {
//       const startResponse = await axios.get<{ lat: string; lon: string; }[]>(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${startCity}&limit=1`
//       );
//       const endResponse = await axios.get<{ lat: string; lon: string; }[]>(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${endCity}&limit=1`
//       );

//       const startLat = parseFloat(startResponse.data[0].lat);
//       const startLon = parseFloat(startResponse.data[0].lon);
//       const endLat = parseFloat(endResponse.data[0].lat);
//       const endLon = parseFloat(endResponse.data[0].lon);

//       setStartCoords([startLat, startLon]);
//       setEndCoords([endLat, endLon]);
//     } catch (error) {
//       console.error("Error fetching coordinates:", error);
//     }
//   }

//   useEffect(() => {
//     if (startCoords && endCoords) {
//       if (!mapRef.current) {
//         mapRef.current = L.map("map").setView(startCoords, 10);
//         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//           attribution: "OSM",
//         }).addTo(mapRef.current);
//       } else {
//         mapRef.current.setView(startCoords, 10);
//       }

//       if (mapRef.current) {
//         const map = mapRef.current as L.Map;
        
//         if (routingControlRef.current) {
//           routingControlRef.current.getPlan().setWaypoints([]);
//           map.removeControl(routingControlRef.current);
//           routingControlRef.current = null;
//         }

//         if (startMarkerRef.current) {
//           map.removeLayer(startMarkerRef.current);
//           startMarkerRef.current = null;
//         }
//         if (endMarkerRef.current) {
//           map.removeLayer(endMarkerRef.current);
//           endMarkerRef.current = null;
//         }
//         if (movingMarkerRef.current) {
//           map.removeLayer(movingMarkerRef.current);
//           movingMarkerRef.current = null;
//         }

//         movingMarkerTimeouts.current.forEach(clearTimeout);
//         movingMarkerTimeouts.current = [];
//       }

//       const startLatLng: LatLng = L.latLng(startCoords[0], startCoords[1]);
//       const endLatLng: LatLng = L.latLng(endCoords[0], endCoords[1]);

//       if (mapRef.current) {
//         const map = mapRef.current as L.Map;

//         startMarkerRef.current = L.marker(startLatLng).addTo(map);
//         startMarkerRef.current.setIcon(locIcon);
//         endMarkerRef.current = L.marker(endLatLng).addTo(map);
//         endMarkerRef.current.setIcon(locIcon);

//         routingControlRef.current = L.Routing.control({
//           waypoints: [startLatLng, endLatLng],
//         }).addTo(map);

//         routingControlRef.current.on("routesfound", (e) => {
//           const routes = e.routes;
//           const totalDistance = routes[0].summary.totalDistance;
//           const totalTime = routes[0].summary.totalTime;

//           const totalDistanceKm = totalDistance / 1000;
//           const totalTimeMin = totalTime / 60;

//           console.log("Total Distance:", totalDistanceKm.toFixed(2), "km");
//           console.log("Total Time:", totalTimeMin.toFixed(2), "minutes");
//           const coordinates = routes[0].coordinates;
//           const lastIndex = coordinates.length - 1;

//           movingMarkerRef.current = L.marker(coordinates[0], {
//             icon: movingIcons[selectedMarkerType],
//           }).addTo(map);

//           coordinates.forEach((coord: L.LatLng, index: number) => {
//             const timeout = setTimeout(() => {
//               if (movingMarkerRef.current) {
//                 movingMarkerRef.current.setLatLng([coord.lat, coord.lng]);
//                 map.panTo([coord.lat, coord.lng]);
//               }
//               if (index === lastIndex) {
//                 alert("Journey Complete!");
//               }
//             }, 100 * index);
//             movingMarkerTimeouts.current.push(timeout);
//           });
//         });
//       }
//     }
//   }, [startCoords, endCoords, selectedMarkerType]);

//   return (
//     <div className="p-4"> 
//       <div className="flex flex-col space-y-4  -ml-[370px] w-[300px] p-6 bg-white rounded-lg shadow-md">
//         <div> <h1 className="font-bold text-3xl p-4">Get a ride</h1>
//           <label htmlFor="Start" className=" font-bold text-2xl block text-sm font-medium text-gray-1000"></label>
//           <input 
//             type="text"
//             placeholder=  "Pickup location"
//             value={startCity}
//             onChange={(e) => setStartCity(e.target.value)}
            
//             className="mt-1 block w-60 pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <label htmlFor="Destination" className="block text-sm font-medium text-gray-700"></label>
//           <input
//             type="text"
//             placeholder="Dropoff location"
//             value={endCity}
//             onChange={(e) => setEndCity(e.target.value)}
//             className="mt-1 block w-60 pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <label htmlFor="markerType" className="block text-sm font-medium text-gray-700">Select Marker Type:</label>
//           <select
//             id="markerType"
//             value={selectedMarkerType}
//             onChange={(e) => setSelectedMarkerType(e.target.value)}
//             className="mt-1 block w-60 pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           >
//             <option value="auto">Auto</option>
//             <option value="carMini">Car Mini</option>
//             <option value="carMax">Car Max</option>
//           </select>
//         </div>
//         <button
//           onClick={handleRouting}
//           className="mt-2 block w-60 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
//         >
//           Show Route
//         </button>
//         {/* <button
//           onClick={() => ('/Customer/progress')}
//           className="mt-2 block w-60 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
//         >
//          Find my Driver
//         </button> */}
//       </div>
//       <div id="map" className="-mt-[340px] h-[655px] rounded-lg shadow-lg ml-[10px] w-[900px]"></div>
//     </div>
//   );
// };

// export default MapWithRouting;


'use client';
import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import axios from "axios";
import { LatLng } from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Override the default icon URLs
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

const movingIcons: { [key: string]: L.Icon } = {
  auto: L.icon({
    iconUrl: "/auto.png",
    iconSize: [25, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  carMini: L.icon({
    iconUrl: "/car-mini.png",
    iconSize: [25, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  carMax: L.icon({
    iconUrl: "/car-max.png",
    iconSize: [25, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
};

const locIcon = L.icon({
  iconRetinaUrl: MarkerIcon2x.src,
  iconUrl: MarkerIcon.src,
  shadowUrl: MarkerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

const MapWithRouting: React.FC = () => {
  const [startCity, setStartCity] = useState<string>("nagpur");
  const [endCity, setEndCity] = useState<string>("gurgaon");
  const [startCoords, setStartCoords] = useState<[number, number] | null>(null);
  const [endCoords, setEndCoords] = useState<[number, number] | null>(null);
  const [selectedMarkerType, setSelectedMarkerType] = useState<string>("carMax");
  const [showConfirmButton, setShowConfirmButton] = useState<boolean>(false);
  const [showProgressBar, setShowProgressBar] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const mapRef = useRef<L.Map | null>(null);
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const startMarkerRef = useRef<L.Marker | null>(null);
  const endMarkerRef = useRef<L.Marker | null>(null);
  const movingMarkerRef = useRef<L.Marker | null>(null);
  const movingMarkerTimeouts = useRef<NodeJS.Timeout[]>([]);

  async function handleRouting() {
    try {
      const startResponse = await axios.get<{ lat: string; lon: string; }[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${startCity}&limit=1`
      );
      const endResponse = await axios.get<{ lat: string; lon: string; }[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${endCity}&limit=1`
      );

      const startLat = parseFloat(startResponse.data[0].lat);
      const startLon = parseFloat(startResponse.data[0].lon);
      const endLat = parseFloat(endResponse.data[0].lat);
      const endLon = parseFloat(endResponse.data[0].lon);

      setStartCoords([startLat, startLon]);
      setEndCoords([endLat, endLon]);
      setShowConfirmButton(true);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  }

  useEffect(() => {
    if (startCoords && endCoords) {
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView(startCoords, 10);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "OSM",
        }).addTo(mapRef.current);
      } else {
        mapRef.current.setView(startCoords, 10);
      }

      if (mapRef.current) {
        const map = mapRef.current as L.Map;

        if (routingControlRef.current) {
          routingControlRef.current.getPlan().setWaypoints([]);
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }

        if (startMarkerRef.current) {
          map.removeLayer(startMarkerRef.current);
          startMarkerRef.current = null;
        }
        if (endMarkerRef.current) {
          map.removeLayer(endMarkerRef.current);
          endMarkerRef.current = null;
        }
        if (movingMarkerRef.current) {
          map.removeLayer(movingMarkerRef.current);
          movingMarkerRef.current = null;
        }

        movingMarkerTimeouts.current.forEach(clearTimeout);
        movingMarkerTimeouts.current = [];
      }

      const startLatLng: LatLng = L.latLng(startCoords[0], startCoords[1]);
      const endLatLng: LatLng = L.latLng(endCoords[0], endCoords[1]);

      if (mapRef.current) {
        const map = mapRef.current as L.Map;

        startMarkerRef.current = L.marker(startLatLng).addTo(map);
        startMarkerRef.current.setIcon(locIcon);
        endMarkerRef.current = L.marker(endLatLng).addTo(map);
        endMarkerRef.current.setIcon(locIcon);

        routingControlRef.current = L.Routing.control({
          waypoints: [startLatLng, endLatLng],
        }).addTo(map);

        routingControlRef.current.on("routesfound", (e) => {
          const routes = e.routes;
          const totalDistance = routes[0].summary.totalDistance;
          const totalTime = routes[0].summary.totalTime;

          const totalDistanceKm = totalDistance / 1000;
          const totalTimeMin = totalTime / 60;

          console.log("Total Distance:", totalDistanceKm.toFixed(2), "km");
          console.log("Total Time:", totalTimeMin.toFixed(2), "minutes");
          const coordinates = routes[0].coordinates;
          const lastIndex = coordinates.length - 1;

          movingMarkerRef.current = L.marker(coordinates[0], {
            icon: movingIcons[selectedMarkerType],
          }).addTo(map);

          coordinates.forEach((coord: L.LatLng, index: number) => {
            const timeout = setTimeout(() => {
              if (movingMarkerRef.current) {
                movingMarkerRef.current.setLatLng([coord.lat, coord.lng]);
                map.panTo([coord.lat, coord.lng]);
              }
              if (index === lastIndex) {
                alert("Journey Complete!");
              }
            }, 100 * index);
            movingMarkerTimeouts.current.push(timeout);
          });
        });
      }
    }
  }, [startCoords, endCoords, selectedMarkerType]);

  const handleConfirm = () => {
    setShowProgressBar(true);
    setProgress(0);

    const updateProgress = () => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
        }
        return newProgress;
      });
    };

    const progressInterval = setInterval(updateProgress, 100);
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '16px',
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '300px',
  };

  const mapContainerStyle = {
    height: '655px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  };

  const buttonStyle = {
    padding: '10px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      <div style={formContainerStyle}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Get a ride</h1>
        <input
          type="text"
          placeholder="Start City"
          value={startCity}
          onChange={(e) => setStartCity(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="End City"
          value={endCity}
          onChange={(e) => setEndCity(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleRouting} style={{ ...buttonStyle, backgroundColor: '#007bff', color: 'white' }}>
          Show Route
        </button>
        {showConfirmButton && (
          <>
            <button onClick={handleConfirm} style={{ ...buttonStyle, backgroundColor: '#28a745', color: 'white' }}>
              Confirm
            </button>
            {showProgressBar && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ height: '24px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
                  <div
                    style={{
                      width: `${progress}%`,
                      height: '100%',
                      backgroundColor: '#28a745',
                      borderRadius: '4px',
                      transition: 'width 0.1s ease-in-out',
                    }}
                  ></div>
                </div>
                <p>{progress}%</p>
              </div>
            )}
          </>
        )}
      </div>
      <div id="map" style={mapContainerStyle}></div>
    </div>
  );
};

export default MapWithRouting;



