import { useState, useEffect, useContext } from 'react'
import { Dropdown, InputGroup, FormControl} from 'react-bootstrap'
import AddItemContext from '../contexts/AddItemContext'


let CoinDropDown = (props) => {
const [coinListDropDowns, setDropDowns] = useState(null)
const [searchFilter, setSearchFilter] = useState('')
const addItemContext= useContext(AddItemContext)


let handleSearch = (evt) => {
  let input = evt.target.value
  setSearchFilter(input)
}


const renderDropMenu = () => {
    return <Dropdown className="coin-list-dropdown"  >
            <Dropdown.Toggle variant="dark">ADD</Dropdown.Toggle>
            <Dropdown.Menu variant="dark"> 
            <div className="search-bar">
            <InputGroup>
            <InputGroup.Text>Search</InputGroup.Text>
              <FormControl placeholder="Search" onChange={handleSearch}/>
            </InputGroup>
            </div>
      { props.coinList.filter(coin => { 
        return searchFilter == "" || coin.id.toLowerCase().includes(searchFilter.toLowerCase())
        }).map((elem) => {
        return <Dropdown.Item id={elem.id} key={elem.id} onClick={props.handleAddWatchItem}>{elem.id.toUpperCase()}</Dropdown.Item>
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
