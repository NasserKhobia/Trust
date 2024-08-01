import mongoose from "mongoose";
import { Schema } from "mongoose";

const markSchema = new Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Mark = mongoose.model("Mark", markSchema);

export default Mark;
