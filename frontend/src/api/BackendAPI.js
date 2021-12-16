const WATCHLIST_URL = 'http://localhost:8000/watchlist/'
const POSITIONS_URL = 'http://localhost:8000/positions/'
// const SOLDASSETS_URL = 'http://localhost:8000/soldassets/'

// WATCHLIST REQUESTS
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

// POSITION REQUESTS

const fetchUserPositions = async (token) => {
  const url = POSITIONS_URL
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

const fetchPosition = async (token, positionID) => {
        const url = POSITIONS_URL + `${positionID}`
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

const addNewPosition = async (token, positionObj) => {
  const url = POSITIONS_URL
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`

    },
    body: JSON.stringify(positionObj)
  }
  let response = await fetch(url, init)
  let data = await response.json()
  return data
}

const editPosition = async (token, positionID, positionObj) => {
  const url = POSITIONS_URL + `${positionID}/`
  const init = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`

    },
    body: JSON.stringify(positionObj)
  }
  
  let response = await fetch(url, init)
  let data = await response.json()
  return data
}


const deleteUserPosition = async (token, position_id) => {
  const url = POSITIONS_URL + `${position_id}`
  await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}`}})
  
}

  const exportItems = {
    fetchWatchList,
    deleteWatchItem,
    addWatchItem,
    fetchUserPositions,
    deleteUserPosition,
    addNewPosition,
    editPosition,
    fetchPosition,
  }
  
  export default exportItems



