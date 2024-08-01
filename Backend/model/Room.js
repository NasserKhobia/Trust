import mongoose from "mongoose";
import { Schema } from "mongoose";
import Class from "./Class";

const roomSchema = new Schema({
    name : String,
    classId: { type:mongoose.Schema.Types.ObjectId , ref:"Class"}
});

const Room = mongoose.model('Room',roomSchema);

export default Room