import type { Metadata } from 'next'
import getAsset from '../../../lib/getAsset'
import getAllAsset from '../../../lib/getAllAsset'
import Link from 'next/link';
import {AssetContainer} from '../../../components/assetContainer'
import {  } from 'next/navigation';
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




    if (!asset.data.symbol) {
        return {
            title: "Asset Not Found"
        }
    }

    return {
        title: asset.data.symbol,
        description: `This is the page of ${asset.symbol}`
    }

}

export default async function AssetPage({ params: { assetId } }: Params) {
    //const id = assetId.replace("-", "")
    const assetData = getAsset(assetId)   
    //const assetData: Promise<User> = getGemini(id)    
    const asset = await assetData
    //const asset = await getAsset(assetId)
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

    if (!asset.data.symbol) {
        console.log("invalid asset")
    }
       

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