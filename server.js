const express = require('express')

const server = express();

const logger = (req, res, next) => {
  const { method, url, timestamp } = req

  console.table({
    "HTTP Request Type": method,
    "Endpoint URL": url,
    "Request Timestamp": timestamp
  })
  next()
}


server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware


module.exports = server;


