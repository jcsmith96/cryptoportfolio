import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext.js';
import {Container, Col, Row} from 'react-bootstrap'
import Watchlist from '../components/Watchlist.js';
import Portfolio from '../components/Portolio.js';
import News from '../components/News.js';
import BackendAPI from '../api/BackendAPI'

const HomePage = ({ isLoggedIn, coinList }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [positions, setPositions] = useState(null)
  const [closedPositions, setClosedPositions] = useState(null)
  const [triggerUpdate, setTriggerUpdate] = useState(false)
  const [date, setDate] = useState(null)

  // sets date to todays date 
     useEffect(() => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
            if(dd<10) 
            {
            dd='0'+dd;
            } 

            if(mm<10) 
            {
            mm='0'+mm;
            } 
        let currentDate = (yyyy+ '-' + mm + '-' + dd)
            setDate(currentDate)
        }, [user])



  useEffect(() => {
        const getPositions = async () => {
          let data = await BackendAPI.fetchUserPositions(localStorage.getItem("auth-user"))
          let openPositions = data.filter((elem) => elem.closed === false)
          setPositions(openPositions)
        }
        getPositions()
  }, [triggerUpdate])

  useEffect(() => {
     const getClosed = async () => {
       let data = await BackendAPI.fetchClosedPositions(localStorage.getItem("auth-user"))
       
         setClosedPositions(data)
      
     }
     getClosed()
  }, [])
  

  return (
    <Container fluid className="home-container">

    {
      (user && positions) &&
      <Container>
          <Row>
            <Col className="homepage-container"><Watchlist coinList={coinList} isLoggedIn={isLoggedIn}></Watchlist></Col>
            <Col ><Portfolio coinList={coinList} setPositions={setPositions} date={date} positions={positions} isLoggedIn={isLoggedIn} setTriggerUpdate={setTriggerUpdate} 
                              closedPositions={closedPositions} setClosedPositions={setClosedPositions} triggerUpdate={triggerUpdate}></Portfolio></Col>
            <Col className="homepage-container"><News positions={positions} date={date}></News></Col>
          </Row>
      </Container>
    }
    {
      !isLoggedIn
      ?
      <div>
          <h2>PLEASE LOGIN OR SIGNUP!</h2>
        
      </div>
      :
      <div>
        
      </div>
    }
  </Container>
  );
};

export default HomePage;