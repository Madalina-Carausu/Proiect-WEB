//mongodb://localhost:27017
//Create a server that can send back static files
const http = require("http");
const url = require("url");
const fs = require("fs");
const qs = require('querystring');
const bcrypt = require("bcrypt");

const saltRounds = 10;
var formidable = require('formidable');


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

  if(path.substring(0, 6)=="plant_"&&req.method=="POST"){
    
    var body = '';
    var image=path.substring(6, path.length);
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
            request.close();
    });
    
    req.on('end', function () {
        var post = qs.parse(body);
        var task = post.task;
        var task1=false;
        var task2=false;
        var task3=false;
        if(task!=null&&task!=undefined)
        {
          for(let i=0;i<task.length;i++){
            if(task[i]==1)
              task1=true;
            else
              if(task[i]==2)
                task2=true;
              else
                  task3=true;
            
          }
          client.db("eGardening").collection('users').findOne({"name":username, "plants.image": image},  function(err, result) {
            if (err) {throw err;}
            if(result!=null){
              client.db("eGardening").collection('users').updateMany({"name":username, "plants.image": image},  
              {'$set' : { "plants.$.task1" : task1 , "plants.$.task2" : task2 , "plants.$.task3" : task3 }})  
            }
            else
              client.db("eGardening").collection('users').updateOne({"name" : username}, 
              {'$push' : {"plants":{ "image": image, "task1" : task1 , "task2" : task2 , "task3" : task3 }}})  
          });
        }
        res.writeHead(302, { "Location": "http://localhost:1234/MyProfile.html"});
        res.end();

    })
  }
  else
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
  if(path=="get_questions" && req.method=="GET"){

    client.db("eGardening").collection('questions').find({"answer" : ""}).toArray(function(err, result) {
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
  if(path=="get_questions_and_answers" && req.method=="GET"){

    client.db("eGardening").collection('questions').find({"answer" : {$ne: ""}}).toArray(function(err, result) {
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
           request.close();
    });

    req.on('end', function () {
        var post = qs.parse(body);
        var name = post.name;
        var password = post.pswd;

        client.db("eGardening").collection('users').findOne({"name":name}, async function(err, result) {
            if (err) {throw err;}
            if(result!=null){
              const cmp = await bcrypt.compare(password, result.password);
              if(cmp){
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
            }
      });
    })
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
            request.close();
    });

    req.on('end', async function () {
        var post = qs.parse(body);
        var name = post.uname;
        var password = post.psw;
        var email=post.email;
        var phone=post.phone;

        const hashedPwd = await bcrypt.hash(password, saltRounds);

        var data = {
          "name": name,
          "password": hashedPwd,
          "email": email,
          "phone": phone,
          "plants":[]
      }

      
      client.db("eGardening").collection('users').findOne({"name":data.name},function(err, result) {
          if (err) {throw err;}
          if(result==null){
            client.db("eGardening").collection('users').insertOne(data, (err, collection) => {
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
      if(username == "admin") admin = 0;
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
          "username": username,
          "answer" : ""
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
    /*var body = '';

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
      
    });*/
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

      var oldpath = files.filename1.filepath;
      var newName1 = Date.now().toString() + files.filename1.originalFilename;
      var newpath =  __dirname + '/images/' + newName1;
      
      fs.copyFile(oldpath, newpath, function (err) {
        if (err) throw err;
        else 
        {
          response2="File uploaded and moved!" + newpath;
          console.log(response2);
        }
      });
      oldpath = files.filename2.filepath;
      var newName2 = Date.now().toString() + files.filename2.originalFilename;
      newpath =  __dirname + '/images/' + newName2;
      
      fs.copyFile(oldpath, newpath, function (err) {
        if (err) throw err;
        else 
        {
          response2="File uploaded and moved!" + newpath;
          console.log(response2);
        }
      });

      oldpath = files.filename3.filepath;
      var newName3 = Date.now().toString() + files.filename3.originalFilename;
      newpath =  __dirname + '/images/' + newName3;
      
      fs.copyFile(oldpath, newpath, function (err) {
        if (err) throw err;
        else 
        {
          response2="File uploaded and moved!" + newpath;
          console.log(response2);
        }
      });

      oldpath = files.filename4.filepath;
      var newName4 = Date.now().toString() + files.filename4.originalFilename;
      newpath =  __dirname + '/images/' + newName4;
      
      fs.copyFile(oldpath, newpath, function (err) {
        if (err) throw err;
        else 
        {
          response2="File uploaded and moved!" + newpath;
          console.log(response2);
        }
      });

      var level = fields.difficulty;
      var display = fields.title;
      var title1 = fields.title1;
      var content1 = fields.content1;
      var filename1 = newName1.substring(0, newName1.length-4);
      var title2 = fields.title2;
      var content2 = fields.content2;
      var filename2 = newName2.substring(0, newName2.length-4);
      var title3 = fields.title3;
      var content3 = fields.content3;
      var filename3 = newName3.substring(0, newName3.length-4);
      var title4 = fields.title4;
      var content4 = fields.content4;
      var filename4 = newName4.substring(0, newName4.length-4);
      var task1 = fields.task1;
      var task2 = fields.task2;
      var task3 = fields.task3;
      var task4 = fields.task4;

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
    /*var body = '';

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
      
    });*/

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

      var oldpath = files.filename_plant.filepath;
      var newName = Date.now().toString() + files.filename_plant.originalFilename;
      var newpath =  __dirname + '/images/' + newName;
      
      /*fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        else 
        {
          response2="File uploaded and moved!" + newpath;
          console.log(response2);
        }
      });*/

      fs.copyFile(oldpath, newpath, function (err) {
        if (err) throw err;
        else 
        {
          response2="File uploaded and moved!" + newpath;
          console.log(response2);
        }
      });

      var level = fields.difficulty;
      var name = fields.name;
      var filename_plant = newName.substring(0, newName.length-4);
      var task1 = fields.task1;
      var task2 = fields.task2;
      var task3 = fields.task3;

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
  else
  if(path == "form_answer_question" && req.method=="POST" ) {
    
    var body = '';

    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
            request.close();
    });

    req.on('end', function () {
      var post = qs.parse(body);
      var questionAndFrom = post.chosen_question;
      var answer = post.answer;
      var question = questionAndFrom.slice(0, questionAndFrom.search(" ---"));
      var user = questionAndFrom.slice(questionAndFrom.search("FROM")+5, questionAndFrom.length);
    
      client.db("eGardening").collection('questions').findOne({"question":question, "username" : user},function(err, result) {
        if (err) {throw err;}
        if(result!=null){
          client.db("eGardening").collection('questions').updateOne({"question":question, "username" : user}, 
            {'$set' : {"answer" : answer }});  
          response2="Record Inserted Successfully";
          console.log(response2);
          res.writeHead(302, { "Location": "http://localhost:1234/Admin.html#form-answer-question" });
          res.end(response2);
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