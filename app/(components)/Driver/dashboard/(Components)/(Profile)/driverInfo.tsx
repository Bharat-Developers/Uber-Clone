import React from 'react'

interface DriverInfoProps {
  DOB: Date;
  Aadhar: string;
  Number: number;
  Email: string;
  Join_Date: Date;
}

const DriverInfo: React.FC<DriverInfoProps> = ({ DOB, Aadhar, Number, Email, Join_Date }) => {
  const convertAadhar = () => {
    Aadhar = Aadhar.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3");
  };
  convertAadhar()
  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl font-medium'>Driver</h1>
      <div className='flex gap-3 pl-4'>
        <div className='flex flex-col'>
          <h3>Date Of Birth</h3>
          <h3>Aadhar ID</h3>
          <h3>Phone Number</h3>
          <h3>Email Address</h3>
          <h3>Join Dara</h3>
        </div>
        <div>
          <h3>{DOB.toDateString()}</h3>
          <h3>{Aadhar.toString()}</h3>
          <h3>{Number.toString()}</h3>
          <h3>{Email}</h3>
          <h3>{Join_Date.toDateString()}</h3>
        </div>
      </div>
    </div>
  )
}

export default DriverInfo
