"use client";

import React from 'react';
import Navigation from '../Navigation/Navigation';
import MapComponent from '../map/Map';
import Sidebar from '../sidebar/Sidebar'; // Adjust the path if necessary

export default function Dashboard() {
  return (
    <>
     <Sidebar/>
     <MapComponent/>
    </>
  );
}
