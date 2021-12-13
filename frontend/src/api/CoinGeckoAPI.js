
const fetchCoinlist = async () => {
  const url = "https://api.coingecko.com/api/v3/coins/list"
  let response = await fetch(url)
  let data = await response.json()
  return data
}


const fetchSimplePrice = async (id) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`
    let response = await fetch(url)
    let data = await response.json()
    return data
  }



  const exportItems = {
    fetchSimplePrice,
    fetchCoinlist,
  }
  
  export default exportItems