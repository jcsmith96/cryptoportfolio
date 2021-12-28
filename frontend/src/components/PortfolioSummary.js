import { Container, Col, Card } from 'react-bootstrap'
import { createChart, CrosshairMode } from 'lightweight-charts';
import { useEffect, useState } from 'react';
import {data} from './data.js'
import CoinGeckoAPI from '../api/CoinGeckoAPI'

const PortfolioSummary = (props) => {
    const [positionsPriceHistory, setPositionsPriceHistory] = useState(null)
    const [chartPricesPaired, setChartPricesPaired] = useState(null)
    const [chartData, setChartData] = useState(null)
    const [currentDate, setCurrentDate] = useState((new Date(props.date).getTime()/1000))

// GRABS MARKET CHART RANGE DATA AND SETS STATE VAR 
useEffect(() => {
    if (props.positions){
    let getPriceHistory = async () => {
        let priceData = []
        let priceHistory = props.positions.map(async (elem) => {
            return await CoinGeckoAPI.fetchPriceHistory(elem.asset_id, (new Date(elem.date_purchased).getTime() / 1000), currentDate)
            })
        Promise.all(priceHistory).then((values) => {
            setPositionsPriceHistory(values)
        })

    }
    getPriceHistory()
}
}, [props.positions, props.date])

// KEY VALUE PAIRS DATA WITH POSITION THEN RETURNS WITH PRICE * QUANTITY 
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

    if (positionsPriceHistory){
        
       let paired =  props.positions.map((x, i) => [x, positionsPriceHistory[i]]).map((elem) => {
        return elem[1].prices.map((prices) => {
            return {time: formatDate(new Date(prices[0]).toLocaleString("en-gb")), value:(prices[1] * elem[0].quantity)}
        })
    })
       setChartPricesPaired(paired)
    }

}, [positionsPriceHistory])

// PUSHES DAILY CLOSES INTO ONE ARRAY , SORTS THEN ADDS THE VALUES UP OF MATCHING DATES THEN REMOVES  
useEffect(() => {
    let dailyCloses = []
    if (chartPricesPaired){
        chartPricesPaired.forEach((elem) => {
            let closes = []
            for (let i = 0; i < elem.length-1; i++){
                if (elem[i].time != elem[i+1].time){
                    dailyCloses.push(elem[i])
                }
            }
        })

        dailyCloses.sort((a, b) => new Date(a.time) - new Date(b.time))
        
        for (let j=0; j<dailyCloses.length-1; j++){
            if (dailyCloses[j].time == dailyCloses[j+1].time){
                dailyCloses[j+1].value += dailyCloses[j].value
                dailyCloses.splice(j, 1)
            }
        }
        setChartData(dailyCloses)
    }
    
}, [chartPricesPaired])

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

