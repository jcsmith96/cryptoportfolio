import { Card, Container, Col, Form, Button, FormControl  } from 'react-bootstrap'
import BackendAPI from '../api/BackendAPI'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

let ClosePosForm = (props) => {
    const { user } = useContext(UserContext)

    const handleClosePosSubmit = async (event) => {
        event.preventDefault()
        props.setTriggerUpdate(false)
        let positionID = props.positionForClose.id
        const posData = {
          user: user.id,  
          position: props.positionForClose.id,
          price_purchased: props.positionForClose.price_purchased,
          asset_id: props.positionForClose.asset_id,
          amount_sold: props.positionForClose.quantity,
          date_sold: event.target.elements[1].value,
          price_sold: event.target.elements[0].value
        }
        let data = await BackendAPI.closePosition(localStorage.getItem("auth-user"), posData)
        props.setClosedPositions([...props.closedPositions, data])

        const posObj = {
            closed: true,
            date_closed: event.target.elements[1].value
        }

        await BackendAPI.setPositionClose(localStorage.getItem("auth-user"), positionID, posObj)
        let positionsCopy = [...props.positions]
        let newPositions = positionsCopy.filter(elem => elem.id !== positionID)
        props.setPositions(newPositions)
        props.setTriggerUpdate(true)
        props.setShowCloseForm(false)
      }


    return (
              <Card className="close-card" bg="dark" key="">
                            
                            <Card.Body> <Form className="close-pos-form" onSubmit={handleClosePosSubmit}>
                                            <Container id={props.positionForClose.id}className="close-pos-div" >
                             
                                                <Col className="close-item-div">
                                                CLOSE {props.positionForClose.asset_id.toUpperCase()} POSITION
                                                </Col>
                                                <Col className="close-item-div">
                                                    {props.positionForClose.quantity}
                                                </Col>
                                                <Col className="close-item-div">{props.currentPriceEdit}</Col>
                                                <Col className="close-item-div">
                                                <Form.Group>
                                                    <Form.Label>Price Sold</Form.Label>
                                                    <Form.Control placeholder="$ USD"/>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="edit-item-div">
                                                <Form.Group>
                                                    <Form.Label>Date Sold</Form.Label>
                                                        <Form.Control type="date" placeholder="Date Sold" />
                                                </Form.Group>
                                                </Col>
                                            </Container>
                                <Button className="form-buttons" variant="success" type="submit" size="sm">
                                        Close
                                  </Button>  
                                  <Button className="form-buttons" variant="danger" size="sm" onClick={() => props.setShowCloseForm(false)}>
                                Cancel
                                </Button>
                                    </Form>
                                </Card.Body>
                                </Card>
        

    )

}


export default ClosePosForm