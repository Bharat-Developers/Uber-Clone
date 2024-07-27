import React from "react";
import styles from "./PrevRides.module.css";

interface Ride {
  date: string;
  time: string;
  distance: string;
  cost: string;
}

interface PrevRidesProps {
  rides: Ride[];
}

const PrevRides: React.FC<PrevRidesProps> = ({ rides }) => {
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <h2 className={styles.title}>Previous Rides</h2>
        <div className={styles.headings}>
          <div className={styles.heading}>Date</div>
          <div className={styles.heading}>Time</div>
          <div className={styles.heading}>Dist.</div>
          <div className={styles.heading}>Cost</div>
        </div>
        <hr />
        {rides.map((ride, index) => (
          <div key={index} className={styles.ride}>
            <div>{ride.date}</div>
            <div>{ride.time}</div>
            <div>{ride.distance}</div>
            <div>{ride.cost}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

PrevRides.defaultProps = {
  rides: [
    { date: "2024-07-10", time: "10:30 AM", distance: "12 km", cost: "$15" },
    { date: "2024-07-09", time: "02:45 PM", distance: "8 km", cost: "$10" },
    { date: "2024-07-08", time: "05:00 PM", distance: "15 km", cost: "$20" },
  ],
};

export default PrevRides;
