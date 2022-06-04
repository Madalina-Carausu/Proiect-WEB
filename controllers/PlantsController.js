const Plant = require("../models/Plant");
var formidable = require('formidable');
const fs = require("fs");


function returnPlants(level){
  return Plant.find({"level":level}).then((plants)=> {return plants;})
}

async function getAllPlants(res){
  await Plant.find().then((plants)=>{
      if(plants!=null){
        console.log(plants)
        res.end(JSON.stringify(plants));  
      }
      else{
        res.end(JSON.stringify("Eroare"));  
      }
    })
}

async function plantsForSpecificLevel(path, res){
    if(path.slice(-8)=="beginner"){
      var plants=await returnPlants("Beginner");
          if(plants!=null){
            res.end(JSON.stringify(plants));  
          }
          else{
            res.end(JSON.stringify("Eroare"));  
          }
  
      }
      else
      if(path.slice(-12)=="intermediate"){
        var plants=await returnPlants("Intermediate");
            if(plants!=null){
              res.end(JSON.stringify(plants));  
            }
            else{
              res.end(JSON.stringify("Eroare"));  
            }
      }
      else{
        var plants=await returnPlants("Advanced");
            if(plants!=null){
              res.end(JSON.stringify(plants));  
            }
            else{
              res.end(JSON.stringify("Eroare"));  
            }
    }
}

async function addDynamicPlant(req, res, dirname){
    var form = new formidable.IncomingForm();
    await form.parse(req, async function (err, fields, files) {

        var oldpath = files.filename_plant.filepath;
        var newName = Date.now().toString() + files.filename_plant.originalFilename;
        var newpath =  dirname + '/views/images/' + newName;

        var response2="";
        await fs.copyFile(oldpath, newpath, function (err) {
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
        var plant1 = new Plant(data)
        await plant1.save(function (err) {
            if (err) return console.error(err);
            response2="Recod Inserted Successfully";
            console.log(response2);
            res.writeHead(302, { "Location": "http://" + 'localhost:1234/Admin.html#form-add-plant' });
            res.end(response2);
        });
    })
}

async function returnAddDynamicPlant(req, res, dirname){
  var form = new formidable.IncomingForm();
  await form.parse(req, async function (err, fields, files) {

      var oldpath = files.filename_plant.filepath;
      var newName = Date.now().toString() + files.filename_plant.originalFilename;
      var newpath =  dirname + '/views/images/' + newName;

      var response2="";
      await fs.copyFile(oldpath, newpath, function (err) {
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
      var plant1 = new Plant(data)
      await plant1.save(function (err) {
          if (err) return console.error(err);
          response2="Recod Inserted Successfully";
          res.end(JSON.stringify({"response" : response2}));
      });
  })
}
async function deletePlant(res, id){
  await Plant.deleteOne({"id":id});
  var jsonCourse = JSON.stringify({"message" : "Deleted successfully"})
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(jsonCourse);
  res.end();
}

module.exports = {
    plantsForSpecificLevel,
    addDynamicPlant,
    returnPlants,
    getAllPlants,
    returnAddDynamicPlant,
    deletePlant,
 }
 