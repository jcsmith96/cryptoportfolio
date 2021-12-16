import { Card, Container, Col, Form, Button  } from 'react-bootstrap'
import BackendAPI from '../api/BackendAPI'


let EditPosForm = (props) => {

    const handleEditPosSubmit = async (event) => {
        props.setTriggerUpdate(false)
        event.preventDefault()
        const posData = {
          quantity: event.target.elements[0].value,
          price_purchased: event.target.elements[1].value
        }
        await BackendAPI.editPosition(localStorage.getItem("auth-user"), props.positionForEdit.id, posData)
        props.setTriggerUpdate(true)
        props.setShowEditForm(false)
      }



    return (

        
              <Card className="position-card" bg="dark" key="">
                            
                            <Card.Body> <Form className="edit-pos-form" onSubmit={handleEditPosSubmit}>
                                <Container className="edit-card-div" >
                             
                                    <Col className="edit-item-div">
                                    {props.positionForEdit.asset_id.toUpperCase()}
                                    </Col>
                                    <Col className="edit-item-div">
                                        <Form.Group>
                                          <Form.Control placeholder="Quantity" defaultValue={props.positionForEdit.quantity}/>
                                        </Form.Group>
                                    </Col>
                                    <Col className="edit-item-div">${props.currentPriceEdit}</Col>
                                    <Col className="edit-item-div">
                                    <Form.Group>
                                          <Form.Control placeholder="Price $usd" defaultValue={props.positionForEdit.price_purchased}/>
                                        </Form.Group>
                                    </Col>
                                </Container>
                                <Button className="form-buttons" variant="success" type="submit" size="sm">
                                        Save
                                  </Button>  
                                  <Button className="form-buttons" variant="danger" size="sm" onClick={() => props.setShowEditForm(false)}>
                                Cancel
                                </Button>
                                    </Form>
                                </Card.Body>
                                </Card>
        
        


    )



}


export default EditPosForm