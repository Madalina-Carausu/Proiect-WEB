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
var admin=0; //wether or not the administrator is connected

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

  if(path.substring(0, 6)=="Plants"){
    //Plants-Beginner-response
    if(path.slice(-8)=="Beginner"){
      client.db("eGardening").collection('plants').find({"level":"Beginner"}).toArray(function(err, result) {
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
    if(path.slice(-12)=="Intermediate"){
      client.db("eGardening").collection('plants').find({"level":"Intermediate"}).toArray(function(err, result) {
        if (err) {throw err}
        if(result!=null){
          res.end(JSON.stringify(result));  
        }
        else{
          res.end(JSON.stringify("Eroare"));  
        }
      })
    }
    else{
      client.db("eGardening").collection('plants').find({"level":"Advanced"}).toArray(function(err, result) {
        if (err) {throw err}
        if(result!=null){
          res.end(JSON.stringify(result));  
        }
        else{
          res.end(JSON.stringify("Eroare"));  
        }
      })
    }
  }
  else
  if(path.slice(-9)=="get_login")//modules/get_login  //tipsAndTricks/get_login   //get_login
  {
    const objectToSend = {"response": login, "username":username};
    const jsonContent = JSON.stringify(objectToSend);
    res.end(jsonContent);

  }
  else
  if(path.slice(-9)=="get_admin")//modules/get_login  //tipsAndTricks/get_login   //get_login
  {
    const objectToSend = {"response": admin};
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
    file = __dirname + "/" + path;              //abstactizare, sa am undeva o clasa cu ceva si sa caut acolo, sa nu mai fac +
    var body = '';                              //functie in care dam tot request body ul
                                                //mai putine if uri
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
                      if(username == "admin") admin = 1;
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
      if(username == "admin") admin = 0;
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
  else
  if(path == "form_questions" && req.method=="POST" ) {
    var body = '';

    if(username != "") {

      req.on('data', function (data) {
          body += data;
          if (body.length > 1e6)
              request.close();
      });


      req.on('end', function () {
        var post = qs.parse(body);
        var question = post.question;
        var data = {
          "question": question,
          "username": username
        }
      
        client.db("eGardening").collection('questions').insertOne(data, (err, collection) => {
          if(err){
              throw err;
          }
          response2="Recod Inserted Successfully";
          console.log(response2);
          res.writeHead(302, { "Location": "http://" + 'localhost:1234/QA.html' });
          res.end(response2);
        });
        
      });
    }
    else
    {
      response2="The user is not logged in";
      console.log(response2);
      res.writeHead(302, { "Location": "http://" + 'localhost:1234/QA.html' });
      res.end(response2);
    }
  }
  else
  if(path == "form_add_course" && req.method=="POST" ) {
    var body = '';

    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
            request.close();
    });

    req.on('end', function () {
      var post = qs.parse(body);
      var level = post.difficulty;
      var display = post.title;
      var title1 = post.title1;
      var content1 = post.content1;
      var filename1 = post.filename1;
      var title2 = post.title2;
      var content2 = post.content2;
      var filename2 = post.filename2;
      var title3 = post.title3;
      var content3 = post.content3;
      var filename3 = post.filename3;
      var title4 = post.title4;
      var content4 = post.content4;
      var filename4 = post.filename4;
      var task1 = post.task1;
      var task2 = post.task2;
      var task3 = post.task3;
      var task4 = post.task4;

      var data = {
        "level" : level,
        "display" : display,
        "maxPoints" : 4,
        "title1" : title1,
        "content1" : content1,
        "filename1" : filename1,
        "title2" : title2,
        "content2" : content2,
        "filename2" : filename2,
        "title3" : title3,
        "content3" : content3,
        "filename3" : filename3,
        "title4" : title4,
        "content4" : content4,
        "filename4" : filename4,
        "task1" : task1,
        "task2" : task2,
        "task3" : task3,
        "task4" : task4
      }
    
      client.db("eGardening").collection('courses').insertOne(data, (err, collection) => {
        if(err){
            throw err;
        }
        response2="Recod Inserted Successfully";
        console.log(response2);
        res.writeHead(302, { "Location": "http://" + 'localhost:1234/Admin.html#form-add-course' });
        res.end(response2);
      });
      
    });
  }
  else
  if(path == "form_add_plant" && req.method=="POST" ) {
    var body = '';

    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
            request.close();
    });

    req.on('end', function () {
      var post = qs.parse(body);
      var level = post.difficulty;
      var name = post.name;
      var filename_plant = post.filename_plant;
      var task1 = post.task1;
      var task2 = post.task2;
      var task3 = post.task3;

      var data = {
        "name" : name,
        "task1" : task1,
        "task2" : task2,
        "task3" : task3,
        "level" : level,
        "image" : filename_plant
      }
    
      client.db("eGardening").collection('plants').insertOne(data, (err, collection) => {
        if(err){
            throw err;
        }
        response2="Recod Inserted Successfully";
        console.log(response2);
        res.writeHead(302, { "Location": "http://" + 'localhost:1234/Admin.html#form-add-plant' });
        res.end(response2);
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