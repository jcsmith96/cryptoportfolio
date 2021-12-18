import React, { useContext, useEffect } from 'react'
import { Container, Col, Tabs, Tab, Card, DropdownButton, Dropdown} from 'react-bootstrap'
import { useState } from 'react'
import UserContext from '../contexts/UserContext'

//api
import CoinGeckoAPI from '../api/CoinGeckoAPI'
import BackendAPI from '../api/BackendAPI'
import NewPosForm from './NewPosForm'

import EditPosForm from './EditPosForm'
import PortfolioSummary from './PortfolioSummary'


let Portfolio = (props) => {
    const { user } = useContext(UserContext)
    const [positionsPriceData, setPositionsPriceData] = useState(null)
    const [showEditForm, setShowEditForm] = useState(false)
    const [positionForEdit, setPositionForEdit] = useState(null)
    const [currentPriceEdit, setCurrentPrice] = useState(null)
    const [portfolioBalance, setPortfolioBalance] = useState(null)
    const [totalPnl, setTotalPnl] = useState(null)
    
    useEffect(() => {
        if (user && props.positions) {
            const getPrices = async () => {
                
                let priceData = props.positions.map( async (elem) => {
                    return await CoinGeckoAPI.fetchSimplePrice(elem.asset_id)
                })
                Promise.all(priceData).then((values) => {
                    setPositionsPriceData(values)
                })
            }
            getPrices()
        }
    }, [props.positions, props.triggerUpdate])

// calculates total balance and PNL % 
    useEffect(() => {
        let balance = 0
        let pnl = 0
        if (user && props.isLoggedIn) {
        const calculateBalance = async (elem) => {
                let priceData = await CoinGeckoAPI.fetchSimplePrice(elem.asset_id)
                balance += (elem.quantity * priceData[elem.asset_id].usd)
                pnl += (Number(priceData[elem.asset_id].usd) - elem.price_purchased)/ elem.price_purchased * 100
                setPortfolioBalance(balance.toFixed(2))
                setTotalPnl(pnl/props.positions.length)
            }
        
        if (user && props.positions && positionsPriceData) {
            props.positions.forEach(calculateBalance)
            
        }
    }
}, [props.positions, positionsPriceData])


// renders positions
    let renderPositions = () => {
        if (props.positions && positionsPriceData) {
            return positionsPriceData.map((x, i) => [x, props.positions[i]]).map((elem) => {
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
                                    <Col className="position-item-div">${elem[1].price_purchased}</Col>
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
                                <Container className="postion-ud-buttons">
                                    <DropdownButton title="" id="pos-button-dropdown" variant="dark" menuVariant='dark'>
                                            <Dropdown.Item id={elem[1].id} key={elem[0][key].usd} name={elem[0][key].usd} onClick={handleEditClick}>EDIT</Dropdown.Item>
                                            <Dropdown.Item id={elem[1].id} name="delete-pos" onClick={handlePositionDelete}>DELETE</Dropdown.Item>
                                    </DropdownButton>
                                </Container>
                            </Card.Body>
                    </Card>
                    }
            })
        }
    }

// edit position click
    const handleEditClick = async (event) => {
        let positionID = event.target.id
        let currentPrice = event.target.name
        let data = BackendAPI.fetchPosition(localStorage.getItem("auth-user"), positionID)
        let response = await data
        setPositionForEdit(response)
        setCurrentPrice(currentPrice)
        setShowEditForm(true)
    }
  
// position delete 
    const handlePositionDelete = async (evt) => {
        props.setTriggerUpdate(false)
        let position_id = evt.target.id
        await BackendAPI.deleteUserPosition(localStorage.getItem("auth-user"), position_id)
        props.setTriggerUpdate(true)
    }

    return (
        <Container className="portfolio" xs={6}>
            { user && 
            <Tabs defaultActiveKey="positions" id="portfolio-tabs" className="mb-3">
                    <Tab eventKey="portfolio-summary" title="Portfolio Summary">
                        <PortfolioSummary portfolioBalance={portfolioBalance} totalPnl={totalPnl}/>
                    </Tab>
                    <Tab eventKey="positions" title="Positions" className="tabs" >
                    { !showEditForm ?    
                    <h5>Your Positions</h5>
                    :
                    <h5>Edit {positionForEdit.asset_id.toUpperCase()} Position</h5>
                    }
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

                        { showEditForm && 
                            <EditPosForm setTriggerUpdate={props.setTriggerUpdate} setShowEditForm={setShowEditForm} positionForEdit={positionForEdit} currentPriceEdit={currentPriceEdit} />
                        }
                        
                        { !showEditForm && 
                            renderPositions()
                        }
                    </Tab>
                    <Tab eventKey="new-pos" title="Add Position" unmountOnExit="true">
                           <NewPosForm coinList={props.coinList} setTriggerUpdate={props.setTriggerUpdate}/> 
                    </Tab>
                    <Tab eventKey="sold" title="Closed">
                            
                    </Tab>
                    </Tabs>
                }
        </Container>
    )

}

export default Portfolio
