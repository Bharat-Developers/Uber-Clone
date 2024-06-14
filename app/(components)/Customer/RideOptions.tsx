import React, { useState } from 'react';
import styles from './RideOptions.module.css';
import Image from 'next/image';

const RideOptions: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePaymentClick = () => {
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <div className={styles.rideOptions}>
      <h1>Choose a ride</h1>
      <div className={styles.option}>
        <Image src="/ubercar.png" alt="Car-mini" className={styles.carImage} />
        <div className={styles.details}>
          <div className={styles.header}>
            <h2>Uber Go <span className={styles.seatIcon}>&#x1F464; 4</span></h2>
          </div>
          <p className={styles.description}>Affordable, compact rides</p>
          <div className={styles.priceSection}>
            <div className={styles.discount}>25% off</div>
            <div className={styles.price}>₹79.80</div>
            <div className={styles.originalPrice}>₹106.40</div>
          </div>
        </div>
      </div>

      <div className={styles.option}>
        <Image src="/premium.png" alt="Uber Go" className={styles.carImage} />
        <div className={styles.details}>
          <div className={styles.header}>
            <h2>Premier <span className={styles.seatIcon}>&#x1F464; 4</span></h2>
          </div>
          <p className={styles.description}>Comfortable sedans, top-quality drivers</p>
          <div className={styles.priceSection}>
            <div className={styles.discount}>25% off</div>
            <div className={styles.price}>₹98.44</div>
            <div className={styles.originalPrice}>₹131.25</div>
          </div>
        </div>
      </div>

      <div className={styles.option}>
        <Image src="/package.png" alt="Uber Go" className={styles.carImage} />
        <div className={styles.details}>
          <div className={styles.header}>
            <h2>Package <span className={styles.seatIcon}>&#x1F464; 4</span></h2>
          </div>
          <p className={styles.description}>Send Packages to loved ones</p>
          <div className={styles.priceSection}>
            <div className={styles.discount}>25% off</div>
            <div className={styles.price}>₹38.56</div>
            <div className={styles.originalPrice}>₹51.41</div>
          </div>
        </div>
      </div>

      <div className={styles.pay}>
        <button onClick={handlePaymentClick}>Add Payment Method</button>
      </div>

      {showPaymentModal && (
        <div className={styles.paymentModal}>
          <div className={styles.paymentModalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>×</button>
            <h2>Add payment method</h2>
            <div className={styles.paymentOption}>
              <Image src="/paypal.png" alt="PayPal" className={styles.paymentIcon} />
              <span>PayPal</span>
            </div>
            <div className={styles.paymentOption}>
              <Image src="/uber.png" alt="Gift Card" className={styles.paymentIcon} />
              <span>Gift Card</span>
            </div>
            <div className={styles.paymentOption}>
              <Image src="/cash-logo.png" alt="Cash" className={styles.paymentIcon} />
              <span>Cash</span>
            </div>
            <div className={styles.paymentOption}>
              <Image src="/paytm.png" alt="Paytm" className={styles.paymentIcon} />
              <span>Paytm</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideOptions;