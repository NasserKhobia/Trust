import mongoose from "mongoose";
import { Schema } from "mongoose";

const archifSchema = new Schema({
    userId: {type:mongoose.Schema.Types.ObjectId ,ref:"User"}
});

const Archif = mongoose.model('Archif',archifSchema);

export default Archif;