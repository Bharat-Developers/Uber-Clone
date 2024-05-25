import React from 'react';
import { useRouter } from 'next/navigation';

interface FindDriverButtonProps {
  onClick: () => void;
}

const FindDriverButton: React.FC<FindDriverButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
      Find My Driver
    </button>
  );
};

export default FindDriverButton;
