import twitterKeys from './twitterKeys'


const fetchRelatedTweets = async () => {
    // var request = require('request');

    //     var options = {
    //         url: 'https://api.twitter.com/oauth2/token?grant_type=client_credentials',
    //         method: 'POST',
    //         auth: {
    //             'user': `${twitterKeys.}`,
    //             'pass': '$API_SECRET_KEY'
    //         }
    //     };

    //     function callback(error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             console.log(body);
    //         }
    //     }

    //     request(options, callback);




    const url = 'https://api.twitter.com/2/tweets/search/recent?query=from:twitterdev'
    const init = {
        method: "GET",
        headers: {
            Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAABzvWwEAAAAANcAl30HsvqkB5sgEIBdl6Zs%2BKZk%3DK3lLGxCjaoMMkcEsFL88KG6Hqlv1vl7Qr4T9KBWyokLcTokr87'
        }
    }

    let response = await fetch(url, init)
    console.log(response)
    let data = await response.json()
    console.log(data)
    return data 
}


// curl --request POST -u$API_KEY:$API_SECRET_KEY \
//   --url 'https://api.twitter.com/oauth2/token?grant_type=client_credentials'

// POST /oauth2/token HTTP/1.1
// Host: api.twitter.com
// User-Agent: My Twitter App v1.0.23
// Authorization: Basic eHZ6MWV2RlM0d0VFUFRHRUZQSEJvZzpMOHFxOVBaeVJn
//                      NmllS0dFS2hab2xHQzB2SldMdzhpRUo4OERSZHlPZw==
// Content-Type: application/x-www-form-urlencoded;charset=UTF-8
// Content-Length: 29
// Accept-Encoding: gzip

// grant_type=client_credentials







// const fetchRelatedTweets = () => {
// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAABzvWwEAAAAANcAl30HsvqkB5sgEIBdl6Zs%2BKZk%3DK3lLGxCjaoMMkcEsFL88KG6Hqlv1vl7Qr4T9KBWyokLcTokr87");
// myHeaders.append("Cookie", "guest_id=v1%3A163975336670200328; guest_id_ads=v1%3A163975336670200328; guest_id_marketing=v1%3A163975336670200328; personalization_id=\"v1_lGK9MHqQE+kid8O4TUdjvA==\"");

// var raw = "";

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch("https://api.twitter.com/2/tweets/search/recent?query=from:twitterdev", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('helooo', error));
  
// }


const exportItems = {
    fetchRelatedTweets
}


export default exportItems


