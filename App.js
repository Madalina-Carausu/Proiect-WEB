//Create a server that can send back static files
/*const http = require("http");
const url = require("url");
const fs = require("fs");


const server = http.createServer((req, res) => {
  //handle the request and send back a static file
  //from a folder called `public`
  console.log('la intrare in server: ', req.url);
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  console.log('pathul: ', path);
  res.setHeader("X-Content-Type-Options", "nosniff");

  if(path.slice(-17)=="Beginner-response" && req.method=="GET")//expresii regulate
  {
      console.log('am intrat in if');
      
     res.setHeader("Content-Type", "text/plain");
      //res.writeHead(200, {"Content-Type": "text/plain"});
      res.write("Hello World");
      res.end();
    
  }
  
});

server.listen(5500, "127.0.0.1", () => {
  console.log("Listening on port 5500");
});
*/