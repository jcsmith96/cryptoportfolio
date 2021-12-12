import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext.js';
import {Container, Col, Row} from 'react-bootstrap'

const HomePage = ({ isLoggedIn, handleLogout }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  return (
    <Container fluid className="home-container">
      
    {
      user &&
      <Container>
          <Row>
            <Col ><Container className="watch-list">WATCHLIST</Container></Col>
            <Col className="portfolio" xs={6}>PORTFOLIO</Col>
            <Col className="news">NEWS</Col>
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
      <div></div>
    }
  </Container>
  );
};

export default HomePage;