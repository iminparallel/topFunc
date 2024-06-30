'use client'
import { useEffect, useState } from "react";
import axios from "axios";



export function AssetContainer(props:any) {
     const [price, setPrice] = useState("");
     const [time, setTime] = useState("");
     const [volume, setVolume] = useState("");
     const [high, setHigh] = useState("");
     const [low, setLow] = useState("");
     const [loading, setLoading] = useState(true);
     const stylex = {
      position:"absolute",
      top:200,
      left:100,
      width:"100%",
    }

    const styley = {
      position:"absolute",
      top:200,
      left:-5,
      width:"100%",
    }

     async function getPrice() {
        const response = await axios.get("api/asset/" , {params:{symbol : props.value.toString()}});
        console.log('data', response.data.message)
        setPrice(response.data.message.data.last);
        setTime(response.data.message.data.time);
        setVolume(response.data.message.data.vol);
        setHigh(response.data.message.data.high);
        setLow(response.data.message.data.low);

      }

      useEffect(() => {
        async function getPriceFirst() {
          const response = await axios.get("api/asset/" , {params:{symbol : props.value.toString()}});
          console.log('data', response.data.message)
          setPrice(response.data.message.data.last);
          setTime(response.data.message.data.time);
          setVolume(response.data.message.data.volValue);
          setHigh(response.data.message.data.high);
          setLow(response.data.message.data.low);
          setLoading(false)
  
        }
        getPriceFirst();
      }, [props.value.toString()]);
      
      useEffect( () => {
        const interval = setInterval(() => {
            getPrice()
        }, 15*1000)
        return ()=> clearInterval(interval)
      }, [props.value.toString()])
    return(

        <div style = {stylex} className="font-mono font-bold ">
          {loading ? (<p> loading {props.value.toString()} ...</p>):
          <div>
                    <p> {props.value.toString()} </p>
                    <br/>
                    <p> Current: {price.toString()} </p>
                    <p> Volume: {volume.toString()} </p>
                    <p> High: {high.toString()} </p>
                    <p> Low:{low.toString()} </p>
          
          <div style={styley}> 
          <div>
          refreshes every 15 seconds 
            </div>
           <div> 
             ticker :  {time.toString()} 
          </div>
          </div>      
          </div>  
            
          }


        </div>
    )
    }