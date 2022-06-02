//mongodb://localhost:27017
//Create a server that can send back static files
const http = require("http");
const url = require("url");
const fs = require("fs");
const mongoose = require("mongoose");

var SignUpUser = require("./controllers/SignUpController");
var LoginUser = require("./controllers/LoginController");
var TaskUser = require("./controllers/TaskController");
var Users = require("./controllers/UsersController");
var Plants = require("./controllers/PlantsController");
var Questions = require("./controllers/QuestionsController")
var Course = require("./controllers/CoursesController")

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

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
  let parsedURL = url.parse(req.url, true);

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
  if(path=="ranking"&&req.method=="GET"){
    Users.getAllUsers(req, res);
  }
  else
  if(path.substring(0, 6)=="plant_"&&req.method=="POST"){
    
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
  if(path.substring(0, 6)=="Plants"){
    Plants.plantsForSpecificLevel(path, res)
  }
  else
  if(path.slice(-9)=="get_login")
  {
    const objectToSend = {"response": login, "username":username};
    const jsonContent = JSON.stringify(objectToSend);
    res.end(jsonContent);

  }
  else
  if(path.slice(-9)=="get_admin")
  {
    const objectToSend = {"response": admin};
    const jsonContent = JSON.stringify(objectToSend);
    res.end(jsonContent);
  }
  else
  if(path.slice(-26)=="username-database-response"){
    Users.findUserByName(username, res)
  }
  else
  if(path=="Advanced-response"){
    Course.allCoursesFromAdvanced(res)
  }
  else
  if(path=="Intermediate-response"){
    Course.allCoursesFromIntermediate(res)
  }
  else
  if(path=="Beginner-response")
  {
    Course.allCoursesFromBeginner(res)
  }
  else
  if(path.substring(0,8) == "Beginner" && req.method=="POST") {
    var number = Number(path.substring(8, path.length));
    Course.specificDynamicCourseFromBeginner(res, number)
  }
  else
  if(path.substring(0,12) == "Intermediate" && req.method=="POST") {
    var number = Number(path.substring(12, path.length));
    Course.specificDynamicCourseFromIntermediate(res, number)
  }
  else
  if(path.substring(0,8) == "Advanced" && req.method=="POST") {
    var number = Number(path.substring(8, path.length));
    Course.specificDynamicCourseFromAdvanced(res, number)
  }
  else
  if(path=="get_questions" && req.method=="GET"){
    Questions.getNotAnsweredQuestions(res);
  }
  else
  if(path=="get_questions_and_answers" && req.method=="GET"){
    Questions.getQuestions(res);
  }
  else
  if(path=="login_popup" && req.method=="POST"){
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
      await SignUpUser(body, res)
      response2=localStorage.getItem("responseFromSignUp");
      console.log(response2)
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
      response="";
      response2="";
      admin = 0;
      username="";
      login=0;
      res.writeHead(302, { "Location": "http://" + 'localhost:1234' });
      res.end("success");
  }
  else
  if(path.substring(0,4)=="task" && req.method=="POST"){
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
  if(path == "form_questions" && req.method=="POST" ) {
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
  if(path == "form_add_course" && req.method=="POST" ) {
    Course.addDynamicCourse(req, res, __dirname)
  }
  else
  if(path == "form_add_plant" && req.method=="POST" ) {
    Plants.addDynamicPlant(req, res, __dirname)
  }
  else
  if(path == "form_answer_question" && req.method=="POST" ) {
    
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
  fs.readFile(file, function(err, content) {
    if (err) {
      console.log(`File Not Found ${file}`);
      res.writeHead(404);
      res.end();
    } else {
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

/*function modulePage() {
  const template = fs.readFileSync('./views/modules/GeneralModule.ejs', 'utf8');
  return ejs.render(template, {display:"titluuuuuuu", title1:"aaa", title2:"bbb", title3: "ccc", title4:"dddd", content1:"abcd", content2:"abcd", content3:"abcd", content4:"abcd", task1:"task1", task2:"task2", task3:"task3", task4:"task4"});
}*/

server.listen(1234, "localhost", () => {
  console.log("Listening on port 1234");
});
