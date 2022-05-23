//Create a server that can send back static files
const http = require("http");
const url = require("url");
const fs = require("fs");
const qs = require('querystring');

var mongoose = require("mongoose")

mongoose.connect('mongodb://Localhost:27017/mydb');

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));

const server = http.createServer((req, res) => {
  //handle the request and send back a static file
  //from a folder called `public`
  let parsedURL = url.parse(req.url, true);
  //remove the leading and trailing slashes
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  if (path == "") {
    path = "Proiect.html";
  }
  //console.log(`Requested path ${path} `);

  let file = __dirname + "/" + path;
  if(path.slice(-17)=="Beginner-response")//expresii regulate
  {
      res.end("0");//baza de date
  }
  else
    if(path.slice(-11)=="login_popup"){
      var body = '';
      req.on('data', function (data) {
          body += data;
          if (body.length > 1e6)
              request.connection.destroy();
      });

      req.on('end', function () {
          var post = qs.parse(body);
          var name = post.uname;
          var password = post.psw;

          db.collection('users').findOne({"name":name},function(err, result) {
              if (err) {throw err;}
              if(result!=null){
                  db.collection('users').findOne({"password":password},function(err, result) {
                      if (err) {throw err;}
                      if(result!=null){
                        console.log("Login succesfully!")
                        return res.end("Login succesfully!");
                      }
                      else
                      {
                        console.log("Login failed!")
                        return res.end("Login failed!");
                      }
                  })
              }
              else{
                  console.log("Login failed!")
                  return res.end("Login failed!");
              }
          });
      });
    }
    else
    if(path.slice(-12)=="signup_popup"){
      var body = '';
      req.on('data', function (data) {
          body += data;
          if (body.length > 1e6)
              request.connection.destroy();
      });

      req.on('end', function () {
          var post = qs.parse(body);
          var name = post.uname;
          var password = post.psw;
          var email=post.email;
          var phone=post.phone;

          var data = {
            "name": name,
            "password": password,
            "email": email,
            "phone": phone
        }

          db.collection('users').findOne({"name":data.name},function(err, result) {
            if (err) {throw err;}
            if(result==null){
                console.log("Can signup!")
                db.collection('users').insertOne(data, (err, collection) => {
                    if(err){
                        throw err;
                    }
                    console.log("Recod Inserted Successfully");//inserted to the db
                    //res.end("Recod Inserted Successfully");
                    return res.end("Recod Inserted Successfully");
                });
            }
            else
            {
                console.log("Signup failed!")
                return req.end("Signup failed!");
                //res.end("Signup failed!");
                //return "Signup failed!";
                //return res.redirect('signup_fail.html')
            }
        });
      });
    }
    else{
    //async read file function uses callback
    fs.readFile(file, function(err, content) {
      if (err) {
        console.log(`File Not Found ${file}`);
        res.writeHead(404);
        res.end();
      } else {
        //specify the content type in the response
        //console.log(`Returning ${path}`);
        res.setHeader("X-Content-Type-Options", "nosniff");
        
          switch (path.slice(-3)) {
          case "tml":
            res.writeHead(200, { "Content-type": "text/html" });  break;
          case "css":
            res.writeHead(200, { "Content-type": "text/css" });  break;
          case ".js":
            res.writeHead(200, { "Content-type": "application/javascript" });  break;
        }
        res.end(content);
      }
    });
  }
});

server.listen(1234, "localhost", () => {
  console.log("Listening on port 1234");
});


/*
app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }

    db.collection('users').findOne({"email":data.email},function(err, result) {
        if (err) {throw err;}
        if(result==null){
            console.log("Can signup!")
            db.collection('users').insertOne(data, (err, collection) => {
                if(err){
                    throw err;
                }
                console.log("Recod Inserted Successfully");//inserted to the db
                return res.redirect('signup_success.html')//res.blob(img)
            });
        }
        else
        {
            console.log("Signup failed!")
            return res.redirect('signup_fail.html')
        }
    });
})
*/