const express = require("express")
const dotenv = require("dotenv")
const fetch = require("node-fetch")


dotenv.config()
const port = process.env.PORT
const credentials = process.env.CREDENTIALS


const server = express()
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
        if (fetchRes.status !== 200) {
            console.log("POST REQUEST TO SPOTIFY FAILED")
            console.log({url, options, fetchRes})
            res.send(418).send("Spotify does not like your request. I don't know why. I am only a teapot after all. Here is their status code: ", fetchRes.status)
        }
        let body = ""
        fetchRes.body.on('data', data => body += data)
        fetchRes.body.on('end', () => {
            const intendedResponse = JSON.parse(body)
            const anHourFromNow = Math.floor(new Date() / 1000) + 3600

            res.status(200).send({
                access_token: intendedResponse.access_token,
                exp: anHourFromNow
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).send("Server error")
    })


  // on frontend, if exp has passed, send another request back here
})

server.listen(port, () => {console.log('listening on http://localhost:' + port)})