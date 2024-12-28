"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTma } from "./tma/hook";
import { Modal } from "antd";
import { CSSProperties } from "react";

export function History(props: any) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [empty, setEmpty] = useState(false);

  const { user } = useTma();
  const stylex: CSSProperties = {
    position: "absolute",
    top: 100,
    left: 250,
    width: "100%",
  };
  const gap: CSSProperties = {
    marginRight: "45px",
  };

  const styley: CSSProperties = {
    position: "absolute",
    color: "green",
  };

  interface Hist {
    _id: string;
    winner: string;
    answer: string;
    date: string;
  }

  async function getHistory(username: String) {
    const response = await axios.get(window.location.origin + "/api/history", {
      params: { user: username },
    });
    if (response.data.message.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
    setHistory(response.data.message);
  }

  useEffect(() => {
    async function getHistoryFirst() {
      console.log(window.location.origin);
      const response = await axios.get(
        window.location.origin + "/api/history",
        { params: { user: user.username } }
      );
      if (response.data.message.length === 0) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }
      if (user.username) {
        setHistory(response.data.message);
      }
      setLoading(false);
    }
    getHistoryFirst();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user.username) {
        getHistory(user.username);
      }
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, [user, history]);
  return (
    <>
      <button
        style={styley}
        className="font-mono font-bold "
        onClick={() => setIsModalVisible(true)}
      >
        your entries
      </button>

      <Modal
        title="Past Winners"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <div className="font-mono font-bold ">
          {empty ? (
            <p> no entries so far ... takes 30s to load</p>
          ) : (
            <div>
              {history.map((hist: Hist) => {
                return (
                  <li key={hist._id}>
                    <div className="border-t font-mono flex flex-col">
                      <div style={gap}> {hist.winner.toString()} </div>
                      <div style={gap}> {hist.answer.split("_")[0]} </div>
                      <div style={gap}> {hist.answer.split("_")[1]} </div>
                      <div style={gap}> {hist.answer.split("_")[2]} </div>
                      <div style={gap}> {hist.date} </div>
                    </div>
                  </li>
                );
              })}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
