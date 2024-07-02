import type { Metadata } from 'next'
import getAsset from '../../../lib/getAsset'
import getAllAsset from '../../../lib/getAllAsset'
import Link from 'next/link';
import {AssetContainer} from '../../../components/assetContainer'
import { CSSProperties } from "react";



import { Suspense } from "react"


type Params = {
    params: {
        assetId: string
    }
}

export async function generateMetadata({ params: { assetId } }: Params): Promise<Metadata> {
    const assetData = getAsset(assetId)
    //const assetData: Promise<User> = getGemini(assetId)

    const asset = await assetData




    return {
        title: assetId,
        description: `This is the page of ${assetId}`
    }

}

export default async function AssetPage({ params: { assetId } }: Params) {

    const style3: CSSProperties = {
        position:"absolute",
        bottom:255,
        left:75,
      };
    const style2: CSSProperties = {
        position:"absolute",
        top:100,
        left:75,
      };
      const style1: CSSProperties = {
        position:"absolute",
        top:25,
        right:100,
      };  
       

    return (

        <AssetContainer value={assetId.toString()}/>

    )
}
/*
       
 */
export async function generateStaticParams() {
    const assetData = getAllAsset()
    const assets = await assetData
    const coins = assets['data']['ticker']

    interface Coin {
        symbol: string;
        // other properties if exist
      }
    return coins.map((coin: Coin) => ({
        assetId: coin.symbol.toString()
    }))
}