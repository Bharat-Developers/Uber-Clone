import React from 'react';
import ProgressBar from './ProgressBar'; // Adjusted import path
import Navbar from '../navbar/Navbar';
const ProgressPage: React.FC = () => {
    return (
        <><Navbar /><div>
            <ProgressBar />
        </div></>
    );
};

export default ProgressPage;
