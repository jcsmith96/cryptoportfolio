import React, { useContext } from 'react'
import { Container, Nav } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react'
import UserContext from '../contexts/UserContext'

let Portfolio = () => {

    return (
        <Container className="portfolio" xs={6}>
        <h5 className='div-label'>YOUR PORTFOLIO</h5>
        <hr />
        </Container>
    )

}

export default Portfolio
