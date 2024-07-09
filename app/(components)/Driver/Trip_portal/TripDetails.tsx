import { useState } from "react"

interface TripDetailsProps{
  isAccepted : boolean,
  isOnGoing : boolean,
  tripAccepted: any,
  onGoing: any,
  submitOtp: (otp: number)=> void,
  Cancel: () => void
}
const TripDetails :React.FC <TripDetailsProps> = ({
    isAccepted,
    isOnGoing,
    tripAccepted,
    onGoing,
    submitOtp,
    Cancel
}
   
) => {

  const [otp,setOtp] = useState(0)
  
  return(
    <>
    {isAccepted &&
    <div>
      {isOnGoing?<h1>Next Trip</h1>:<h1>Trip detials</h1>}
      <h5>
        pickup: {tripAccepted.details.pickup} <br/>
        dropoff: {tripAccepted.details.dropoff} <br/>
        name: {tripAccepted.details.name}<br/>
        amount: {tripAccepted.details.amount}<br/>
        {/* distance: 
        time:  */}
      </h5>
      
      {!isOnGoing && 
      <div>
      {/* enetr otp */}
      enter otp
      <input type="number" onChange={(e)=>setOtp(parseInt(e.target.value))}/> 
      {/* start trip */}
      <button onClick={()=>submitOtp(otp)} disabled={otp/1000<1 && otp/9999>1} >Submit OTP</button>
      {/* error msg invalid otp */}
      <br/>
      <button onClick={()=>Cancel()}>Cancel</button>
      </div>
      }  
    </div>
    }
    {isOnGoing && 
    <div>
      <h5>
        pickup: {onGoing.details.pickup}
        dropoff: {onGoing.details.dropoff}
        name: {onGoing.details.name}
        amount: {onGoing.details.amount}
        {/* distance: 
        time:  */}
      </h5>
    </div>
    }
    </>
  )
}

export default TripDetails