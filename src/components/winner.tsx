"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Play } from "@/components/play";
import { CSSProperties } from "react";

export function Winner(props: any) {
  const [winner, setWinner] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState("");

  const date = new Date();
  const today =
    date.getFullYear().toString() +
    "/" +
    (date.getMonth() + 1).toString() +
    "/" +
    date.getDate().toString();

  const style_hover2: CSSProperties = {
    position: "fixed",
    bottom: 25,
    left: 15,
    width: "100%",
  };
  const stylea: CSSProperties = {
    position: "absolute",
    top: 175,
    right: 300,
    color: "green",
  };

  async function getWinner(today: String) {
    try {
      const response = await axios.get("api/todayschamp/", {
        params: { date: today },
      });
      if (response.data.message.winner.toString() === "no winner") {
        setWinner(response.data.message.winner.toString());
        setTime("NA");
      } else {
        const todaysWinner = response.data.message.winner.split("#");
        setWinner(todaysWinner[0]);
        setTime(todaysWinner[2]);
      }
      const ans = response.data.message.answer.split("_");
      console.log(ans);
      setFirst(ans[0]);
      setSecond(ans[1]);
      setThird(ans[2]);
      setLoading(false);
    } catch {
      setWinner("Not declared!");
      setTime("NA");
      setFirst("TBD");
      setSecond("TBD");
      setThird("TBD");
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getWinnerFirst() {
      try {
        const response = await axios.get("api/todayschamp/", {
          params: { date: today },
        });
        console.log(response);
        if (response.data.message.winner.toString() === "no winner") {
          setWinner(response.data.message.winner.toString());
          setTime("NA");
        } else {
          const todaysWinner = response.data.message.winner.split("#");
          setWinner(todaysWinner[0]);
          setTime(todaysWinner[2]);
        }
        const ans = response.data.message.answer.split("_");
        setFirst(ans[0]);
        setSecond(ans[1]);
        setThird(ans[2]);
        setLoading(false);
      } catch {
        setWinner("Not declared!");
        setTime("NA");
        setFirst("TBD");
        setSecond("TBD");
        setThird("TBD");
        setLoading(false);
      }
    }
    getWinnerFirst();
  }, [today]);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        getWinner(today);
      } catch {
        setWinner("Not declared!");
        setTime("NA");
        setFirst("TBD");
        setSecond("TBD");
        setThird("TBD");
        setLoading(false);
      }
    }, 100 * 1000);
    return () => clearInterval(interval);
  }, [today]);

  return (
    <>
      {loading ? (
        <p style={style_hover2} className="font-mono font-bold px-6 py-2">
          {" "}
          loading...
        </p>
      ) : (
        <div style={style_hover2} className="font-mono font-bold px-6 py-2">
          <ul>
            <li> Winning List </li>
            <li>{first}</li>
            <li>{second}</li>
            <li>{third}</li>
          </ul>
          <div>Today's winner</div>
          <div>{winner.toString()}</div>
          <div> Winning Time </div>
          <div>{time.toString()}</div>
        </div>
      )}
    </>
  );
}
