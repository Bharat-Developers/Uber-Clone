import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const CabSchema = new Schema({
    
        driverId: {
            type: ObjectId,
            required: true,
            //unique: true,
        },
        model: {
            type: String,
            required: true
        },
        regNo: {
            type: String,
            required: true
        }

    })

    const Cab = mongoose.model('Cab',CabSchema)

    export default Cab;