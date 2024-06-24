import React from 'react';
import styles from './Popup.module.css';

interface PopupProps {
  show: boolean;
  onClose: () => void;
  // onAccept: () => void;
  // onReject: () => void;
}

const Popup: React.FC<PopupProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <h2>New Ride Alert ! </h2>
        <p>Time : 1 pm </p>
        <div className={styles.buttonContainer}>
          <button className={styles.acceptButton} >Accept</button>
          <button className={styles.rejectButton} >Reject</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
