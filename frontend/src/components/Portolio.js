import React, { useContext, useEffect } from 'react'
import { Container, Nav, Tabs, Tab } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react'
import UserContext from '../contexts/UserContext'

//api
import CoinGeckoAPI from '../api/CoinGeckoAPI'
import BackendAPI from '../api/BackendAPI'


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
            }
            getPositions()
        }
    }, [])




    return (
        <Container className="portfolio" xs={6}>
            <Tabs defaultActiveKey="portfolio-tabs" id="portfolio-tabs" className="mb-3">
                    <Tab eventKey="portfolio" title="Portfolio Summary" className='portfolio-summary-tab'>
                    <div className="portfolio-summary-div">
                        <h5>Total Balance:</h5>
                    </div>
                    </Tab>
                    <Tab eventKey="profile" title="Positions" className="tabs">
                    </Tab>
                    <Tab eventKey="contact" title="Sold">
                            
                    </Tab>
                    </Tabs>
        </Container>
    )

}

export default Portfolio
