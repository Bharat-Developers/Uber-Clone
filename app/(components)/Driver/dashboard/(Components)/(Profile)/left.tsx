import Image from 'next/image';
import React, { useState } from 'react';
import { setCookie } from '@/app/functions/Cookies';
import { useRouter } from 'next/navigation';

const Left = () => {
  const router = useRouter();
  const [isGoActive, setIsGoActive] = useState(false);
  const ValueArray = [
    {
      // img : ,
      value : '12km',
    },
    {
      // img : ,
      value : '69 Rupees',
    },
    {
      // img : ,
      value : '6.9 Yr',
    }
  ]

  return (
    <div className='h-full flex flex-col justify-around items-center'>
      <style jsx>{`
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .arrow-animation {
          animation: blink 1s infinite;
        }
      `}</style>

      <button onClick={() => {
        setIsGoActive(true);
        setTimeout(() => {
          setCookie("GO", true, 1);
          router.push('./Trip_portal');
        }, 3000);
        setTimeout(() => {
          setIsGoActive(false);
        }, 3000); // reset the state after 3 seconds
      }}>
        <h1 className='text-4xl'>GO 
          <span className={`${isGoActive ? 'arrow-animation' : ''}`}> {`->`} </span>
        </h1>
      </button>

      <div className='flex flex-col gap-2'>
        {ValueArray.map((items, index) => (
          <div className='border px-2 py-1 flex gap-2 rounded items-center justify-around' key={index}>
            {/* <Image src={}/> */}
            {items.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Left;
