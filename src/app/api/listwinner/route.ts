import { NextResponse } from "next/server";
import axios from 'axios';
import connectDB from "../../../lib/mongodb";
import {Answers} from "../../models/answers"; 
import {Winners} from "../../models/winners"; 
import { headers } from 'next/headers';

type ResponseData = {
  message: string
}

export async function postWinner(first, winnerList, justDate) {
    const headersList = headers();
    console.log(headersList)
    const host = headersList.get('host')
    try{
    const res = await fetch( host /* "http://localhost:3000" */ + "/api/newwinner", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          first,
          winnerList,
          justDate
        }),
      });
     catch (error){
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
 
export async function GET(request: Request) {
function sortDictByValue(dict: Record<string, number>)
    : Record<string, number> {
        return Object.keys(dict)
          .sort((a, b) => dict[b] - dict[a])
          .reduce((acc, key) => {
            acc[key] = dict[key];
            return acc;
          }, {} as Record<string, number>);
      } 
const dictionaryToArrayOfObjects = (dictionary) => {
        return Object.keys(dictionary).map(key => ({
            key: key,
            value: dictionary[key]
        }));
    };

const url = new URL(request.url)
const code = url.searchParams.get('code')    


if(code===process.env.NEXT_PUBLIC_SECRET_CODE){    
      //only the owner with secret phrase can access
  const url = new URL(request.url)
  const id = url.searchParams.get('symbol')
  const date = new Date()
  const dateZero = date.getFullYear().toString() + "/"
  + (date.getMonth() + 1).toString() + "/"
  + date.getDate().toString() + " "
  + "05:30:00"
  const justDate = date.getFullYear().toString() + "/"
  + (date.getMonth() + 1).toString() + "/"
  + date.getDate().toString() 

  await connectDB();
  const top = await Winners.find({date: justDate})

  if(!top[0]){ 

  const dateZeroTimeStamp = parseInt(Date.parse(dateZero).toString().slice(0,10));
  const dateMinusOneTimeStamp =  dateZeroTimeStamp - 24*60*60
  let assetList = {}

  const response = await axios.get(`https://api.kucoin.com/api/v1/market/allTickers/`);
  for (let i = 0; i < response.data.data.ticker.length; i++) {
    assetList[response.data.data.ticker[i].symbol] = response.data.data.ticker[i].volValue
  }
  const sortedList = sortDictByValue(assetList);
  const splicedList = dictionaryToArrayOfObjects(sortedList).slice(0,50);
 
  let priceChange = {}
  for (let i = 0; i < splicedList.length; i++) {
    const res = await axios.get(`https://api.kucoin.com/api/v1/market/candles?type=1day&symbol=${splicedList[i].key}&startAt=${dateMinusOneTimeStamp}&endAt=${dateZeroTimeStamp}`);
    const change = res.data.data[0][2]/res.data.data[0][1]
    if (res){    
      priceChange[splicedList[i].key] = change}
    }
  const sortedChange =  sortDictByValue(priceChange);
  const resultList = dictionaryToArrayOfObjects(sortedChange).slice(0,3);
  const winnerList =  resultList[0].key + "_" +
                  resultList[1].key + "_" +
                  resultList[2].key  
  console.log(winnerList)                
  let winner = {}
  const subs = await Answers.find({time: {$gte: dateMinusOneTimeStamp, $lt:dateZeroTimeStamp},  answer:winnerList}) //,  , 
  if(subs){
     winner = subs[0]
  }

  try{
    const identifier = winner.userName + "#" + winner._id
    await postWinner(identifier, winnerList, justDate)
  }
  catch{
    const slug = "no winner"
    await postWinner(slug, winnerList, justDate)
  }
   console.log("A1")

  return NextResponse.json( {message: subs});
}
 else{
    return NextResponse.json({message: "Today's winner has been decided"});

  } 
}
else{
  return NextResponse.json({message: "only the owner is authorized to run this function, drop by at @haritchowdhury for more"});
}
}