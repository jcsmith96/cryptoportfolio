import { Container, Col, Card } from 'react-bootstrap'

const PortfolioSummary = (props) => {

    let renderSummary = ()  => {
        return <Container className="portfolio-summary-div">
                    <Card className="summary-card" bg="dark">
                        <Card.Body>
                            <Container className="summary-card-container">
                                <Col className='sum-item'> <h4>Balance</h4> </Col>
                                <Col className='sum-item'> <h4>${Number(props.portfolioBalance).toLocaleString("en-US")}</h4></Col>
                            </Container>
                        </Card.Body>
                    </Card>
                    <Card className="summary-card" bg="dark">
                    <Card.Body>
                        <Container className="summary-card-container">
                            <Col className='sum-item'> <h4>Profit/Loss</h4> </Col>
                            { props.totalPnl > 0 
                                ? 
                                <Col className='sum-item'><h4 className={'positive'}>
                                    +${Number(props.pnlUsd).toLocaleString('en-US')}</h4></Col>
                                :
                                <Col className='sum-item'><h4 className={'negative'}>
                                    -${Math.abs(Number(props.pnlUsd)).toLocaleString('en-US')}</h4></Col>
                            }
                        </Container>
                    </Card.Body>
                    </Card>
                    <Card className="summary-card" bg="dark">
                    <Card.Body>
                        <Container className="summary-card-container">
                            <Col className='sum-item'> <h4>PnL % </h4> </Col>
                            { props.totalPnl && <Col className='sum-item'> <h4 className={props.totalPnl > 0 ? 'positive': 'negative'}>{Number(props.totalPnl.toFixed(3)).toLocaleString('en-US')}%</h4></Col> }
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

