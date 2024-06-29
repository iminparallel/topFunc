export default async function getAsset(assetId: string) {
    const res = await fetch(`https://api.kucoin.com/api/v1/market/stats?symbol=` + assetId)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}