import mongoose, { Schema } from "mongoose";

const S2CellSchema = new Schema({
     S2_Id: {
        type: String,
        required: true,
    },
    driverIds: {
        type: Array<Number>,
    }
})
const S2Cell = mongoose.model('S2Cell',S2CellSchema);
export default S2Cell;