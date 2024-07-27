import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const [selectedSection, setSelectedSection] = useState('distance');

  const distanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Distance (km)',
        data: [5, 10, 15, 20, 25, 30, 35],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const costData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Cost ($)',
        data: [20, 25, 30, 35, 40, 45, 50],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const feedbackData = [
    { cust_name: 'Alice', time: '10:30 AM', date: '2024-07-10', message: 'Great service!' },
    { cust_name: 'Bob', time: '11:00 AM', date: '2024-07-11', message: 'Very comfortable ride.' },
    { cust_name: 'Charlie', time: '02:15 PM', date: '2024-07-12', message: 'Driver was friendly.' },
  ];

  return (
    <div className='flex flex-col w-full m-5'>
      <div className='flex justify-around'>
        <button onClick={() => setSelectedSection('distance')}>Distance</button>
        <button onClick={() => setSelectedSection('cost')}>Cost</button>
        <button onClick={() => setSelectedSection('feedback')}>Feedback</button>
      </div>

      <div className='w-full'>
        {selectedSection === 'distance' && (
          <div>
            <Bar data={distanceData} />
          </div>
        )}
        {selectedSection === 'cost' && (
          <div>
            <Bar data={costData} />
          </div>
        )}
        {selectedSection === 'feedback' && (
          <div>
            {feedbackData.map((feedback, index) => (
              <div key={index} className='border p-2 mb-2'>
                <p><strong>Name:</strong> {feedback.cust_name}</p>
                <p><strong>Time:</strong> {feedback.time}</p>
                <p><strong>Date:</strong> {feedback.date}</p>
                <p><strong>Message:</strong> {feedback.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Graph;
