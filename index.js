require('dotenv').config()

const server = require("./server.js");



const port = process.env.PORT || 4001;
const greeting = "Hi, Mr. Garcia!";
server.listen(port, () => {
  console.log(
    `\n*** ${greeting} Server Running on http://localhost:${port} ***\n`
  );
});