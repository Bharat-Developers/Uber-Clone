import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image';
import styles from './GetARideForm.module.css';
import { getPrice } from '@/app/functions/Price';

interface RideOfferProps {
    location1: string
    location2: string
    coor1: Location
    coor2: Location
    distance: number,
    setShowPrice: ()=>void
}

const Rideoffer: React.FC<RideOfferProps> = ({
    location1,
    location2,
    coor1,
    coor2,
    distance,
    setShowPrice,
}) => {
    const [confirm, setConfirm] = useState(false);
    const [amount, setamount] = useState(0); // this is unsecure way 
    
    
    const handleSelect = async (vehicleType: string) => {
        console.log(vehicleType)
        setConfirm(true)
        const price = await getPrice(distance);
        
        if (vehicleType === '2-wheeler'){
            setamount(parseFloat((price*0.6).toFixed(2)))
        }else if(vehicleType === 'car'){
            setamount(parseFloat((price).toFixed(2)))
        }else if(vehicleType === 'auto'){
            setamount(parseFloat((price*0.85).toFixed(2)))
        }
      };
      const handleBack=()=>{
        setShowPrice()
      }
    return (
        <div>
            <div className={styles.container}>
                <h2 className={styles.title}>Confirm trip</h2>

                <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="rounded-lg overflow-hidden">
                        <div className="bg-black text-white p-4 flex justify-between items-center">
                            <span>Uber</span>
                            <button className="bg-white text-black py-1 px-3 rounded mt-2">Help</button>
                        </div>
                        <div className="bg-white text-black p-4 relative">
                            <Image src="/dollar_bill.png" height={40} width={40} alt="Money" className="mt-6" />
                            <h1 className="text-xl mt-4">Choose your ride</h1>
                            <div className="mt-4 text-sm">
                                <div
                                    className="bg-neutral-300 w-76 h-16 mt-2 p-4 rounded cursor-pointer flex items-center justify-between hover:bg-gray-200"
                                    onClick={() => handleSelect('car')}
                                >
                                    <span>Car</span>
                                    <Image src="/car.png" height={50} width={50} alt="Car" />
                                </div>
                                <div
                                    className="bg-neutral-300 w-76 h-16 mt-2 p-4 rounded cursor-pointer flex items-center justify-between hover:bg-gray-200"
                                    onClick={() => handleSelect('auto')}
                                >
                                    <span>Auto</span>
                                    <Image src="/auto.png" height={40} width={40} alt="Auto" />
                                </div>
                                <div
                                    className="bg-neutral-300 w-76 h-16 mt-2 p-4 rounded cursor-pointer flex items-center justify-between hover:bg-gray-200"
                                    onClick={() => handleSelect('2-wheeler')}
                                >
                                    <span>2-Wheeler</span>
                                    <Image src="/moto.png" height={40} width={40} alt="2-Wheeler" />
                                </div>
                            </div>
                            
                            <br></br>
                        </div>
                    </div>
                </div>
                {confirm && <div>Price: Rs {amount}</div>}
                <button className={`${styles.button} ${styles.confirmButton}`} onClick={handleBack} >Back</button>
                {confirm && <Link href={{
                    pathname: '/Customer/ride/ride-portal',
                    query: {
                        pickup: location1,
                        dropoff: location2,
                        pickupcoor: JSON.stringify(coor1),
                        dropoffcoor: JSON.stringify(coor2),
                        amount: amount
                    }
                }}
                    className={`${styles.button} ${styles.confirmButton}`}
                >
                    Confirm
                </Link>}
            </div>
        </div>
    )
}

export default Rideoffer