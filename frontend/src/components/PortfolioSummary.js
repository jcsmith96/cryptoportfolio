import { Container, Col, Tabs, Tab, Card, DropdownButton, Dropdown} from 'react-bootstrap'
import UserContext from '../contexts/UserContext'
import { useContext } from 'react'

const PortfolioSummary = (props) => {
    const { user } = useContext(UserContext)




    let renderSummary = ()  => {
        return <Container className="portfolio-summary-div">
                    <Card className="summary-card" bg="dark">
                        <Card.Body>
                            <Container className="summary-card-container">
                                <Col className='sum-item'> <h4>Balance:</h4> </Col>
                                <Col className='sum-item'> <h4>${props.portfolioBalance}</h4></Col>
                            </Container>
                        </Card.Body>
                    </Card>
                    <Card className="summary-card" bg="dark">
                    <Card.Body>
                        <Container className="summary-card-container">
                            <Col className='sum-item'> <h4>PnL</h4> </Col>
                            { props.totalPnl && <Col className='sum-item'> <h4 className={props.totalPnl > 0 ? 'positive': 'negative'}>{props.totalPnl.toFixed(3)}%</h4></Col> }
                        </Container>
                    </Card.Body>
                </Card>
            </Container>


    }



    return (
        <Container>
            { props.portfolioBalance && 
                renderSummary()
            }
        </Container>
    )


}

export default PortfolioSummary 

