import { UUID } from "mongodb";
import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema({
    uniqueId:{
        type: UUID,
        required: true,
    },
    TripId: {
        type: UUID,
        required: true,
    },
    method: {
        type: String, // UPI || cash || online payment
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String, // cancelled || completed || pending
        required: true,
    }

})

const Payment = mongoose.model('Payment',PaymentSchema);
export default  Payment;