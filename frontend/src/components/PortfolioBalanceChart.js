import {useEffect} from 'react'
import {Container} from 'react-bootstrap'
import { createChart, CrosshairMode } from 'lightweight-charts';


let PortfolioBalanceChart = (props) => {


    useEffect(() => {
        if (props.chartData){
            let chartContainer = document.getElementById("portfolio-balance-chart")
            chartContainer.innerHTML = ''
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
        
        lineSeries.setData(props.chartData)

    chart.timeScale().fitContent()
    }

    }, [props.chartData])



    return (
        <Container className="chart-container" id="portfolio-balance-chart">

        </Container>

    )


}

export default PortfolioBalanceChart