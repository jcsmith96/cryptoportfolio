import { useState, useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'

import UserContext from '../contexts/UserContext'

import TwitterAPI from '../api/TwitterAPI'

let RelatedTweets = (props) => {
    const { user } = useContext(UserContext)
    const [relatedTweets, setRelatedTweets] = useState(null)


    useEffect(() => {
        const getTweets = async () => {
            let data = await TwitterAPI.fetchRelatedTweets()
            console.log(data)
            setRelatedTweets(data)

        }
        getTweets()
    }, [])

  

    return (
        <Container className="news">
           
            </Container>
    )

}

export default RelatedTweets