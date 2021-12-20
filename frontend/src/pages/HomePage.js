import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext.js';
import {Container, Col, Row} from 'react-bootstrap'
import Watchlist from '../components/Watchlist.js';
import Portfolio from '../components/Portolio.js';
import News from '../components/News.js';
import BackendAPI from '../api/BackendAPI'
import { propTypes } from 'react-bootstrap/esm/Image';

const HomePage = ({ isLoggedIn, coinList }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [positions, setPositions] = useState(null)
  const [triggerUpdate, setTriggerUpdate] = useState(false)

  useEffect(() => {
        const getPositions = async () => {
          let data = await BackendAPI.fetchUserPositions(localStorage.getItem("auth-user"))
          setPositions(data)
        }
        getPositions()
  }, [triggerUpdate])


  return (
    <Container fluid className="home-container">

    {
      (user && positions) &&
      <Container>
          <Row>
            <Col className="homepage-container"><Watchlist coinList={coinList} isLoggedIn={isLoggedIn}></Watchlist></Col>
            <Col ><Portfolio coinList={coinList} positions={positions} isLoggedIn={isLoggedIn} setTriggerUpdate={setTriggerUpdate}></Portfolio></Col>
            <Col className="homepage-container"><News positions={positions}></News></Col>
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