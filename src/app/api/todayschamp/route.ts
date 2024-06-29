import {Winners} from "../../models/winners"; 
import connectDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
await connectDB();
const url = new URL(request.url)
const justDate = url.searchParams.get('date')  
const top = await Winners.find({date: justDate})
return NextResponse.json({message: top[0]});
}