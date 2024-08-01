    import mongoose from "mongoose";
    import { Schema } from "mongoose";

// Base schema
const adminSchema = new Schema({
  name: String,

  username: { type: String, required: true, unique: true },

  password: String,

  Phone: String,

  createdAt: { type: Date, default: Date.now },
});

// Discriminator schema (for User)
const userSchema = new Schema({
  roomId: {type:mongoose.Schema.Types.ObjectId , ref:"Room"},
  gender: {enum : ['Male','Female']},
  archifId : {type:mongoose.Schema.Types.ObjectId , ref:"Archif"}
});

// Create models
const Admin = mongoose.model("Admin", adminSchema);
const User = User.discriminator("Pearnt", userSchema);

export { Admin, User };