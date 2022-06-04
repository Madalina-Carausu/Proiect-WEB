const User = require("../models/User");
const Plant = require("../models/Plant");
const qs = require('querystring');
const csvwriter = require('csv-writer')

const Vonage = require('@vonage/server-sdk');
const Course = require("../models/Course");

const vonage = new Vonage({
  apiKey: "a1b28e8a",
  apiSecret: "VgVXzEk3eoJ9DXfM"
})

function findUserInDatabaseUsingCookie(cookie){
  var session=cookie.substring(0, 10)
  var token=cookie.substring(10, 20)
  var username=cookie.substring(20, cookie.length)
  return User.findOne({name:username, token:token, session:session}).then((user)=> {if(user) return "Find!"; else return "Not fined!"});
}

function returnAllUsers(){
    return User.find().then((users)=> {return users});
}

async function getAllUsers(req, res){
  var users = await returnAllUsers();
  if(users!=null){
    res.end(JSON.stringify(users));  
  }
  else{
    res.end(JSON.stringify("Eroare"));  
  }
}

async function getFirstThreeUsers(req, res, level){
  var length
  if(level==1)
    length = await Course.find({"level":"Beginner"}).then((courses)=>{ return courses.length})
  else
  if(level==2)
    length = await Course.find({"level":"Intermediate"}).then((courses)=>{ return courses.length})
  else
    length = await Course.find({"level":"Advanced"}).then((courses)=>{ return courses.length})
  await User.find().then((data)=>{
    if(data!=null&&data!=undefined){
      var name1="", name2="", name3="";
      var points1=0, points2=0, points3=0;
      for(let i=0;i<data.length;i++){
          var value=0;
          for(let j=0;j<data[i].tasks.length;j++){
              if(data[i].tasks[j].task.substring(0, 5)=="task"+level)
                  value=value+Number(data[i].tasks[j].value);
          }
          if(value!=0){
              value=((value*100)/(4*length)).toFixed(2);
              if(Number(value)>=Number(points1)){
                  points3=points2;
                  name3=name2;
                  points2=points1;
                  name2=name1;
                  points1=value;
                  name1=data[i].name;
              }
              else
              if(Number(value)>=Number(points2)){
                  points3=points2;
                  name3=name2;
                  points2=value;
                  name2=data[i].name;
              }
              else
              if(Number(value)>=Number(points3)){
                  points3=value;
                  name3=data[i].name;
              }
          } 
      }
      res.end(JSON.stringify({name1: name1, name2:name2, name3:name3, points1: points1, points2:points2, points3:points3 }));  
    }
  })
}

async function addTasksForPlants(body, res, image, username){
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
        await User.findOne({"name":username, "plants.image": image}).then( async (user)=>{
            if(user!=null){
                await User.updateOne({"name":username, "plants.image": image},  
                {'$set' : { "plants.$.task1" : task1 , "plants.$.task2" : task2 , "plants.$.task3" : task3 }})  
            }
            else{
                
                var display = await Plant.findOne({"image": image}).then((plant)=>{ return plant.name});
                var phone = await User.findOne({"name":username}).then((user)=>{return user.phone});
                const from = "Vonage APIs"
                const to = "4"+phone
                const text = 'Take care of your new plant -> '+display

                /*vonage.message.sendSms(from, to, text, (err, responseData) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if(responseData.messages[0]['status'] === "0") {
                            console.log("Message sent successfully.");
                        } else {
                            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                        }
                    }
                })*/

                await User.updateOne({"name" : username}, 
                {'$push' : {"plants":{ "image": image, "task1" : task1 , "task2" : task2 , "task3" : task3 }}})  
            }
        });
    }
    res.writeHead(302, { "Location": "http://localhost:1234/MyProfile.html"});
    res.end();
}

async function findUserByNameAndGetTasks(username, res){
    await User.findOne({"name":username}).then((user)=>{
        if(user!=null){
          var newUser = {"name":user.name, "tasks":user.tasks}
          res.end(JSON.stringify(newUser));  
        }
        else{
          res.end(JSON.stringify("Eroare"));  
        }
    })
}

async function findUserByNameAndGetTasksandPlants(username, res){
  await User.findOne({"name":username}).then((user)=>{
      if(user!=null){
        var newUser = {"name":user.name, "tasks":user.tasks, "plants":user.plants}
        res.end(JSON.stringify(newUser));  
      }
      else{
        res.end(JSON.stringify("Eroare"));  
      }
  })
}

async function extractAllUserPlants(res){
  var users = await returnAllUsers();
  var createCsvWriter = csvwriter.createObjectCsvWriter
    
  // Passing the column names intp the module
  const csvWriter = createCsvWriter({
    
    // Output csv file name is geek_data
    path: 'plants.csv',
    header: [
    
      // Title of the columns (column_names)
      {id: 'id', title: 'ID'},
      {id: 'name', title: 'NAME'},
      {id: 'plants', title: 'PLANTS'},
    ]
  });
    
  var results=[]
  for(let i =0 ; i<users.length;i++){
    var oneUserPlants=[]
    for(let j=0;j<users[i].plants.length;j++){
      oneUserPlants.push({image: users[i].plants[j].image})
    }
    const oneUser = {
      id: users[i].id,
      name: users[i].name,
      plants: JSON.stringify(oneUserPlants)
    }
    results.push(oneUser)
  }

    csvWriter
      .writeRecords(results)
      .then(()=> console.log('Data uploaded into csv successfully'));

    res.writeHead(302, { "Location": "http://localhost:1234/Admin.html#get-CSV"});
    res.end();
}

async function extractAllUserTasks(res){
  var users = await returnAllUsers();
  var createCsvWriter = csvwriter.createObjectCsvWriter
    
  // Passing the column names intp the module
  const csvWriter = createCsvWriter({
    
    // Output csv file name is geek_data
    path: 'tasks.csv',
    header: [
    
      // Title of the columns (column_names)
      {id: 'id', title: 'ID'},
      {id: 'name', title: 'NAME'},
      {id: 'tasks', title: 'TASKS'},
    ]
  });
    
  var results=[]
  for(let i =0 ; i<users.length;i++){
    var oneUserTasks=[]
    for(let j=0;j<users[i].tasks.length;j++){
      oneUserTasks.push({task: users[i].tasks[j].task})
    }
    const oneUser = {
      id: users[i].id,
      name: users[i].name,
      tasks: JSON.stringify(oneUserTasks)
    }
    results.push(oneUser)
  }

    csvWriter
      .writeRecords(results)
      .then(()=> console.log('Data uploaded into csv successfully'));

    res.writeHead(302, { "Location": "http://localhost:1234/Admin.html#get-CSV"});
    res.end();
}

async function extractAllUserNames(res){
  var users = await returnAllUsers();
  var createCsvWriter = csvwriter.createObjectCsvWriter
    
  // Passing the column names intp the module
  const csvWriter = createCsvWriter({
    
    // Output csv file name is geek_data
    path: 'names.csv',
    header: [
    
      // Title of the columns (column_names)
      {id: 'id', title: 'ID'},
      {id: 'name', title: 'NAME'},
    ]
  });
    
  var results=[]
  for(let i =0 ; i<users.length;i++){
    const oneUser = {
      id: users[i].id,
      name: users[i].name,
    }
    results.push(oneUser)
  }

    csvWriter
      .writeRecords(results)
      .then(()=> console.log('Data uploaded into csv successfully'));

    res.writeHead(302, { "Location": "http://localhost:1234/Admin.html#get-CSV"});
    res.end();
}

function findUserInDatabaseUsingCookie(cookie){
  var session=cookie.substring(0, 10)
  var token=cookie.substring(10, 20)
  var username=cookie.substring(20, cookie.length)
  return User.findOne({name:username, token:token, session:session}).then((user)=> {if(user) return "Find!"; else return "Not fined!"});
}

module.exports = {
    getAllUsers,
    addTasksForPlants, 
    findUserByNameAndGetTasks,
    returnAllUsers,
    extractAllUserPlants,
    extractAllUserTasks,
    getFirstThreeUsers,
    findUserInDatabaseUsingCookie,
    findUserByNameAndGetTasksandPlants,
    extractAllUserNames
 }
 