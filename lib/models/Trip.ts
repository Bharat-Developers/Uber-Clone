import mongoose, { Schema } from "mongoose";
const TripSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref : 'Customer',
        required : true,
    },
    driverId: {
        type: Schema.Types.ObjectId,
        ref : 'Driver',
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
    },
    amount : {
        type : String,
        required : true,
    }
},
{
    timestamps: true
});

const Trip = mongoose.model('Trip', TripSchema);

export default Trip;