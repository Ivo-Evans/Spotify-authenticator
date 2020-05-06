const express = require("express")
const dotenv = require("dotenv")
const fetch = require("node-fetch")
const { deflate, unzip } = require("zlib")
const fs = require("fs")

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

// const options = {
//     method: "POST",
//     headers: {
//         "content-type": "application/x-www-form-urlencoded",
//         "Authorization": "Basic OGRiYzE2ZTNiOWI1NGFmOTlkODgxMTIxOTQ1NmI5NDA6YzNlODQ3MjRkZDFhNDRiOWEyOGQzMTBjNThhZWM4Y2U="
//     },
//     body: "grant_type=client_credentials"
// }


server.get('/', (req, res, next) => {
    fetch(url, options) 
    .then(fetchRes => {
        let body = ""
        fetchRes.body.on('data', data => body += data)
        fetchRes.body.on('end', () => {
            const intendedResponse = JSON.parse(body)
            console.log(intendedResponse)
            res.end()
        })
    })


  // on frontend, if exp has passed, send another request back here
})

server.listen(3000, () => {console.log('listening on http://localhost:3000')})