import React from 'react';
import styles from './Popup.module.css';

interface CancellationPopupProps {
  show: boolean;
  onClose: () => void;
}

const CancellationPopup: React.FC<CancellationPopupProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>Trip Cancelled</h2>
        <p>The rider has cancelled the trip.</p>
        <button className={styles.acceptButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CancellationPopup;
