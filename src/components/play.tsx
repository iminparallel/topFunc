
'use client'
import {  useState, useEffect } from "react";
import { Modal } from "antd";
import { PlayForm } from "@/components/playForm";
import { Rules } from "@/components/rules";
import connectDB from "../../../lib/mongodb";
import { useTma } from "./tma/hook";

import {Winners} from "../../models/winners";

export function Play(props: NavbarProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [third, setThird] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);
    const [userName, setUserName] = useState("");
    const style_red = {
      color:"green"
  }
    
    const { user } = useTma();
    

    useEffect( () => {
      
   
    setUserName(user?.username)
    setSuccess(false);
    }, [ user?.username])

  const handleCancel = async (e) => { 
    e.preventDefault();
    setError([])
    setSuccess(false)
    setIsModalVisible(false)

  }  

  const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(first,second,third)
   


        const res = await fetch("api/submit", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            first,
            second,
            third,
            userName,
          }),
        });

        const { msg, success } = await res.json();
        setError(msg);
        setSuccess(success);
    
        if (success) {
          setFirst("");
          setSecond("");
          setThird("");
        }

       // setIsModalVisible(false);


    }  
    
    return(
            <>
            <button onClick={() => setIsModalVisible(true)}>
            Play </button>
            <Modal
            className = "font-mono font-bold"
            title="enter your top 3"
            open={isModalVisible}
            onOk={handleSubmit}
            onCancel={handleCancel}
            width={600}>
            <div style={style_red}>  
            <Rules />
            </div>
            <form
             onSubmit={handleSubmit}
             className="py-4 mt-4 border-t flex flex-col gap-5 font-mono font-bold">
            <div className="px-2">
                <label htmlFor="first">1</label>
                <input
                  onChange={(e) => setFirst(e.target.value)}
                  value={first}
                  type="text"
                  id="first"
                  placeholder="BTC-USDT" />
              </div>
              <div className="px-2">
                <label htmlFor="second">2</label>
                <input
                  onChange={(e) => setSecond(e.target.value)}
                  value={second}
                  type="text"
                  id="second"
                  placeholder="BTC-USDT" />
              </div>
              <div className="px-2">
                <label htmlFor="third">3</label>
                <input
                  onChange={(e) => setThird(e.target.value)}
                  value={third}
                  type="text"
                  id="third"
                  placeholder="BTC-USDT" />
              </div>  
            </form>
            <div>
            {error &&
          error.map((e) => (
            <div
              className={`${
                success ? "text-green-800" : "text-red-600"
              } px-5 py-2`}
            >
              {e}
            </div>
          ))}
            </div>  

            </Modal>
            </>
     )
}