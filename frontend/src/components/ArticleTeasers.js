import React, { useContext } from 'react'
import { Container, Nav } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react'
import UserContext from '../contexts/UserContext'



let ArticleTeasers = () => {


    return (
        <Container className="news">
           <h5 className='div-label'> NEWS </h5>
           <hr />
            </Container>
    )

}

export default ArticleTeasers