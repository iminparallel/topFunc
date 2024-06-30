
'use client'
import {  useState } from "react";
import { Modal } from "antd";
import Link from 'next/link'

export function Rules(props: NavbarProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);


  const handleOk = async (e:any) => {
        e.preventDefault();
        setIsModalVisible(false);

    }  
    
    return(
            <>
            <button onClick={() => setIsModalVisible(true)}>
            rules* </button>
            <Modal
            title="Rules"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={() => setIsModalVisible(false)}
            width={600}>
              enter top 3 based on following rules:
              
              <ol>
                <br/>
                <li> 
                  only the top 50 traded pairs  by 24h traded amount (data.ticker.[pair].volValue) are eligible, get all the data from here <Link href="https://api.kucoin.com/api/v1/market/allTickers"> 
                *link </Link> 
                </li>
                <br/>
                <li>
                  Sort these 50 using the following index in a descending manner
                </li>
                <br/>
                <li>
                  index = price at the end of day / price at the beginning of the day (GMT)
                </li>
                <li>
                you can get the necessary data here : <Link href="https://www.kucoin.com/docs/rest/spot-trading/market-data/get-klines"> Candles</Link>  
                </li> 
                <br/>
                <li>
                return the top 3 accordingly
                </li>
              </ol>  
            </Modal>
            </>
     )
}