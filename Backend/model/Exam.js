import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  type: { type: mongoose.Schema.Types.ObjectId, ref: "ExamType" },
  date: Date  
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
