import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>Earning</li> 
        {/* Earning and trips in dashboard, noti and cont in active*/}
        {/* make a component */}
        <li>Trips</li>
        {/* Trip details in active */}


        <li>Notifications</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default Sidebar;
