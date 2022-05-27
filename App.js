//mongodb://localhost:27017
//Create a server that can send back static files
const http = require("http");
const url = require("url");
const fs = require("fs");
const qs = require('querystring');

const { MongoClient } = require('mongodb');
const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

try {
  client.connect();
} catch(e) {
  console.log(e);
}
var response="";
var response2="";
var username="";
var login=0;

const server = http.createServer((req, res) => {
  //handle the request and send back a static file
  //from a folder called `public`
  let parsedURL = url.parse(req.url, true);
  //remove the leading and trailing slashes
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  if(login==0){
    if (path == "") {
      path = "Proiect.html";
    }
  }
  else{
    if (path == "") {
      path = "Proiect_MyProfile.html";
    }
    else
      if (path == "Proiect.html") {
        path = "Proiect_MyProfile.html";
      }
  }

  let file = __dirname + "/" + path;

  if(path.slice(-9)=="get_login")//modules/get_login  //tipsAndTricks/get_login   //get_login
  {
    const objectToSend = {"response": login};
    const jsonContent = JSON.stringify(objectToSend);
    res.end(jsonContent);

  }
  else
  if(path.slice(-26)=="username-database-response"){
    client.db("eGardening").collection('users').findOne({"name":username}, function(err, result) {
      if (err) {throw err}
      if(result!=null){
        res.end(JSON.stringify(result));  
      }
      else{
        res.end(JSON.stringify("Eroare"));  
      }
    })
  }
  else
  if(path=="Advanced-response"){
    client.db("eGardening").collection('courses').find({"level":"Advanced"}).toArray(function(err, result) {
      if (err) {throw err}
      if(result!=null){
        res.end(JSON.stringify(result));  
      }
      else{
        res.end(JSON.stringify("Eroare"));  
      }
    })
  }
  else
  if(path=="Intermediate-response"){
    client.db("eGardening").collection('courses').find({"level":"Intermediate"}).toArray(function(err, result) {
      if (err) {throw err}
      if(result!=null){
        res.end(JSON.stringify(result));  
      }
      else{
        res.end(JSON.stringify("Eroare"));  
      }
    })
  }
  else
  if(path=="Beginner-response")
  {
    client.db("eGardening").collection('courses').find({"level":"Beginner"}).toArray(function(err, result) {
      if (err) {throw err}
      if(result!=null){
        res.end(JSON.stringify(result));  
      }
      else{
        res.end(JSON.stringify("Eroare"));  
      }
    })
  }
  else
  if(path=="login_popup" && req.method=="POST"){
    path="Proiect.html";
    file = __dirname + "/" + path;
    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
           // request.connection.destroy();
           request.close();
    });

    req.on('end', function () {
        var post = qs.parse(body);
        var name = post.name;
        var password = post.pswd;

        client.db("eGardening").collection('users').findOne({"name":name},function(err, result) {
            if (err) {throw err;}
            if(result!=null){
              client.db("eGardening").collection('users').findOne({"password":password},function(err, result) {
                    if (err) {throw err;}
                    if(result!=null){
                      response="Login succesfully!";
                      username=name;
                      login=1;
                      console.log(response)
                      res.writeHead(302, { "Location": "http://" + 'localhost:1234/Proiect_MyProfile.html' });
                      res.end(response);
                    }
                    else
                    {
                      response="Login failed!";
                      console.log(response)
                      res.writeHead(302, { "Location": "http://" + 'localhost:1234' });
                      res.end(response);
                    }
                })
            }
            else{
                response="Login failed!";
                console.log(response)
                res.writeHead(302, { "Location": "http://" + 'localhost:1234' });
                res.end(response);
            }
        });
    });

  }
  else
  if(path=="login_popup" && req.method=="GET"){
      if(response!=""){
        const objectToSend = {"response": response, "username":username};
        response="";
        const jsonContent = JSON.stringify(objectToSend);
        res.end(jsonContent);
      }
  }
  else
  if(path=="signup_popup" && req.method=="POST"){
    path="Proiect.html";
    file = __dirname + "/" + path;
    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
            //request.connection.destroy();
            request.close();
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

      client.db("eGardening").collection('users').findOne({"name":data.name},function(err, result) {
          if (err) {throw err;}
          if(result==null){
              db.collection('users').insertOne(data, (err, collection) => {
                  if(err){
                      throw err;
                  }
                  response2="Recod Inserted Successfully";
                  console.log(response2);
                  res.writeHead(302, { "Location": "http://" + 'localhost:1234' });
                  res.end(response2);
              });
          }
          else
          {
              response2="Sign up failed!";
              console.log(response2);
              res.writeHead(302, { "Location": "http://" + 'localhost:1234' });
              res.end(response2);
          }
      });
    });
  }
  else
  if(path=="signup_popup" && req.method=="GET"){
      if(response2!=""){
        const objectToSend = {"response": response2}
        response2="";
        const jsonContent = JSON.stringify(objectToSend);
        res.end(jsonContent);  
      }
  }
  else
  if(path=="logout" && req.method=="POST"){
      res.writeHead(302, { "Location": "http://" + 'localhost:1234' });
      res.end("success");
      response="";
      response2="";
      username="";
      login=0;
  }
  else
  if(path.substring(0,4)=="task" && req.method=="POST"){//expresii regulate
    const taskText=path;
    if(path.substring(0,5)=="task1")
      path="Beginner.html";
    else
      if(path.substring(0,5)=="task2")
        path="Intermediate.html";
      else
        path="Advanced.html";
    file = __dirname + "/" + path;
    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
            //request.connection.destroy();
            request.close();
    });
    
    req.on('end', function () {
        var post = qs.parse(body);
        var task = post.task;
        let value=0;
        if(task!=null&&task!=undefined)
        {
          for(let i=0;i<task.length;i++){
            value = value + Number(task[i]);
          }
        }
        client.db("eGardening").collection('users').findOne({"name":username},function(err, result) {
            if (err) {throw err;}
            if(result!=null){
              client.db("eGardening").collection('users').updateOne({"name" : username}, 
                {'$set' : {[taskText] : value }})  
                  res.writeHead(302, { "Location": "http://localhost:1234/"+path });
                  res.end(response);
            }
            else{
                res.writeHead(302, { "Location": "http://localhost:1234/"+path });
                res.end(response);
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
          res.writeHead(200, { "Content-type": ["text/html"] });  break;
        case "css":
          res.writeHead(200, { "Content-type": ["text/css"] });  break;
        case ".js":
          res.writeHead(200, { "Content-type": ["application/javascript"] });  break;
      }
      res.end(content);
    }
    });
  } 
});

server.listen(1234, "localhost", () => {
  console.log("Listening on port 1234");
});