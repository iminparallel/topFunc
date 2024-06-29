import mongoose, { Schema } from "mongoose";

const answersSchema = new Schema({
  userName: {
    type: String,
    required: [true, "choice is required."],
    trim: true,
    minLength: [2, "choice must be larger than 2 characters"],
    maxLength: [30, "choice must be lesser than 11 characters"],
  },
  first: {
    type: String,
    required: [true, "choice is required."],
    trim: true,
    minLength: [2, "choice must be larger than 2 characters"],
    maxLength: [11, "choice must be lesser than 11 characters"],
  },
  second: {
    type: String,
    required: [true, "Choice is required."],
    trim: true,
    minLength: [2, "Choice must be larger than 2 characters"],
    maxLength: [11, "Choice must be lesser than 11 characters"],
  },
  third: {
    type: String,
    required: [true, "Choice is required."],
    trim: true,
    minLength: [2, "Choice must be larger than 2 characters"],
    maxLength: [11, "Choice must be lesser than 11 characters"],
  },
  answer: {
    type: String,
    required: [true, "Choice is required."],
    trim: true,
    minLength: [12, "Your choices don't look too sound Chief"],
    maxLength: [50, "Your choices don't look too sound Chief"],
  },
  time: {
    type: Number,
    required: [true, "Date not recorded, please try again"],
  },


});

const Answers =
  mongoose.models.Input || mongoose.model("Input", answersSchema);

module.exports = {Answers};
