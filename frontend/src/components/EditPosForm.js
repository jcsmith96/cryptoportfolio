import { Container } from 'react-bootstrap'
import BackendAPI from '../api/BackendAPI'


let EditPosForm = (props) => {

    const handleEditPosSubmit = async (event) => {
        props.setTriggerUpdate(false)
        event.preventDefault()
        const posData = {
          quantity: event.target.elements[2].value,
          date_purchased: event.target.elements[4].value,
          price_purchased: event.target.elements[3].value,
        }
        await BackendAPI.editPosition(localStorage.getItem("auth-user"), props.positionForEdit.id, posData)
        props.setShowEditForm(true)
        props.setTriggerUpdate(true)
      }



    return (

        <Container>

        <h1>Hi bitch</h1>
        </Container>


    )



}


export default EditPosForm