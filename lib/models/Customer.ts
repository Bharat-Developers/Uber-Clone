import mongoose, { models, Schema } from 'mongoose';

const CustomerSchema = new Schema({
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
        required: true
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

const Customer = models.Customer || mongoose.model('Customer', CustomerSchema);

export default Customer;
