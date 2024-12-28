import { Winners } from "../../models/winners";
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connectDB();
  const top = await Winners.find();
  return NextResponse.json({ message: top.reverse() });
}
