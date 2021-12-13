import { useState, useEffect } from 'react'
import {Container, Col, Row, Dropdown, Button} from 'react-bootstrap'

let CoinDropDown = (props) => {
const [coinListDropDowns, setDropDowns] = useState(null)
const [value, setValue] = useState(null)


const renderDropMenu = () => {
    return <Dropdown className="coin-list-dropdown" >
            <Dropdown.Toggle>ADD ASSET</Dropdown.Toggle>
            <Dropdown.Menu> 
      {  props.coinList.map((elem) => {
        return <Dropdown.Item id={elem.id} key={elem.symbol}>{elem.symbol.toUpperCase()}</Dropdown.Item>
      })
            }
        </Dropdown.Menu>
        </Dropdown>
    }
   
return (
    <div>
      {  props.coinList &&
      renderDropMenu() }
    </div>
    )
}

export default CoinDropDown
