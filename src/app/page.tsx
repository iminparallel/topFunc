import Link from 'next/link';
import Image from 'next/image'
import {Winner} from '../components/winner'
import {Submissions} from '../components/submissions'
import { CSSProperties } from "react";


export default function Home() {
  const stylex: CSSProperties = {
    position:"absolute",
    bottom:400,
    left:250,
    width:"100%",
  }

  const styley: CSSProperties = {
    position:"absolute",
    top:100,
    left:120,
    width:"100%",
  }

  const stylez: CSSProperties = {
    position:"absolute",
    top:150,
    left:25,
    width:"50%",
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
     
    <div style = {styley} className="font-mono font-bold">
   
    <Image style = {stylez}
      src="sisyphus.svg"
      width={250}
      height={250}
      alt="chained"
    />
    </div>
    <p style = {stylex} className="font-mono font-bold">  topFunc()</p>
    <Winner/>
    <Submissions/>
   
    </main>
    
  );
}
