const express = require("express")
const dotenv = require("dotenv")
const fetch = require("node-fetch")

dotenv.config()


const server = express()
const credentials = process.env.CREDENTIALS
const url = "https://accounts.spotify.com/api/token"
const options = {
    method: "POST",
    // mode: 'cors',
    headers: {
        "content-type": 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`
    },
    body: "grant_type=client_credentials"
}


server.get('/', (req, res, next) => {
    fetch(url, options) 
    .then(fetchRes => {
        console.log(fetchRes)
        // fetchRes.access_token   
        // send it out as a JWT with an exp to be stored in a cookie
    })


  // on frontend, if exp has passed, send another request back here
})

server.listen(3000, () => {console.log('listening on http://localhost:3000')})