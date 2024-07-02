import {Winners} from "../../models/winners"; 
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
await connectDB();
const url = new URL(request.url)
const justDate = url.searchParams.get('date')  
const top = await Winners.find({date: justDate})
console.log(top[0])
return NextResponse.json({message: top[0]});
}