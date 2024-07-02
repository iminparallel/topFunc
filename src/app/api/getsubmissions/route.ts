import {Answers} from "../../models/answers"; 
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
await connectDB();
const url = new URL(request.url)
const user = url.searchParams.get('user')  
const top = await Answers.find({userName: user})
const submissions = top.reverse()
return NextResponse.json({message: top});
}