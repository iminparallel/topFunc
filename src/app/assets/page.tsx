
import type { Metadata } from 'next'
import getAllAsset from '../../lib/getAllAsset'
import Link from 'next/link'
import Search from '@/app/ui/search';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';



export const metadata: Metadata = {
    title : 'Assets'
}

export default async function AssetList({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }){

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const assetData = getAllAsset()
    const assets = await assetData
    const coins = assets['data']['ticker']
    let listings = []
    const style3 = {
        position:"fixed",
        top:50,
        left:15,
        width:"100%",
      };
    const style2 = {
        position:"absolute",
        top:10,
        left:200,
      }; 
      const style_red = {
        color:"green"
    }  
      

    for (let i = 0; i < coins.length; i++) {
        if (coins[i].symbol.toLowerCase().includes(query.toLowerCase()) )
        {
          listings.push(coins[i])
        }
      }

   const content = (
    <>
        <section className="font-mono font-bold flex min-h-screen flex-col items-center justify-between">
        <div>
            <br/>
        <ul style = {style2}>
        {listings.map(listing=> {
         return (
            <li style = {style_red} key={listing.symbol}>
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

      </>  
    ) 
    return content
}