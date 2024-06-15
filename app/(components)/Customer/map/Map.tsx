// "use client";
// import React, { useEffect } from 'react';

// const Map: React.FC = () => {
//     useEffect(() => {
       
//         const initMap = () => {
//             const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
//                 center: { lat: 21.1458, lng: 79.0882 }, // Coordinates for Nagpur, India
//                 zoom: 13,
//             });
//         };

//         if (typeof google !== 'undefined') {
//             initMap();
//         } else {
//             const script = document.createElement('script');
//             script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
//             script.async = true;
//             script.defer = true;
//             document.head.appendChild(script);
//             script.addEventListener('load', initMap);
//         }
//     }, []);

//     return <div id="map" style={{ height: '670px', width: '100%' }}></div>;
// };

// export default Map;
