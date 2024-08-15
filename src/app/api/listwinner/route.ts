import { NextResponse } from "next/server";
import axios from "axios";
import connectDB from "../../../lib/mongodb";
import { Answers } from "../../models/answers";
import { Winners } from "../../models/winners";
import { headers } from "next/headers";
import mongoose from "mongoose";

export const maxDuration = 60;

export async function GET(request: Request) {
  const dictionaryToArrayOfObjects = (dictionary: any) => {
    return Object.keys(dictionary).map((key) => ({
      key: key,
      value: dictionary[key],
    }));
  };

  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code === process.env.NEXT_PUBLIC_SECRET_CODE!) {
    //only the owner with secret phrase can access
    const url = new URL(request.url);
    const id = url.searchParams.get("symbol");
    const date = new Date();
    const dateZero =
      date.getFullYear().toString() +
      "/" +
      (date.getMonth() + 1).toString() +
      "/" +
      date.getDate().toString() +
      " " +
      "05:30:00";
    const justDate =
      date.getFullYear().toString() +
      "/" +
      (date.getMonth() + 1).toString() +
      "/" +
      date.getDate().toString();

    await connectDB();
    const top = await Winners.find({ date: justDate });

    if (!top[0]) {
      const dateZeroTimeStamp = parseInt(
        Date.parse(dateZero).toString().slice(0, 10)
      );
      const dateMinusOneTimeStamp = dateZeroTimeStamp - 24 * 60 * 60;

      const response = await axios.get(
        `https://api.kucoin.com/api/v1/market/allTickers/`
      );
      const assetDictionary = response.data.data.ticker;

      assetDictionary.sort(function (a: any, b: any) {
        return b.changeRate - a.changeRate;
      });

      const splicedList = dictionaryToArrayOfObjects(assetDictionary).slice(
        0,
        50
      );

      interface PriceChange {
        [key: string]: number; // Define that assetList[key] will be a number for any key of type string
      }

      let priceChange = [];
      for (let i = 0; i < splicedList.length; i++) {
        const res = await axios.get(
          `https://api.kucoin.com/api/v1/market/candles?type=1day&symbol=${splicedList[i].value.symbol}&startAt=${dateMinusOneTimeStamp}&endAt=${dateZeroTimeStamp}`
        );
        const change = res.data.data[0][2] / res.data.data[0][1];
        const token = splicedList[i].value.symbol;
        priceChange.push({ id: token, var: change });
      }

      priceChange.sort(function (a: any, b: any) {
        return b.var - a.var;
      });

      const winnerList =
        priceChange[0].id + "_" + priceChange[1].id + "_" + priceChange[2].id;
      console.log(winnerList);

      const subs = await Answers.find({
        time: { $gte: dateMinusOneTimeStamp, $lt: dateZeroTimeStamp },
        answer: winnerList,
      }); //,  ,

      const headersList = headers();
      const host = headersList.get("host");
      console.log("host", host);

      try {
        try {
          const first = subs[0].userName + "#" + subs[0]._id;
          const res = await fetch(
            /*host*/ "http://" + host + "/api/newwinner",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                first,
                winnerList,
                justDate,
              }),
            }
          );
          return NextResponse.json({ message: first });
        } catch (error) {
          const first = "no winner";
          const res = await fetch(
            /*host*/ "http://" + host + "/api/newwinner",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                first,
                winnerList,
                justDate,
              }),
            }
          );
          return NextResponse.json({ message: "no winner" });
        }
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          let errorList = [];
          for (let e in error.errors) {
            errorList.push(error.errors[e].message);
          }
          console.log(errorList);
          return NextResponse.json({ message: errorList });
        } else {
          return NextResponse.json({ message: error });
        }
      }
    } else {
      return NextResponse.json({ message: "Today's winner has been decided" });
    }
  } else {
    return NextResponse.json({
      message:
        "only the owner is authorized to run this function, drop by at @haritchowdhury for more",
    });
  }
}
