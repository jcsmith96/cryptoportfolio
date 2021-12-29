import { Container, Col, Card } from 'react-bootstrap'

import { useEffect, useState } from 'react';
import CoinGeckoAPI from '../api/CoinGeckoAPI'
import PortfolioBalanceChart from './PortfolioBalanceChart.js';

const PortfolioSummary = (props) => {
    const [positionsPriceHistory, setPositionsPriceHistory] = useState(null)
    const [chartPricesPaired, setChartPricesPaired] = useState(null)
    const [sortedData, setSortedData] = useState(null)
    const [chartData, setChartData] = useState(null)
    const [currentDate, setCurrentDate] = useState((new Date(props.date).getTime()/1000))


// GRABS MARKET CHART RANGE DATA AND SETS STATE VAR 
useEffect(() => {
    if (props.positions){
    let getPriceHistory = async () => {

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
    let finalChartData = []
    if (chartPricesPaired){
        chartPricesPaired.forEach((elem) => {
            let closes = []
            for (let i = 0; i < elem.length-1; i++){

                if (elem[i].time != elem[i+1].time){
                    dailyCloses.push(elem[i])
                    
                }
            }
            dailyCloses.push(elem[elem.length-1])
        })

        dailyCloses.sort((a, b) => new Date(a.time) - new Date(b.time))
        
        for (let j=0; j<dailyCloses.length-1; j++){
            if (dailyCloses[j].time == dailyCloses[j+1].time){
                dailyCloses[j+1].value += dailyCloses[j].value
            }
        }

        setSortedData(dailyCloses)
    }
    
}, [chartPricesPaired])



//SETs THE FINAL CHART DATA 
    useEffect(() => {
        if (sortedData){
            let finalChartData = []
                for (let k=0; k<sortedData.length-1; k++){
                    if (sortedData[k].time !== sortedData[k+1].time){
                        finalChartData.push(sortedData[k])
                    }
                }
                finalChartData.push(sortedData[sortedData.length-1])
                setChartData(finalChartData)
        }

    }, [sortedData] )





    let renderSummary = ()  => {
        if (props.positions && props.positions.length > 0){
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

    }

 

    return (
        <Container className="portfolio-summary-div">
             { (!props.positions || props.positions.length === 0)  && 
                <div>
                    <h5 className="no-history-alert">You currently have no open positions!</h5>
                    <h5 className="no-history-alert">Click the "Add Position" tab above to start tracking your investments!</h5>
                </div>
             }
            
            { props.portfolioBalance && 
                renderSummary()
            }
            { (props.positions && props.positions.length > 0 && chartData && chartData[0] !== undefined) &&
          <PortfolioBalanceChart chartData={chartData} triggerUpdate={props.triggerUpdate}/>
            }       
         
        </Container>
    )


}

export default PortfolioSummary 

