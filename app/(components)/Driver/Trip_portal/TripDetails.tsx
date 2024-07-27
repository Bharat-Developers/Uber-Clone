import { useState } from "react"

interface TripDetailsProps {
  isAccepted: boolean,
  isOnGoing: boolean,
  tripAccepted: any,
  onGoing: any,
  submitOtp: (otp: number) => void,
  Cancel: () => void
}
const TripDetails: React.FC<TripDetailsProps> = ({
  isAccepted,
  isOnGoing,
  tripAccepted,
  onGoing,
  submitOtp,
  Cancel
}

) => {

  const [otp, setOtp] = useState(0)

  return (
    <>
      {isAccepted &&
        <div>
          <div className="p-4 border rounded-md shadow-md">
            {isOnGoing ? (
              <h1 className="text-xl font-bold">Next Trip</h1>
            ) : (
              <h1 className="text-xl font-bold">Trip Details</h1>
            )}
         
          <div className="my-4">
            <h5 className="text-sm">
              <span className="font-bold">Pickup:</span> {tripAccepted.details.pickup} <br />
              <span className="font-bold">Dropoff:</span> {tripAccepted.details.dropoff} <br />
              <span className="font-bold">Name:</span> {tripAccepted.details.name} <br />
              <span className="font-bold">Amount:</span> {tripAccepted.details.amount} <br />
              {/* Distance and Time can be added here */}
            </h5>
          </div>
        </div>

          {!isOnGoing &&
               <div className="my-4">
               <label htmlFor="otp" className="text-sm font-bold">
                 Enter OTP:
               </label>
               <input
                 id="otp"
                 type="number"
                 className="border rounded-md px-2 py-1 ml-2"
                 onChange={(e) => setOtp(parseInt(e.target.value))}
               />
               <button
                 className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md disabled:bg-gray-400"
                 onClick={() => submitOtp(otp)}
                 disabled={otp / 1000 < 1 && otp / 9999 > 1}
               >
                 Submit OTP
               </button>
               <br />
               <button
                 className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md"
                 onClick={() => Cancel()}
               >
                 Cancel
               </button>
             </div>
          }
        </div>
      }
      {isOnGoing &&
        <div className="p-4 border rounded-md shadow-md">
        <h1 className="text-xl font-bold">On-Going Trip</h1>
        <div className="my-4">
          <h5 className="text-sm">
            <span className="font-bold">Pickup:</span> {onGoing.details.pickup} <br />
            <span className="font-bold">Dropoff:</span> {onGoing.details.dropoff} <br />
            <span className="font-bold">Name:</span> {onGoing.details.name} <br />
            <span className="font-bold">Amount:</span> {onGoing.details.amount} <br />
            {/* Distance and Time can be added here */}
          </h5>
        </div>
      </div>
      }
    </>
  )
}

export default TripDetails