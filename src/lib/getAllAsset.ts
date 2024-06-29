export default async function getAllAsset() {
    const res = await 
    fetch('https://api.kucoin.com/api/v1/market/allTickers/', {next:{revalidate:10}})

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}