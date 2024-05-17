import mongoose, { Schema } from "mongoose";
import {UUID } from "mongodb";
const TripSchema = new Schema({
    customerId: {
        type: UUID,
        required : true,
    },
    driverId: {
        type: UUID,
        required : true,
    },
    status: {
        type: Number,
        required: true,
        default: 0,       
    },
    source: {
        type: Object, // of type @types/Point
        required: true,
    },
    destination : {
        type: Object, // of type @types/Point 
        required : true,
    }
},
{
    timestamps: true
});

const Trip = mongoose.model('Trip', TripSchema);

export default Trip;