// DriverPortal.tsx
"use client"
import React from 'react';
import styles from './RidePortal.module.css';

interface RidePortalProps {
  progress: number;
}

const RidePortal: React.FC<RidePortalProps> = ({ progress }) => {
  const containerStyles: React.CSSProperties = {
    height: '20px',
    width: '82%',
    backgroundColor: "#e0e0df",
    borderRadius: '50px',
    margin: '20px'
  };

  const fillerStyles: React.CSSProperties = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: 'blue',
    borderRadius: 'inherit',
    textAlign: 'right' as 'right' // Explicitly type 'textAlign' as 'right'
  };

  const labelStyles: React.CSSProperties = {
    padding: '5px',
    color: 'white',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
      </div>
    </div>
  );
};

export default RidePortal;
