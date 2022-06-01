const User = require("../models/User");
const qs = require('querystring');

module.exports = async function(body, taskText, username, res){
  var post = qs.parse(body);
  var task = post.task;
  let value=0;
  var task1=false;
  var task2=false;
  var task3=false;
  var task4=false;
  if(task!=null&&task!=undefined)
  {
    for(let i=0;i<task.length;i++){
      if(Number(task[i])==1)
        task1=true;
      else
      if(Number(task[i])==2)
        task2=true;
      else
      if(Number(task[i])==3)
        task3=true;
      else
      if(Number(task[i])==4)
        task4=true;
      value = value + 1;
    }
  }

  await User.findOne({"name":username, "tasks.task":taskText}).then(async (user)=> {
      if(user!=null){
        await User.updateOne({"name" : username, "tasks.task":taskText}, 
          {'$set' : {"tasks.$.task" : taskText, "tasks.$.value": value, "tasks.$.task1":task1,"tasks.$.task2": task2, "tasks.$.task3":task3, "tasks.$.task4":task4 }})  
      }
      else{
        await User.updateOne({"name" : username}, 
        {'$push' : {"tasks":{ "task": taskText, "value" : value, "task1":task1, "task2": task2, "task3":task3, "task4":task4 }}})  
      }
  }); 
}

 