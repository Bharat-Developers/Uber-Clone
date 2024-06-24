import React from 'react';
import DriverPortal from './DriverPortal';
import Navbar from '../../navbar/Navbar';
import Map from '../Map';
import styles from './page.module.css';

const DriverPortalPage: React.FC = () => (
  <>
    <div>
      <Navbar />
    </div>
    <div className={styles.container}>
      <div className={styles.portalContainer}>
        <DriverPortal />
      </div>
      <div className={styles.mapContainer}>
        <Map />
      </div>
    </div>
  </>
);

export default DriverPortalPage;
