import { Container, Card, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import BackendAPI from '../api/BackendAPI'

let ClosedPositionsList = (props) => {
    const [totalPnl, setTotalPnl] = useState(null)

    useEffect(() => {
       if (props.closedPositions){
            let total = 0
            props.closedPositions.forEach((elem) => {
                total += ((elem.amount_sold * elem.price_sold).toFixed(2)) - ((elem.amount_sold * elem.price_purchased).toFixed(2))
               
            })
            setTotalPnl(total)
        }
            
    }, [props.closedPositions])
  
    let renderClosed = () => {
        if (props.closedPositions) {
            return props.closedPositions.map((elem) => {
                        return <Card className="position-card" bg="dark" key={elem.id}>
                            
                            <Card.Body>
                                <Container className="position-card-div">
                                    <Col className="position-item-div">
                                    {elem.asset_id.toUpperCase()}
                                    </Col>
                                    <Col className="position-item-div">
                                        {Number(Number(elem.amount_sold).toFixed(4)).toLocaleString("en-US")}
                                    </Col>
                                    <Col className="position-item-div">${Number(elem.price_sold).toLocaleString("en-US")}</Col>
                                    <Col className="position-item-div">${Number(elem.price_purchased).toLocaleString("en-US")}</Col>
                                </Container>
                                 <Container className="pos-sum">
                                
                                     { Number(elem.price_purchased) < Number(elem.price_sold)
                                     ? <Col className="positive-pos-pnl">+${Number(((elem.amount_sold * elem.price_sold).toFixed(2)) - (elem.amount_sold * elem.price_purchased).toFixed(2)).toLocaleString("en-us")}</Col>
                                     : <Col className="negative-pos-pnl">-${Math.abs(((elem.amount_sold * elem.price_sold).toFixed(2) - (elem.amount_sold * elem.price_purchased)).toFixed(2)).toLocaleString("en-US")}</Col>
                                    }
                                    { Number(elem.price_sold) > Number(elem.price_purchased)
                                    ?
                                    <Col className="positive-pos-pnl">+{Number((((elem.price_sold - elem.price_purchased)/ elem.price_purchased) * 100).toFixed(2))}%</Col>
                                    :
                                    <Col className="negative-pos-pnl">{Number((((elem.price_sold - elem.price_purchased)/ elem.price_purchased)* 100).toFixed(2))}%</Col>
                                    }
                                </Container>
                                    <Container className="postion-ud-buttons">
                                        <DropdownButton title="" id="pos-button-dropdown" variant="dark" menuVariant='dark'>
                                                <Dropdown.Item id={elem.id} name="delete-pos" onClick={handleClosedPositionDelete}>DELETE</Dropdown.Item>
                                        </DropdownButton>
                                    </Container>
                            </Card.Body>
                    </Card>
                
            })
        }
    }

    const handleClosedPositionDelete = async (evt) => {
        let closed_id = evt.target.id
        await BackendAPI.deleteClosedPosition(localStorage.getItem("auth-user"), closed_id)
        let closedPositionsCopy = [...props.closedPositions]
        let newClosed = closedPositionsCopy.filter(elem => elem.id != closed_id)

        if (newClosed.length === 0){
            props.setClosedPositions(null)
        } else {
        props.setClosedPositions(newClosed)
        }
    }




return (
    <Container>
        <h5>Closed Positions</h5>

        
         <Card className="title-card" bg="dark">
                    <Card.Body>
                            <Container className="title-card-div">
                             <Col>CURRENCY</Col>
                             <Col className="quantity">AMOUNT SOLD</Col>
                             <Col>PRICE SOLD</Col>
                             <Col>PRICE PAID</Col>   
                             
                             </Container>
                            </Card.Body>
                    </Card>
                { (!props.closedPositions || props.closedPositions.length === 0) && 
                    <h5 className="no-history-alert">You have no closed positions to display!</h5>
                    }

                { props.closedPositions && 
                    renderClosed()  
                      }
                { (props.closedPositions && props.closedPositions.length !== 0) && 
                            <Card className="summary-card" bg="dark">
                                <Card.Body>
                                 <Container className="summary-card-container">
                                <Col className='sum-item'> <h4>PnL History</h4> </Col>
                            { totalPnl > 0 
                                ? 
                                <Col className='sum-item'><h4 className={'positive'}>
                                    +${Number(totalPnl).toLocaleString('en-US')}</h4></Col>
                                :
                                <Col className='sum-item'><h4 className={'negative'}>
                                    -${Math.abs(Number(totalPnl)).toLocaleString('en-US')}</h4></Col>
                            }
                        </Container>
                    </Card.Body>
                    </Card>
                }

    </Container> 
)

}

export default ClosedPositionsList