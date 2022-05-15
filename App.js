//Create a server that can send back static files
const http = require("http");
const url = require("url");
const fs = require("fs");


const server = http.createServer((req, res) => {
  //handle the request and send back a static file
  //from a folder called `public`
  let parsedURL = url.parse(req.url, true);
  //remove the leading and trailing slashes
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  /**
   *  /
   *  /index.html
   *  /main.css
   *  /main.js
   */
  if (path == "") {
    path = "Proiect.html";
  }
  console.log(`Requested path ${path} `);

  let file = __dirname + "/" + path;
  //async read file function uses callback
  fs.readFile(file, function(err, content) {
    if (err) {
      console.log(`File Not Found ${file}`);
      res.writeHead(404);
      res.end();
    } else {
      //specify the content type in the response
      console.log(`Returning ${path}`);
      res.setHeader("X-Content-Type-Options", "nosniff");
        switch (path.slice(-3)) {
        case "tml":
           res.writeHead(200, { "Content-type": "text/html" });  break;
        case "css":
            res.writeHead(200, { "Content-type": "text/css" });  break;
       }
      res.end(content);
    }
  });
});

server.listen(1234, "localhost", () => {
  console.log("Listening on port 1234");
});
