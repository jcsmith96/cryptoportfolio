import React, { useContext, useEffect, useState } from 'react'
import { Container, Card, CloseButton } from 'react-bootstrap'
import UserContext from '../contexts/UserContext'

//api
import BackendAPI from '../api/BackendAPI.js'
import CoinGeckoAPI from '../api/CoinGeckoAPI.js'

//components
import CoinDropDown from '../components/CoinDropDown.js'

let Watchlist = (props) => {
    const { user } = useContext(UserContext)
    const [watchlist, setWatchlist] = useState(null)
    const [watchlistData, setWatchlistData] = useState(null)

   // SETS USER'S WATCHLIST
        useEffect(() => {
            if (user) {
            const getLists = async () => {
                let data = await BackendAPI.fetchWatchList(localStorage.getItem("auth-user")) 
                setWatchlist(data)
              
                }
            getLists() 
            }
        }, [user])

    // SETS PRICE DATA FOR WATCHLIST 
        useEffect(() => {
            if (watchlist && user) {
            const getPriceData = async () => {
            let watchData =  watchlist.map( async (elem) => {
                return await CoinGeckoAPI.fetchSimplePrice(elem.asset_id)
            })
       
            Promise.all(watchData).then((values) => {
                  setWatchlistData(values)
                })  
            }
            getPriceData()
        }
        }, [watchlist, user])


    let renderWatchItems = () => {
                    if (user && watchlist && watchlistData) {
                        return watchlistData.map((x, i) => [x, watchlist[i]]).map((elem) => {
                            let key = Object.keys(elem[0])[0]
                            if (elem[1]!==undefined){
                                return <Card className="watchlist-card" bg="dark"  key={elem[1].id}>
                                    <span className="close-button" id={elem[1].asset_id}> <CloseButton id={elem[1].id} key={elem[1].asset_id} onClick={handleDeleteWatchItem} variant="white" /></span>
                                        <Card.Body key={elem[1].id}>
                                            <Card.Title> 
                                            <div>
                                            {key.toUpperCase()}
                                            <span className="vs-currency"> /USD</span>
                                            </div>
                                            </Card.Title>
                                        
                                          <div className="watchlist-card-body">
                                            <h5>${Number(elem[0][key].usd).toLocaleString('en-US')}</h5>
                                            <span className='small-font'>24hr </span>
                                            <span className={Number(elem[0][key].usd_24h_change) < 0 ? "negative" : "positive"}>
                                                  {Number(elem[0][key].usd_24h_change).toFixed(3)}%
                                                </span>
                                                </div>
                                       
                            </Card.Body>
                        </Card>
                            }
                    })
                }
                
            }
       
    let handleAddWatchItem = async (event) => {
            event.preventDefault()
            let asset_id = event.target.id
            const itemObj = {
                user: user.id,
                asset_id: asset_id
            }
            if (itemObj.user && itemObj.asset_id){
            await BackendAPI.addWatchItem(localStorage.getItem("auth-user"), itemObj)
            }
            setWatchlist([...watchlist, itemObj])
        }
        
                                  
      let handleDeleteWatchItem = async (evt) => {
            let itemID = evt.target.id
            if (itemID){
            await BackendAPI.deleteWatchItem(localStorage.getItem("auth-user"), itemID)
            let watchCopy = [...watchlist]
            let newWatchlist = watchCopy.filter(elem => elem.asset_id !== evt.target.parentElement.id)
            setWatchlist(newWatchlist)
            }
      }

    return (
        <Container className="watch-list">
            { user && 
            <div className="watch-list-content">
            
            { watchlistData && 
               
                renderWatchItems()
            
            }
            
            </div>
                }
            <CoinDropDown coinList={props.coinList} watchlist={watchlist} handleAddWatchItem={handleAddWatchItem}></CoinDropDown>
        </Container>
    )
}

export default Watchlist
