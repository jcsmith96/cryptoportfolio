import React, { useContext } from 'react'
import { Navbar, Nav, Button, Container, NavbarBrand} from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react'
import UserContext from '../contexts/UserContext'


let AppNav = (props) => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    const { user } = userContext;
    
    const renderLoginLogout = () => {
        
        return user
        ? (
         <div className="nav-button-div">
        <Nav.Item className="welcome-message">Welcome {user.username}!!</Nav.Item>
        <Nav.Item><Button className="button" variant="danger" size="sm" onClick={props.handleLogout}>Logout</Button></Nav.Item>
        </div>
        ) : (
        <div className="nav-button-div">  
        <Nav.Item><Button className="button" variant="warning" size="sm" onClick={() => navigate('/login')}>Login</Button></Nav.Item>
        <Nav.Item><Button className="button" variant="warning" size="sm" onClick={() => navigate('/signup')}>Sign Up</Button></Nav.Item>
        </div> 
        )
    }

    return (
        <div>
        <Navbar  expand="lg" variant="dark" bg="dark" className="nav-bar">
            <Container>
                <Navbar.Brand className ="navlink" as={Link} to="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Cryptocurrency_Logo.svg/633px-Cryptocurrency_Logo.svg.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="logo"
                    />
                     CRYPTFOLIO
                    </Navbar.Brand>
            
                    { renderLoginLogout() }
                
                
                </Container>
        </Navbar>
       </div>
    )
}

    export default AppNav;

