import mongoose from "mongoose";
import { Schema } from "mongoose";

const subjectSchema = new Schema({
    name : String,
    roomId : { type:mongoose.Schema.Types.ObjectId, ref:"Room"}
});

const Subject = mongoose.model('Subject',subjectSchema);

export default Subject;