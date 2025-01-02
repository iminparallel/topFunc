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

  async function getHistory() {
    const response = await axios.get(window.location.origin + "/api/history");
    setHistory(response.data.message);
  }

  useEffect(() => {
    async function getHistoryFirst() {
      console.log(window.location.origin);
      const response = await axios.get(window.location.origin + "/api/history");
      setHistory(response.data.message);

      setLoading(false);
    }
    getHistoryFirst();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getHistory();
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <button
        style={styley}
        className="font-mono font-bold "
        onClick={() => setIsModalVisible(true)}
      >
        History
      </button>

      <Modal
        title="Past Winners"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <div className="font-mono font-bold ">
          {loading ? (
            <p> loading . . .</p>
          ) : (
            <div>
              {history.map((hist: Hist) => {
                return (
                  <li key={hist._id}>
                    <div className="border-t font-mono flex flex-col">
                      <div>
                        {hist.date} {hist.winner.toString()}
                      </div>
                      <div>
                        {hist.answer.split("_")[0]} {hist.answer.split("_")[1]}{" "}
                        {hist.answer.split("_")[2]}
                      </div>
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
