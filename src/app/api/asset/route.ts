import { NextResponse } from "next/server";
import axios from 'axios';
 
type ResponseData = {
  message: string
}
 
export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('symbol')
  const response = await axios.get(`https://api.kucoin.com/api/v1/market/stats?symbol=` + id);
  return NextResponse.json({message: response.data});
}