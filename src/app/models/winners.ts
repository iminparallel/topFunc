import mongoose, { Schema } from "mongoose";

const winnersSchema = new Schema({
  winner: {
    type: String,
    required: [true, "choice is required."],
  },
  answer: {
    type: String,
    required: [true, "Choice is required."],
    trim: true,
  },
  date: {
    type: String,
    required: [true, "Choice is required."],
    trim: true,
  },
});

const Winners =
  mongoose.models.Winners || mongoose.model("Winners", winnersSchema);

export {Winners};
