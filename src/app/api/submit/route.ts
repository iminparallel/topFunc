
import connectDB from "../../../lib/mongodb";

import {Answers} from "../../models/answers";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const { first, second, third, userName } = await req.json();
  const date = new Date()
  const time = parseInt(Date.parse(date).toString().slice(0,10));
  const answer =  first.toUpperCase() + "_" + second.toUpperCase() + "_" + third.toUpperCase();
  console.log(time)
  try {
    await connectDB();
    await Answers.create({ userName, first, second, third, answer, time });
    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json({ msg: ["Unable to send message."] });
    }
  }
}
