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
import ClosePosForm from './ClosePosForm'
import ClosedPositionsList from './ClosedPositionsList'


let Portfolio = (props) => {
    const { user } = useContext(UserContext)
    const [positionsPriceData, setPositionsPriceData] = useState(null)
    const [showEditForm, setShowEditForm] = useState(false)
    const [positionForEdit, setPositionForEdit] = useState(null)
    const [showCloseForm, setShowCloseForm] = useState(false)
    const [positionForClose, setPositionForClose] = useState(false)
    const [currentPriceEdit, setCurrentPrice] = useState(null)
    const [portfolioBalance, setPortfolioBalance] = useState(null)
    const [totalPnl, setTotalPnl] = useState(null)
    const [pnlUsd, setPnlUsd] = useState(null)
    
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
    }, [props.positions])


// calculates total balance and PNL % 
    useEffect(() => {
        let balance = 0
        let pnl = 0
        let usdPnl = 0
        if (user && props.isLoggedIn) {
        const calculateBalance = async (elem) => {
                let priceData = await CoinGeckoAPI.fetchSimplePrice(elem.asset_id)
                balance += (elem.quantity * priceData[elem.asset_id].usd)
                pnl += (Number(priceData[elem.asset_id].usd) - elem.price_purchased)/ elem.price_purchased * 100
                usdPnl += (elem.quantity * priceData[elem.asset_id].usd) - (elem.quantity * elem.price_purchased)
                setPortfolioBalance(balance.toFixed(2))
                setTotalPnl(pnl/props.positions.length)
                setPnlUsd(usdPnl.toFixed(2))
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
                                        {Number(Number(elem[1].quantity).toFixed(4)).toLocaleString("en-US")}
                                    </Col>
                                    <Col className="position-item-div">${Number(elem[0][key].usd).toLocaleString("en-US")}</Col>
                                    <Col className="position-item-div">${Number(elem[1].price_purchased).toLocaleString("en-US")}</Col>
                                </Container>
                                <Container className="pos-sum">
                                    <Col className="postion-value">${Number((elem[1].quantity * elem[0][key].usd).toFixed(2)).toLocaleString("en-US")}</Col>
                                     { Number(elem[0][key].usd) > Number(elem[1].price_purchased)
                                     ? <Col className="positive-pos-pnl">+${Number(((elem[1].quantity * elem[0][key].usd).toFixed(2)) - (elem[1].quantity * elem[1].price_purchased).toFixed(2)).toLocaleString("en-us")}</Col>
                                     : <Col className="negative-pos-pnl">-${Math.abs(((elem[1].quantity * elem[0][key].usd).toFixed(2) - (elem[1].quantity * elem[1].price_purchased)).toFixed(2)).toLocaleString("en-US")}</Col>
                                    }
                                    { Number(elem[0][key].usd) > Number(elem[1].price_purchased)
                                    ?
                                    <Col className="positive-pos-pnl">+{Number((((elem[0][key].usd - elem[1].price_purchased)/ elem[1].price_purchased) * 100).toFixed(2)).toLocaleString("en-US")}%</Col>
                                    :
                                    <Col className="negative-pos-pnl">{Number((((elem[0][key].usd - elem[1].price_purchased)/ elem[1].price_purchased)* 100).toFixed(2)).toLocaleString("en-US")}%</Col>
                                    }
                                </Container>
                                <Container className="postion-ud-buttons">
                                    <DropdownButton title=""  id="pos-button-dropdown" variant="dark" menuVariant='dark'>
                                            <Dropdown.Item id={elem[1].id} name={elem[0][key].usd} onClick={handleCloseClick}>CLOSE POSITION</Dropdown.Item>
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
        let position_id = evt.target.id
        await BackendAPI.deleteUserPosition(localStorage.getItem("auth-user"), position_id)
        let positionsCopy = [...props.positions]
        let newPositions = positionsCopy.filter(elem => elem.id != position_id)
        props.setPositions(newPositions)
    }

    const handleCloseClick = async (event) => {
        let positionID = event.target.id
        let data = await BackendAPI.fetchPosition(localStorage.getItem('auth-user'), positionID)
        let response = await data
        setPositionForClose(response)
        setShowCloseForm(true)
    }

    return (
        <Container className="portfolio" xs={6}>
            { user && 
            <Tabs defaultActiveKey="portfolio-summary" id="portfolio-tabs" className="mb-3">
                    <Tab eventKey="portfolio-summary" title="Portfolio Summary">
                        <PortfolioSummary portfolioBalance={portfolioBalance} totalPnl={totalPnl} pnlUsd={pnlUsd} date={props.date} positions={props.positions} triggerUpdate={props.triggerUpdate}/>
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

                        { showCloseForm && 
                            <ClosePosForm setShowCloseForm={setShowCloseForm} positionForClose={positionForClose} positions={props.positions} setPositions={props.setPositions} closedPositions={props.closedPositions} setClosedPositions={props.setClosedPositions}/>
                        }

                        { (!props.positions || props.positions.length === 0) &&
                            <div>
                            <h5 className="no-history-alert">You currently have no open positions!</h5>
                            <h5 className="no-history-alert">Click the "Add Position" tab above to start tracking your investments!</h5>
                            </div>
                        }
                        
                        { (!showEditForm && !showCloseForm) && 
                            renderPositions()
                        }
                    </Tab>
                    <Tab eventKey="new-pos" title="Add Position" unmountOnExit="true">
                           <NewPosForm coinList={props.coinList} positions={props.positions} setPositions={props.setPositions} setTriggerUpdate={props.setTriggerUpdate}/> 
                    </Tab>
                    <Tab eventKey="sold" title="Closed">
                               <ClosedPositionsList closedPositions={props.closedPositions} setClosedPositions={props.setClosedPositions}/>
                    </Tab>
                    </Tabs>
                }
        </Container>
    )

}

export default Portfolio
