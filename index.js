/*
 * HW for Pirple JS-Masterclass
 * 
 */

const http = require('http')
const url = require('url')

const config = {
    port: 3000
}

const httpServer = http.createServer((req, res) => {
    serve(req, res)
})

httpServer.listen(config.port, function() {
    console.log(`Server up and running on port ${config.port}`)
})

let serve = (req, res) => {
    let parsedUrl = url.parse(req.url, true)

    let path = parsedUrl.pathname
    let trimmedPath = path.replace(/\/+|\/+$/g, '')

    let handler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

    let data = {
        trimmedPath
    }

    handler (data, (statusCode, payload) => {

        statusCode = typeof (statusCode) === 'number' ? statusCode : 200
        payload = JSON.stringify( typeof (payload) === 'object' ? payload : {})
        
        res.setHeader('Content-Type', 'application/json')
        res.writeHead(statusCode)
        res.end(payload)

        console.log(`Request at ${data.trimmedPath} returned ${payload}`)
    })
}


let handlers = {}

handlers.hello = (data, callback) => {
    callback(200, { hello: "there", timestamp: Date.now() })
}

handlers.notFound = (data, callback) => {
    callback(404)
}

let router = {
    hello: handlers.hello
}