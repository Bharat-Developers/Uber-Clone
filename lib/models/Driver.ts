import { ObjectId } from 'mongodb';
import mongoose, { models ,Schema} from 'mongoose';

const DriverSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        unique: true
    },
    location : {
        type: String,
        required:true
    },
    dob: {
        type: String,
        required: true
    },
    termsAccepted: {
        type: Boolean,
        required: true
    },
    region: {
        type: String,
    },
    availablity: {
        type: Boolean,
        required: true
    },
    cabId: {
        type: ObjectId,
        required: true   
    },
    cabType: {
        type: String,
    }
},
{
    timestamps: true,
});

const Driver = models.Driver || mongoose.model('Driver', DriverSchema);

export default Driver;
