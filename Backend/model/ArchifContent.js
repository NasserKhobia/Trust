import mongoose from "mongoose";
import { Schema } from "mongoose";

const contentArchifSchema = new Schema(
  {
    day : Date,
    content: String,
    auther: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    archifId : { type: mongoose.Schema.Types.ObjectId, ref: "Archif" },
  },
  { timestamps: true }
);

const ContentArchif = mongoose.model('ContentArchif',contentArchifSchema);

export default ContentArchif;