import React, { useContext, useEffect } from 'react'
import { Container, Col, Row, Tabs, Tab, Card} from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react'
import UserContext from '../contexts/UserContext'

//api
import CoinGeckoAPI from '../api/CoinGeckoAPI'
import BackendAPI from '../api/BackendAPI'
import Watchlist from './Watchlist'


let Portfolio = () => {
    const { user } = useContext(UserContext)
    const [positions, setPositions] = useState(null)
    const [positionsPriceData, setPositionsPriceData] = useState(null)
    const [triggerUpdate, setTriggerUpdate] = useState(false)

    useEffect(() => {
        if (user) {
            const getPositions = async () => {
                let data = await BackendAPI.fetchUserPositions(localStorage.getItem("auth-user"))
                setPositions(data)

                let priceData = await data.map((elem) => {
                    return CoinGeckoAPI.fetchSimplePrice(elem.asset_id)
                })
                Promise.all(priceData).then((values) => {
                    setPositionsPriceData(values)
                })
            }
            getPositions()
        }
    }, [])

if (positions && positionsPriceData) {
            console.log(positionsPriceData.map((x, i) => [x, positions[i]]))
        }
    let renderPositions = () => {
        if (positions && positionsPriceData) {
            return positionsPriceData.map((x, i) => [x, positions[i]]).map((elem) => {
                let key = Object.keys(elem[0])[0]
                    if (elem[1] !== undefined){
                        return <Card className="position-card" bg="dark" key={elem[1].id}>
                            
                            <Card.Body>
                                <Container className="position-card-div">
                                    <Col className="position-item-div">
                                    {key.toUpperCase()}
                                    </Col>
                                    <Col className="position-item-div">
                                        {Number(elem[1].quantity).toFixed(4)}
                                    </Col>
                                    <Col className="position-item-div">${elem[0][key].usd}</Col>
                                    <Col className="postition-item-div">${elem[1].price_purchased}</Col>
                                </Container>
                                <Container className="pos-sum">
                                    <Col className="postion-value">${(Number(elem[1].quantity) * Number(elem[0][key].usd)).toFixed(2)}</Col>
                                    { Number(elem[0][key].usd) > Number(elem[1].price_purchased)
                                    ?
                                    <Col className="positive-pos-pnl">{((Number(elem[0][key].usd) - Number(elem[1].price_purchased))/ Number(elem[1].price_purchased) * 100).toFixed(3)}%</Col>
                                    :
                                    <Col className="negative-pos-pnl">{((Number(elem[0][key].usd) - Number(elem[1].price_purchased))/ Number(elem[1].price_purchased)* 100).toFixed(3)}%</Col>
                                    }
                                </Container>
                            </Card.Body>
                    </Card>
                    }
            })
        }
    }


    return (
        <Container className="portfolio" xs={6}>
            
            <Tabs defaultActiveKey="portfolio-summary" id="portfolio-tabs" className="mb-3">
                    <Tab eventKey="portfolio-summary" title="Portfolio Summary">
                    <div className="portfolio-summary-div">
                        <h5>Total Balance:</h5>
                    </div>
                    </Tab>
                    <Tab eventKey="positions" title="Holdings" className="tabs">
                    <h4>YOUR HOLDINGS</h4>
                    <Card className="title-card" bg="dark">
                    <Card.Body>
                            <Container className="title-card-div">
                             <Col>CURRENCY</Col>
                             <Col className="quantity">QUANTITY</Col>
                             <Col>CURRENT PRICE</Col>
                             <Col>PRICE PAID</Col>   
                             
                             </Container>
                            </Card.Body>
                        </Card>
                        {
                            renderPositions()
                        }
                    </Tab>
                    <Tab eventKey="sold" title="Sold">
                            
                    </Tab>
                    </Tabs>
        </Container>
    )

}

export default Portfolio
