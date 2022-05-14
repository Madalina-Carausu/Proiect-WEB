/*const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req, res) {

    console.log(req.url, req.method);
    res.setHeader('Content-Type', 'text/html');

    let path = './';
    console.log("req.url=",req.url)
    switch(req.url) {
        case '/':
            path += 'Proiect.html';
            break;
        default: path=".".concat(req.url);
    }
    
    console.log("path=",path)
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
});

server.listen(5500, '127.0.0.1');*/


//Create a server that can send back static files
const http = require("http");
const url = require("url");
const fs = require("fs");

//npm i mime-types
//const lookup = require("mime-types").lookup;

const server = http.createServer((req, res) => {
  //handle the request and send back a static file
  //from a folder called `public`
  let parsedURL = url.parse(req.url, true);
  //remove the leading and trailing slashes
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  /**
   *  /
   *  /index.html
   *
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
      //let mime = lookup(path);
      //res.writeHead(200, { "Content-type": mime });
        switch (path) {
        case "Beginner.html":
           res.writeHead(200, { "Content-type": "text/html" });  break;
        case "Intermediate.html":
            res.writeHead(200, { "Content-type": "text/html" });  break;
        case "Advanced.html":
            res.writeHead(200, { "Content-type": "text/html" });  break;
        case "Proiect.html":
           res.writeHead(200, { "Content-type": "text/html" });  break;
        case "QA.html":
            res.writeHead(200, { "Content-type": "text/html" });  break;
        case "Proiect.css":
            res.writeHead(200, { "Content-type": "text/css" });  break;
        case "Advanced.css":
            res.writeHead(200, { "Content-type": "text/css" });  break;
        case "BegIntAdv.css":
            res.writeHead(200, { "Content-type": "text/css" });  break;
        case "QA.css":
            res.writeHead(200, { "Content-type": "text/css" });  break;
       }
      res.end(content);
    }
  });
});

server.listen(1234, "localhost", () => {
  console.log("Listening on port 1234");
});
