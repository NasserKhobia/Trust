import mongoose from "mongoose";
import { Schema } from "mongoose";

const classSchema = new Schema({
    name : String,
});

const Class = mongoose.model('Class',classSchema);

export default Class;
