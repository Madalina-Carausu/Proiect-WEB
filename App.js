//mongodb://localhost:27017
//Create a server that can send back static files
const http = require("http");
const url = require("url");
const fs = require("fs");
const qs = require('querystring');
const mongoose = require("mongoose");

var SignUpUser = require("./controllers/SignUpController");
var LoginUser = require("./controllers/LoginController");
var TaskUser = require("./controllers/TaskController");
var Users = require("./controllers/UsersController");
var Plants = require("./controllers/PlantsController");
var Questions = require("./controllers/QuestionsController")

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

var formidable = require('formidable');
var ejs = require('ejs');

mongoose.connect('mongodb://localhost:27017/eGardening');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

var response="";
var response2="";
var username="";
var login=0;
var admin=0;

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

    let file = __dirname + "/views/" + path;
  if(path=="ranking"&&req.method=="GET"){//FACUTA
    Users.getAllUsers(req, res);
  }
  else
  if(path.substring(0, 6)=="plant_"&&req.method=="POST"){//FACUTA
    
    var body = '';
    var image=path.substring(6, path.length);
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
            request.close();
    });
    
    req.on('end', async function () {
      await Users.addTasksForPlants(body, res, image, username)
    })
  }
  else
  if(path.substring(0, 6)=="Plants"){//FACUTA
    Plants.plantsForSpecificLevel(path, res)
  }
  else
  if(path.slice(-9)=="get_login")//NIMIC
  {
    const objectToSend = {"response": login, "username":username};
    const jsonContent = JSON.stringify(objectToSend);
    res.end(jsonContent);

  }
  else
  if(path.slice(-9)=="get_admin")//NIMIC
  {
    const objectToSend = {"response": admin};
    const jsonContent = JSON.stringify(objectToSend);
    res.end(jsonContent);
  }
  else
  if(path.slice(-26)=="username-database-response"){//FACUT
    Users.findUserByName(username, res)
  }
  else
  if(path=="Advanced-response"){//COURSES
    db.collection('courses').find({"level":"Advanced"}).toArray(function(err, result) {
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
  if(path=="Intermediate-response"){//COURSES
    db.collection('courses').find({"level":"Intermediate"}).toArray(function(err, result) {
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
  if(path=="Beginner-response")//COURSES
  {
    db.collection('courses').find({"level":"Beginner"}).toArray(function(err, result) {
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
  if(path.substring(0,8) == "Beginner" && req.method=="POST") {//COURSES
    var number = Number(path.substring(8, path.length));
    db.collection('courses').findOne({"level":"Beginner", "number" : number}, function(err, result){ 
      if (err) {throw err}
      //const output = modulePage();
      if(result!=null) {
        const template = fs.readFileSync('./views/modules/GeneralModule.ejs', 'utf8');
        
        var filename1 = "../images/" + result.filename1 +".png";
        var filename2 = "../images/" + result.filename2 +".png";
        var filename3 = "../images/" + result.filename3 +".png";
        var filename4 = "../images/" + result.filename4 +".png";
        if(result.level == "Beginner") nr=1;
        else if(result.level == "Intermediate") nr=2;
        else if(result.level == "Advanced") nr=3;
        var action = "/task" + nr+"_"+result.number;
        const output = ejs.render(template, {action:action,display: result.display, title1: result.title1, title2:result.title2, title3: result.title3, title4:result.title4, content1:result.content1, content2:result.content2, content3:result.content3, content4:result.content4, task1:result.task1, task2:result.task2, task3:result.task3, task4:result.task4, filename1: filename1, filename2: filename2, filename3: filename3, filename4: filename4});

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(output);
        res.end();
      }
    })
  }
  else
  if(path.substring(0,12) == "Intermediate" && req.method=="POST") {//COURSES
    var number = Number(path.substring(12, path.length));
    db.collection('courses').findOne({"level":"Intermediate", "number" : number}, function(err, result){ 
      if (err) {throw err}
      //const output = modulePage();
      if(result!=null) {
        const template = fs.readFileSync('./views/modules/GeneralModule.ejs', 'utf8');
        var filename1 = "../images/" + result.filename1 +".png";
        var filename2 = "../images/" + result.filename2 +".png";
        var filename3 = "../images/" + result.filename3 +".png";
        var filename4 = "../images/" + result.filename4 +".png";
        if(result.level == "Beginner") nr=1;
        else if(result.level == "Intermediate") nr=2;
        else if(result.level == "Advanced") nr=3;
        var action = "/task" + nr+"_"+result.number;
        const output = ejs.render(template, {action:action,display: result.display, title1: result.title1, title2:result.title2, title3: result.title3, title4:result.title4, content1:result.content1, content2:result.content2, content3:result.content3, content4:result.content4, task1:result.task1, task2:result.task2, task3:result.task3, task4:result.task4, filename1: filename1, filename2: filename2, filename3: filename3, filename4: filename4});

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(output);
        res.end();
      }
    })
  }
  else
  if(path.substring(0,8) == "Advanced" && req.method=="POST") {//COURSES
    var number = Number(path.substring(8, path.length));
    db.collection('courses').findOne({"level":"Advanced", "number" : number}, function(err, result){ 
      if (err) {throw err}
      //const output = modulePage();
      if(result!=null) {
        const template = fs.readFileSync('./views/modules/GeneralModule.ejs', 'utf8');
        var filename1 = "../images/" + result.filename1 +".png";
        var filename2 = "../images/" + result.filename2 +".png";
        var filename3 = "../images/" + result.filename3 +".png";
        var filename4 = "../images/" + result.filename4 +".png";
        var nr = 0;
        if(result.level == "Beginner") nr=1;
        else if(result.level == "Intermediate") nr=2;
        else if(result.level == "Advanced") nr=3;
        var action = "/task" + nr+"_"+result.number;
        const output = ejs.render(template, {action:action,display: result.display, title1: result.title1, title2:result.title2, title3: result.title3, title4:result.title4, content1:result.content1, content2:result.content2, content3:result.content3, content4:result.content4, task1:result.task1, task2:result.task2, task3:result.task3, task4:result.task4, filename1: filename1, filename2: filename2, filename3: filename3, filename4: filename4});

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(output);
        res.end();
      }
    })
  }
  else
  if(path=="get_questions" && req.method=="GET"){//FACUT
    Questions.getNotAnsweredQuestions(res);
  }
  else
  if(path=="get_questions_and_answers" && req.method=="GET"){//FACUT
    Questions.getQuestions(res);
  }
  else
  if(path=="login_popup" && req.method=="POST"){//FACUT
    path="Proiect.html";
    file = __dirname + "/views/" + path;  
    var body = '';                       
    req.on('data', function (data) {
    body += data;
    if (body.length > 1e6)
      req.close();
    });

    req.on('end', async function (){
      await LoginUser(body, res)
      login=Number(localStorage.getItem("login"));
      admin=Number(localStorage.getItem("admin"));
      username=localStorage.getItem("username");
      response=localStorage.getItem("responseFromLogin")
    })
  }
  else
  if(path=="login_popup" && req.method=="GET"){//NIMIC
      if(response!=""){
        const objectToSend = {"response": response, "username":username};
        response="";
        const jsonContent = JSON.stringify(objectToSend);
        res.end(jsonContent);
      }
  }
  else
  if(path=="signup_popup" && req.method=="POST"){//FACUT
    path="Proiect.html";
    file = __dirname + "/" + path;
    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
            request.close();
    });

    req.on('end', async function () {
      await SignUpUser(body, res)
      response2=localStorage.getItem("responseFromSignUp");
      console.log(response2)
    });
  }
  else
  if(path=="signup_popup" && req.method=="GET"){//NIMIC
      if(response2!=""){
        const objectToSend = {"response": response2}
        response2="";
        const jsonContent = JSON.stringify(objectToSend);
        res.end(jsonContent);  
      }
  }
  else
  if(path=="logout" && req.method=="POST"){//NIMIC
      response="";
      response2="";
      admin = 0;
      username="";
      login=0;
      res.writeHead(302, { "Location": "http://" + 'localhost:1234' });
      res.end("success");
  }
  else
  if(path.substring(0,4)=="task" && req.method=="POST"){//FACUT
    const taskText=path;
    if(path.substring(0,5)=="task1")
      path="Beginner.html";
    else
      if(path.substring(0,5)=="task2")
        path="Intermediate.html";
      else
        path="Advanced.html";
    file = __dirname + "/views/" + path;
    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
            request.close();
    });
   
    req.on('end', async function () {
      await TaskUser(body, taskText, username, res)
    });

    res.writeHead(302, { "Location": "http://localhost:1234/"+path });
    res.end(response);
  }
  else
  if(path == "form_questions" && req.method=="POST" ) {//FACUT
    var body = '';

    if(username != "") {

      req.on('data', function (data) {
          body += data;
          if (body.length > 1e6)
              request.close();
      });

      req.on('end', async function () {
        await Questions.addQuestion(body, res, username)
      })
      
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
  if(path == "form_add_course" && req.method=="POST" ) {//COURSES
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
      var newpath1 =  __dirname + '/views/images/' + newName1;
      
      fs.copyFile(oldpath, newpath1, function (err) {
        if (err) throw err;
        else 
        {
          response2="File uploaded and moved!" + newpath1;
          console.log(response2);
        }
      });
      oldpath = files.filename2.filepath;
      var newName2 = Date.now().toString() + files.filename2.originalFilename;
      var newpath2 =  __dirname + '/views/images/' + newName2;
      
      fs.copyFile(oldpath, newpath2, function (err) {
        if (err) throw err;
        else 
        {
          response2="File uploaded and moved!" + newpath2;
          console.log(response2);
        }
      });

      oldpath = files.filename3.filepath;
      var newName3 = Date.now().toString() + files.filename3.originalFilename;
      var newpath3 =  __dirname + '/views/images/' + newName3;
      
      fs.copyFile(oldpath, newpath3, function (err) {
        if (err) throw err;
        else 
        {
          response2="File uploaded and moved!" + newpath3;
          console.log(response2);
        }
      });

      oldpath = files.filename4.filepath;
      var newName4 = Date.now().toString() + files.filename4.originalFilename;
      var newpath4 =  __dirname + '/views/images/' + newName4;
      
      fs.copyFile(oldpath, newpath4, function (err) {
        if (err) throw err;
        else 
        {
          response2="File uploaded and moved!" + newpath4;
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

      db.collection('courses').find({"level":level}).toArray(function(err, result) {
        if (err) {throw err}
        if(result!=null){
          var data = {
            "level" : level,
            "number" : result.length+1,
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
        
          db.collection('courses').insertOne(data, (err, collection) => {
            if(err){
                throw err;
            }
            response2="Recod Inserted Successfully";
            console.log(response2);
            res.writeHead(302, { "Location": "http://" + 'localhost:1234/Admin.html#form-add-course' });
            res.end(response2);
          });
        }
        });
      
      });
  }
  else
  if(path == "form_add_plant" && req.method=="POST" ) {//FACUT
    Plants.addDynamicPlant(req, res, __dirname)
  }
  else
  if(path == "form_answer_question" && req.method=="POST" ) {//FACUT
    
    var body = '';

    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
            request.close();
    });

    req.on('end', async function () {
      await Questions.answerTheQuestion(body, res)
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

function modulePage() {
  const template = fs.readFileSync('./views/modules/GeneralModule.ejs', 'utf8');
  return ejs.render(template, {display:"titluuuuuuu", title1:"aaa", title2:"bbb", title3: "ccc", title4:"dddd", content1:"abcd", content2:"abcd", content3:"abcd", content4:"abcd", task1:"task1", task2:"task2", task3:"task3", task4:"task4"});
}

server.listen(1234, "localhost", () => {
  console.log("Listening on port 1234");
});
