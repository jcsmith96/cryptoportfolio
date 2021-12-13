const WATCHLIST_URL = 'http://localhost:8000/watchlist/'
const POSITIONS_URL = 'http://localhost:8000/positions/'
const SOLDASSETS_URL = 'http://localhost:8000/soldassets/'


const fetchWatchList = async (token) => {
    const url = WATCHLIST_URL
    const init = {
        headers: {
            'Content-Type': 'application/json',
            Authorization:`JWT ${token}`
        }
    }
    let response = await fetch(url, init)
    let data = await response.json()
    return data
  }




  const exportItems = {
    fetchWatchList,
  }
  
  export default exportItems