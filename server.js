const express = require('express')
const userRouter = require('./users/userRouter')

const server = express();
server.use(express.json())

const logger = (req, res, next) => {
  const { method, url } = req
  const date = new Date()
  // console.log(date)

  console.table({
    "HTTP Request Type": method,
    "Endpoint URL": url,
    "Request Timestamp": date
  })
  next()
}


server.use(logger)
server.use('/api/users', userRouter)

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`)
// });

//custom middleware


module.exports = server;


