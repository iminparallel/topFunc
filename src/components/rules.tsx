"use client";
import { useState } from "react";
import { Modal } from "antd";
import Link from "next/link";

export function Rules(props: any) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = async (e: any) => {
    e.preventDefault();
    setIsModalVisible(false);
  };

  return (
    <>
      <button onClick={() => setIsModalVisible(true)}>rules* </button>
      <Modal
        title="Rules"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        enter top 3 based on following rules:
        <ol>
          <li>
            Sort these listed paairs based on the following index in a
            descending order
          </li>
          <br />
          <li>
            index = price at the end of day / price at the beginning of the day
            (GMT)
          </li>
          <li>
            you can get the necessary historic here :{" "}
            <Link href="https://www.kucoin.com/docs/rest/spot-trading/market-data/get-klines">
              {" "}
              Candles
            </Link>
          </li>
          <br />
          <li>return the top 3 accordingly</li>
        </ol>
      </Modal>
    </>
  );
}
