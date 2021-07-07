const express = require('express')
const userRouter = require('./users/userRouter')

const server = express();
server.use(express.json())

const logger = (req, res, next) => {
  const { method, url } = req

  const options = {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }
  const date = new Date()

  console.table({
    "HTTP Request Type": method,
    "Endpoint URL": url,
    "Request Timestamp": date.toLocaleDateString("en-US", options)
  })
  next()
}


server.use(logger)
server.use('/api/users', userRouter)


module.exports = server;


