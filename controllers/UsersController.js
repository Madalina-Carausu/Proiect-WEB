const User = require("../models/User");
const qs = require('querystring');

async function getAllUsers(req, res){
    await User.find().then((users)=>{
        if(users!=null){
          res.end(JSON.stringify(users));  
        }
        else{
          res.end(JSON.stringify("Eroare"));  
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
            else
                await User.updateOne({"name" : username}, 
                {'$push' : {"plants":{ "image": image, "task1" : task1 , "task2" : task2 , "task3" : task3 }}})  
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

module.exports = {
    getAllUsers,
    addTasksForPlants, 
    findUserByName
 }
 