const server = require("./server.js");



const port = 4000;
const greeting = "Hi, Mr. Garcia!";
server.listen(port, () => {
  console.log(
    `\n*** ${greeting} Server Running on http://localhost:${port} ***\n`
  );
});