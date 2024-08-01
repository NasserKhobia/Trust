import mongoose from "mongoose";

const examTypeSchema = new mongoose.Schema({
  name: String,
  min: Number,
  max: Number,
});

const ExamType = mongoose.model("Exam", examTypeSchema);

export default ExamType;
