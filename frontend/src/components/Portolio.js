import React, { useContext, useEffect } from 'react'
import { Container, Col, Tabs, Tab, Card, DropdownButton, Dropdown} from 'react-bootstrap'
import { useState } from 'react'
import UserContext from '../contexts/UserContext'

//api
import CoinGeckoAPI from '../api/CoinGeckoAPI'
import BackendAPI from '../api/BackendAPI'
import NewPosForm from './NewPosForm'


let Portfolio = (props) => {
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
    }, [triggerUpdate, user])


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
                                <Container className="postion-ud-buttons">
                                <DropdownButton title="" id="pos-button-dropdown" variant="dark" menuVariant='dark'>
                                        <Dropdown.Item id={elem[1].id} name="edit-pos">EDIT</Dropdown.Item>
                                        <Dropdown.Item id={elem[1].id} name="delete-pos" onClick={handlePositionDelete}>DELETE</Dropdown.Item>
                                </DropdownButton>
                                </Container>
                            </Card.Body>
                    </Card>
                    }
            })
        }
    }

    const handlePositionDelete = async (evt) => {
        setTriggerUpdate(false)
        let position_id = evt.target.id
        await BackendAPI.deleteUserPosition(localStorage.getItem("auth-user"), position_id)
        setTriggerUpdate(true)
    }

    return (
        <Container className="portfolio" xs={6}>
            
            <Tabs defaultActiveKey="positions" id="portfolio-tabs" className="mb-3">
                    <Tab eventKey="portfolio-summary" title="Portfolio Summary">
                    <div className="portfolio-summary-div">
                        <h5>Current Balance:</h5>
                    </div>
                    </Tab>
                    <Tab eventKey="positions" title="Positions" className="tabs" >
                    <h5>Your Positions</h5>
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
                    <Tab eventKey="new-pos" title="Add Position" unmountOnExit="true">
                           <NewPosForm coinList={props.coinList} setTriggerUpdate={setTriggerUpdate}/> 
                    </Tab>
                    <Tab eventKey="sold" title="Closed">
                            
                    </Tab>
                    </Tabs>
        </Container>
    )

}

export default Portfolio
