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
    const [triggerUpdate, setTriggerUpdate] = useState(false)

   
        useEffect(() => {
            if (user) {
            const getLists = async () => {
            
                let data = await BackendAPI.fetchWatchList(localStorage.getItem("auth-user")) 
                setWatchlist(data)
                
            
                let watchData = data.map((elem) => {
                    return CoinGeckoAPI.fetchSimplePrice(elem.asset_id)
                    
                })
           
                Promise.all(watchData).then((values) => {
                      setWatchlistData(values)
                    })  
              
                }
            getLists() 
            }
        }, [triggerUpdate, user])


        let renderWatchItems = () => {
                    if (watchlist && watchlistData) {
                        return watchlistData.map((x, i) => [x, watchlist[i]]).map((elem) => {
                            let key = Object.keys(elem[0])[0]
                            if (elem[1]!==undefined){
                                return <Card className="watchlist-card" bg="dark" key={elem[1].id}>
                                    <span className="close-button"> <CloseButton id={elem[1].id} onClick={handleDeleteWatchItem} variant="white" /></span>
                                        <Card.Body>
                                            <Card.Title> 
                                            <div>
                                            {key.toUpperCase()}
                                            <span className="vs-currency"> /USD</span>
                                            </div>
                                            </Card.Title>
                                        
                                          <div className="watchlist-card-body">
                                            <h5>${elem[0][key].usd}</h5>
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
            setTriggerUpdate(false)
            event.preventDefault()
            let asset_id = event.target.id
            const itemObj = {
                user: user.id,
                asset_id: asset_id
            }
            await BackendAPI.addWatchItem(localStorage.getItem("auth-user"), itemObj)
            setTriggerUpdate(true)
        }
        
                                  
      let handleDeleteWatchItem = async (evt) => {
            setTriggerUpdate(false)
            let itemID = evt.target.id
            await BackendAPI.deleteWatchItem(localStorage.getItem("auth-user"), itemID)
            setTriggerUpdate(true)
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
