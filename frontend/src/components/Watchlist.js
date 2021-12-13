import React, { useContext, useEffect, useState } from 'react'
import { Container, Card } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom"
import UserContext from '../contexts/UserContext'

//api
import BackendAPI from '../api/BackendAPI.js'
import CoinGeckoAPI from '../api/CoinGeckoAPI.js'



let Watchlist = (props) => {
    const { user } = useContext(UserContext)
    const [watchlist, setWatchlist] = useState(null)
    const [watchlistData, setWatchlistData] = useState(null)
   
        useEffect(() => {
            const getLists = async () => {
                let data = await BackendAPI.fetchWatchList(localStorage.getItem("auth-user")) 
                setWatchlist(data)
                let watchData = await data.map((elem) => {
                    return CoinGeckoAPI.fetchSimplePrice(elem.asset_id)
                })
                 Promise.all(watchData).then((values) => {
                    setWatchlistData(values)
                })
            }
            
            getLists()
        }, [])

        console.log(watchlist)
        console.log(watchlistData)

        let renderWatchItems = () => {
            return watchlistData.map((elem, index) => {
                let key = Object.keys(elem)[0]
                   return <Card bg="dark" key={key}>
                        <Card.Body>
                            <Card.Title> {key.toUpperCase()}<span className="vs-currency"> /USD</span></Card.Title>
                                <Card.Text>
                                    <div>${elem[key].usd}</div>
                                    <span>24hr Change {elem[key].usd_24h_change}</span>
                                </Card.Text>
                    </Card.Body>
                </Card>
            })
        }




  
    return (
        <Container className="watch-list">
            { watchlistData && 

                renderWatchItems()

            }
        </Container>
    )
}

export default Watchlist
