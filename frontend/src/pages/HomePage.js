import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext.js';
import {Container, Col, Row} from 'react-bootstrap'
import Watchlist from '../components/Watchlist.js';
import Portfolio from '../components/Portolio.js';
import RelatedTweets from '../components/RelatedTweets.js';

const HomePage = ({ isLoggedIn, coinList }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  return (
    <Container fluid className="home-container">
      
    {
      user &&
      <Container>
          <Row>
            <Col className="homepage-container"><Watchlist coinList={coinList}></Watchlist></Col>
            <Col ><Portfolio coinList={coinList} isLoggedIn={isLoggedIn}></Portfolio></Col>
            <Col className="homepage-container"><RelatedTweets></RelatedTweets></Col>
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