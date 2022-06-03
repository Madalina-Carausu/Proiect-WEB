const User = require("../models/User");
const Plant = require("../models/Plant");
const qs = require('querystring');
const fs = require("fs");
const ws = fs.createWriteStream("data.csv");
const csvwriter = require('csv-writer')

const Vonage = require('@vonage/server-sdk');
const Course = require("../models/Course");
const { allCoursesFromAdvanced } = require("./CoursesController");

const vonage = new Vonage({
  apiKey: "a1b28e8a",
  apiSecret: "VgVXzEk3eoJ9DXfM"
})

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

async function findUserByName(username, res){
    await User.findOne({"name":username}).then((user)=>{
        if(user!=null){
          res.end(JSON.stringify(user));  
        }
        else{
          res.end(JSON.stringify("Eroare"));  
        }
    })
}

async function extractAllUsers(req, res){
    var users = await returnAllUsers();

  
var createCsvWriter = csvwriter.createObjectCsvWriter
  
// Passing the column names intp the module
const csvWriter = createCsvWriter({
  
  // Output csv file name is geek_data
  path: 'data.csv',
  header: [
  
    // Title of the columns (column_names)
    {id: 'id', title: 'ID'},
    {id: 'name', title: 'NAME'},
    {id: 'age', title: 'AGE'},
  ]
});
  
// Values for each column through an array
const results = [
  {
    id: '7058',
    name: 'Sravan Kumar Gottumukkala',
    age: 22
  }, {
    id: '7004',
    name: 'Sudheer',
    age: 29
  }, {
    id: '7059',
    name: 'Radha',
    age: 45
  },{
    id: '7060',
    name: 'vani',
    age: 34
  }
    
];

    csvWriter
  .writeRecords(results)
  .then(()=> console.log('Data uploaded into csv successfully'));

    res.writeHead(302, { "Location": "http://localhost:1234/Admin.html"});
    res.end();
}

module.exports = {
    getAllUsers,
    addTasksForPlants, 
    findUserByName,
    returnAllUsers,
    extractAllUsers,
    getFirstThreeUsers
 }
 