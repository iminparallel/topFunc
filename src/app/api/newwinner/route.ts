
import connectDB from "../../../lib/mongodb";

import {Winners} from "../../models/winners";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const { first, winnerList, justDate } = await req.json();
  console.log(first, winnerList)
  const winner = first
  const answer = winnerList
  const date = justDate
  try {
    await connectDB();
    await Winners.create({ winner, answer, date});
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
