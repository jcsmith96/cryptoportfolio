import { useState, useContext, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import UserContext from '../contexts/UserContext'
import newsAPIKey from '../api/newsAPIkey'
import { resolvePath } from 'react-router-dom'


let News = (props) => {
    const { user } = useContext(UserContext)
    const [keywords, setKeywords] = useState(null)
    const [news, setNews] = useState(null)
    const [isLoaded, setisLoaded] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentNewsPage, setCurrentNewsPage] = useState(null)
    const [tweets, setTweets] = useState(null)
    const [finalTweets, setFinalTweets] = useState(null)

    console.log(tweets)
    useEffect(() => {
        if (user && (props.positions.length > 0)){
            let fetchTweets = async () => {
            const url = 'http://localhost:8000/twitter'

            const init = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`JWT ${localStorage.getItem("auth-user")}`
                }
            }

            let response = await fetch(url, init)
            let data = await response.json()
            setTweets(data)
        }
        fetchTweets()
    }

    }, [props.positions])




    useEffect(() => {
        let formattedTweets = []

        if (tweets && (props.positions.length > 0)) {
            tweets.includes.users.forEach(elem => {
                for (let i=0; i<tweets.data.length; i++){
                    if (elem.id === tweets.data[i].author_id){
                        formattedTweets.push([elem, tweets.data[i]])
                    }
                }
            })
            setFinalTweets(formattedTweets)
        }

    }, [tweets])

   
    console.log(tweets)

let renderTweets = () => {
        return finalTweets.map((elem, index) => {
            return <Card className="news-cards" bg="dark" key={index}>
                        <Card.Body className="news-body">
                            <div className='news-card-title'>
                                <div className="new-pic-name">
                                <img className="profile-image" src={elem[0].profile_image_url} alt="pic"/>
                                <a href={elem[0].url}>@{elem[0].name}</a>
                                </div>
                                <div className="twitter-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#1DA1F2" class="bi bi-twitter" viewBox="0 0 16 16">
                                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                </svg>
                                </div>
                                </div>
                            <div className="card-author">{elem[1].text}</div>
                        </Card.Body>
                    </Card>
        })
    
    }



//     useEffect(() => {
//         if (props.positions && user){
//         const getKeyWords = async () => {
//             let words = []
//             props.positions.forEach((elem) => {
//                 words.push(elem.asset_id)
//                 })
//             setKeywords(words.join(' '))
//             }
//         getKeyWords()
//         }
//     }, [props.positions, user])

// // when fetches news and sets new variable 
//     useEffect(() => {
//         if (props.date){
        
//         fetchNews()
//         }
//     }, [keywords])

//     const fetchNews = async () => {
//         const url = `http://api.mediastack.com/v1/news?access_key=${newsAPIKey}&date=${props.date}&countries=us&languages=en&limit=5&keywords=${keywords}&offset=${currentPage}`
//         let response = await fetch(url)
//         let data = await response.json()
//         setNews(data)
//         setPageCount(Math.ceil(data.pagination.total / data.pagination.limit))
//         setisLoaded(true)
//     }

    
//     const handlePageChange = (event) => {
//         console.log(event.selected)
//         if ((((event.selected+1) * 5) - 5) <= 0) {
//             setCurrentPage(0)
//         } else {
// 		setCurrentPage(((event.selected+1) * 5) - 5);
//         }
// 		fetchNews()
// 	};
    
//     let renderNews = () => {
      
//         return news.data.map((elem, index) => {
//             return <Card className="news-cards" bg="dark" key={index}>
//                         <Card.Body className="news-body">
//                             <div className='card-title'><a href={elem.url}>{elem.title}</a></div>
//                             <div className="card-author">{elem.author}</div>
//                         </Card.Body>
//                     </Card>
//         })
    
//     }


    return (
        <Container className="news">
            
            <div className='news-div'>
                <div>
           { finalTweets  &&
           
         
                renderTweets()

    
           }
            </div>
            </div>
            </Container>
    )

}

export default News




// {isLoaded ? (
//     <div className="news-paginate">
//     <ReactPaginate
//         pageCount={pageCount}
//         pageRange={1}
//         marginPagesDisplayed={0}
//         onPageChange={handlePageChange}
//         containerClassName={'page-container'}
//         previousLinkClassName={'page'}
//         breakClassName={'page'}
//         nextLinkClassName={'page'}
//         pageClassName={'page'}
//         previousLabel={'PREV'}
//         nextLabel={'NEXT'}
//         disabledClassName={'page-disabled'}
//         activeClassName={'page-active'}
//     />
//     </div>
// ) : (
//     <div>Nothing to display</div>
// )} 

// </div> */}