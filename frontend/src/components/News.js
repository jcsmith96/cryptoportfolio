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

    useEffect(() => {
        if (user && props.positions){
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

        if (tweets) {
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
    
    if (finalTweets){
        console.log(finalTweets)
    }

let renderTweets = () => {
        return finalTweets.map((elem, index) => {
            return <Card className="news-cards" bg="dark" key={index}>
                        <Card.Body className="news-body">
                            <div className='news-card-title'>
                                <img className="profile-image" src={elem[0].profile_image_url} alt="pic"/>
                                <a href={elem[0].url}>@{elem[0].name}</a>
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
                
           { finalTweets  ? 
            renderTweets()
            :
            <div>

            </div>
            }
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