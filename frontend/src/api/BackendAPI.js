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

const addWatchItem = async (token, itemObj) => {
    const url = WATCHLIST_URL
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`

      },
      body: JSON.stringify(itemObj)
    }
    let response = await fetch(url, init)
    let data = await response.json()
    return data
  }


const deleteWatchItem = async (token, item_id) => {
  const url = WATCHLIST_URL + `${item_id}`
  await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}`}})
}


  const exportItems = {
    fetchWatchList,
    deleteWatchItem,
    addWatchItem,
    
  }
  
  export default exportItems



