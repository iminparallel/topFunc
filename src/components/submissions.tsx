'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useTma } from "./tma/hook";
import { Modal } from "antd";
import { CSSProperties } from "react";


export function Submissions(props:any) {
     const [submissions, setSubmissions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [empty, setEmpty] = useState(false);
     

     const { user } = useTma();
     const stylex: CSSProperties = {
      position:"absolute",
      top:100,
      left:250,
      width:"100%",
    };
    const gap: CSSProperties = {
        marginRight: '45px',
      };

    const styley: CSSProperties = {
        position:"absolute",
        top:175,
        right:150,
        color:"green",
    };

    interface Submission {
        _id: string;
        userName: string;
        first: string;
        second: string;
        third: string;
        answer: string;
        time:Number;

      }



     async function getSubmissions(username: String) {
        const response = await axios.get("api/getsubmissions/" , {params:{user : username}});
        console.log( response.data.message)
                 if(response.data.message.length === 0){
            setEmpty(true)
          }
          else{
            setEmpty(false)
          }
        setSubmissions(response.data.message);
      }

      useEffect(() => {
        async function getSubmissionsFirst() {
          const response = await axios.get("api/getsubmissions/" , {params:{user : user.username}});
          if(response.data.message.length === 0){
            setEmpty(true)
          }
          else{
            setEmpty(false)
          }
          setSubmissions(response.data.message);
          setLoading(false)
  
        }
        getSubmissionsFirst();
      }, [user.username]);
      
      useEffect( () => {
        const interval = setInterval(() => {
            getSubmissions(user.username)
        }, 30*1000)
        return ()=> clearInterval(interval)
      }, [user.username, submissions]);
    return(
        <>
        <button style={styley} className="font-mono font-bold " onClick={() => setIsModalVisible(true)}>
            your entries 
        </button>

        <Modal title="Enties(30s waiting)"
            open={isModalVisible}
            onOk={() => setIsModalVisible(false)}
            onCancel={() => setIsModalVisible(false)}
            width={600}>

        <div className="font-mono font-bold ">
          {empty ?  (<p> no entries so far ... takes 30s to load</p>):
     (
        <div> 
        {submissions.map((submission: Submission)=> {
          return (
             <li key={submission._id} >
              <div className="border-t font-mono flex flex-col">
                <div style={gap}> {submission.time.toString()} </div>
                <div style={gap}> {submission.first} </div>
                <div style={gap}> {submission.second} </div>
                <div style={gap}> {submission.third} </div>

              </div>
             </li>
             
           )
        })}  
       </div> 

     )
          }
        </div> 
        </Modal>
       
        </>
    )
    }