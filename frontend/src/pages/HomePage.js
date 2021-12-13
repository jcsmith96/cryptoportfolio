import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext.js';
import {Container, Col, Row} from 'react-bootstrap'
import Watchlist from '../components/Watchlist.js';
import Portfolio from '../components/Portolio.js';
import ArticleTeasers from '../components/ArticleTeasers.js';



const HomePage = ({ isLoggedIn, handleLogout }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  
  return (
    <Container fluid className="home-container">
      
    {
      user &&
      <Container>
          <Row>
            <Col ><Watchlist></Watchlist></Col>
            <Col ><Portfolio></Portfolio></Col>
            <Col ><ArticleTeasers></ArticleTeasers></Col>
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