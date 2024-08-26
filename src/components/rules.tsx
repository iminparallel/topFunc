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
        Predict the top 3 at 00:00 GMT, winner is decided every day. Fastest
        guess wins.
      </Modal>
    </>
  );
}
