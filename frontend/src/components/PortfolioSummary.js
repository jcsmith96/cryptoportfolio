import { Container, Col, Card } from 'react-bootstrap'
import { createChart, CrosshairMode } from 'lightweight-charts';
import { useEffect, useState } from 'react';
import {data} from './data.js'

const PortfolioSummary = (props) => {
    const [chartData, setChartData] = useState(null)

    
    useEffect(() => {
        const formatDate = (str) => {
            let arr = []
            let strSplit = str.split(',')
            strSplit.pop()
            let splitTwo = strSplit[0].split('/')
            for(let i=splitTwo.length-1; i >= 0; i--){
                arr.push(splitTwo[i])
            }
            return arr.join('-')
        }
        
        // console.log(formatDate(new Date(data.prices[0][0]).toLocaleString("en-gb")))
        let formattedData = []
        data.prices.forEach((elem) => {
            formattedData.push({time: formatDate(new Date(elem[0]).toLocaleString("en-gb")), value:elem[1]})
        })
        setChartData(formattedData)
       
    }, [])

    
    useEffect(() => {
        if (chartData){
        var chart = createChart(document.getElementById("portfolio-balance-chart"), {
            width: 425,
            height:250,
            crosshair: {
                mode: CrosshairMode.Normal
              }
        ,
        priceScale: {
          scaleMargins: {
            top: 0.3,
            bottom: 0.25
          },
          borderVisible: false
        }, 
        layout: {
            backgroundColor: "rgba(33,37,41)",
            textColor: "#d1d4dc"
          },
          grid: {
            vertLines: {
              color: "rgba(42, 46, 57, 0)"
            },
            horzLines: {
              color: "rgba(42, 46, 57, 0.6)"
            }
        }
    })
    

  const lineSeries = chart.addLineSeries({
        color: "#008000"
    })
        
        lineSeries.setData(chartData)

    chart.timeScale().fitContent()
    }

    }, [chartData])


    let renderSummary = ()  => {
        return <Container>
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
                            { props.pnlUsd > 0 
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
                            { props.totalPnl && <Col className='sum-item'> <h4 className={props.totalPnl > 0 ? 'positive': 'negative'}>{Number(props.totalPnl.toFixed(3))}%</h4></Col> }
                        </Container>
                    </Card.Body>
                </Card>
                
            </Container>

    }

    // const chart = createChart(Container);


 

    return (
        <Container className="portfolio-summary-div">
            { props.portfolioBalance && 
                renderSummary()
            }
          <Container className="chart-container" id="portfolio-balance-chart">

            </Container>
         
        </Container>
    )


}

export default PortfolioSummary 

