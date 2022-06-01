const Plant = require("../models/Plant");
var formidable = require('formidable');
const fs = require("fs");

async function plantsForSpecificLevel(path, res){
    if(path.slice(-8)=="Beginner"){
        await Plant.find({"level":"Beginner"}).then((plants)=>{
          if(plants!=null){
            res.end(JSON.stringify(plants));  
          }
          else{
            res.end(JSON.stringify("Eroare"));  
          }
        })
      }
      else
      if(path.slice(-12)=="Intermediate"){
        await Plant.find({"level":"Intermediate"}).then((plants)=>{
            if(plants!=null){
              res.end(JSON.stringify(plants));  
            }
            else{
              res.end(JSON.stringify("Eroare"));  
            }
          })
      }
      else{
        await Plant.find({"level":"Advanced"}).then((plants)=>{
            if(plants!=null){
              res.end(JSON.stringify(plants));  
            }
            else{
              res.end(JSON.stringify("Eroare"));  
            }
          })
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

module.exports = {
    plantsForSpecificLevel,
    addDynamicPlant,
 }
 