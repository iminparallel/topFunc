import Link from 'next/link';
import Image from 'next/image'
import {Winner} from '../components/winner'
import {Submissions} from '../components/submissions'
import { CSSProperties } from "react";

import type { Metadata } from 'next'
import getAllAsset from '../lib/getAllAsset'
import Search from '@/app/ui/search';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const stylex: CSSProperties = {
    position:"absolute",
    bottom:400,
    left:250,
    width:"100%",
  }

  const style3: CSSProperties = {
    position:"fixed",
    top:50,
    left:15,
    width:"100%",
  };
const style2: CSSProperties = {
    position:"absolute",
    top:10,
    left:240,
    color:"green"
  }; 
  const style_red: CSSProperties = {
    left:200,
}  


interface Listing {
  symbol: string;

}

  const query = searchParams?.query || '';
  const assetData = getAllAsset()
  const assets = await assetData
  const coins = assets['data']['ticker']
  let listings = []

    

  for (let i = 0; i < coins.length; i++) {
      if (coins[i].symbol.toLowerCase().includes(query.toLowerCase()) )
      {
        listings.push(coins[i])
      }
    }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
     
    <Winner/>

    <section style = {style_red}  className="font-mono font-bold flex min-h-screen flex-col items-center justify-between">
        <div >
            <br/>
        <ul style = {style2}>
        {listings.map((listing:Listing)=> {
         return (
            <li key={listing.symbol}>
            <p >
                <Link href={`/assets/${listing.symbol}`}>
                    {listing.symbol} 
                </Link> 
            </p>
            </li>
         )
        })}

        </ul>  
        </div>  
        < Search/> 
        </section>
   
    </main>
    
  );
}
