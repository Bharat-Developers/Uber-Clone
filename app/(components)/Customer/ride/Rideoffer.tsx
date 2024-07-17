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
    setShowPrice: () => void
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

        if (vehicleType === '2-wheeler') {
            setamount(parseFloat((price * 0.6).toFixed(2)))
        } else if (vehicleType === 'car') {
            setamount(parseFloat((price).toFixed(2)))
        } else if (vehicleType === 'auto') {
            setamount(parseFloat((price * 0.85).toFixed(2)))
        }
    };
    const handleBack = () => {
        setShowPrice()
    }
    return (
        <div>
            <div className={"rounded-lg max-w-md p-8 shadow-lg bg-white"}>

                <h2 className={styles.title}>Confirm trip</h2>

                <div className="">
                    <div className="rounded-lg overflow-hidden bg-gray-100">
                        <div className="bg-white text-black p-2 relative">
                            <Image src="/dollar_bill.png" height={40} width={40} alt="Money" className="mt-6" />
                            <h1 className="text-xl mt-4">Choose your ride</h1>
                            <div className="mt-1 text-sm">
                                <div
                                    className="bg-neutral-300 w-90 h-16 mt-2 p-4 rounded cursor-pointer flex items-center justify-between hover:bg-gray-200"
                                    onClick={() => handleSelect('car')}
                                >
                                    <span>Car</span>
                                    <Image src="/car.png" height={50} width={50} alt="Car" />
                                </div>
                                <div
                                    className="bg-neutral-300 w-90 h-16 mt-2 p-4 rounded cursor-pointer flex items-center justify-between hover:bg-gray-200"
                                    onClick={() => handleSelect('auto')}
                                >
                                    <span>Auto</span>
                                    <Image src="/auto.png" height={40} width={40} alt="Auto" />
                                </div>
                                <div
                                    className="bg-neutral-300 w-90 h-16 mt-2 p-4 rounded cursor-pointer flex items-center justify-between hover:bg-gray-200"
                                    onClick={() => handleSelect('2-wheeler')}
                                >
                                    <span>2-Wheeler</span>
                                    <Image src="/moto.png" height={40} width={40} alt="2-Wheeler" />
                                </div>
                            </div>
                            <br />
                            {confirm && <h1 className="text-xl mt-4 pb-2">Price: Rs {amount}</h1>}
                            <button className={"py-2 px-5 mr-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-grey-700 focus:outline-none focus:ring focus:ring-grey-400 focus:ring-opacity-75"}onClick={handleBack} >back</button>
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
                                className={"py-2 px-5 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-grey-700 focus:outline-none focus:ring focus:ring-grey-400 focus:ring-opacity-75"}
                            >
                                Confirm
                            </Link>}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Rideoffer