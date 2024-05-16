import mongoose, { models } from 'mongoose';

const { Schema } = mongoose;

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
    }
},
{
    timestamps: true,
});

const Driver = models.Driver || mongoose.model('Driver', DriverSchema);

export default Driver;
