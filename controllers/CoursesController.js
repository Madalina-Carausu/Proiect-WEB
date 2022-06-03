const Course = require("../models/Course");
const fs = require("fs");
var ejs = require('ejs');
var formidable = require('formidable');

async function allCoursesFromAdvanced(res){
    await Course.find({"level":"Advanced"}).then((courses)=>{
        if(courses!=null){
          res.end(JSON.stringify(courses));  
        }
        else{
          res.end(JSON.stringify("Eroare"));  
        }
      })
}

async function allCoursesFromIntermediate(res){
    await Course.find({"level":"Intermediate"}).then((courses)=>{
        if(courses!=null){
          res.end(JSON.stringify(courses));  
        }
        else{
          res.end(JSON.stringify("Eroare"));  
        }
      })
}

async function allCoursesFromBeginner(res){
    await Course.find({"level":"Beginner"}).then((courses)=>{
        if(courses!=null){
          res.end(JSON.stringify(courses));  
        }
        else{
          res.end(JSON.stringify("Eroare"));  
        }
      })
}

async function specificDynamicCourseFromBeginner(res, number){
    await Course.findOne({"level":"Beginner", "number" : number}).then((course)=>{
        if(course!=null) {
          const template = fs.readFileSync('./views/modules/GeneralModule.ejs', 'utf8');
          var nr=0;
          const filename1 = "../images/" + course.filename1 +".png";
          const filename2 = "../images/" + course.filename2 +".png";
          const filename3 = "../images/" + course.filename3 +".png";
          const filename4 = "../images/" + course.filename4 +".png";
          if(course.level == "Beginner") nr=1;
          else if(course.level == "Intermediate") nr=2;
          else if(course.level == "Advanced") nr=3;
          const action = "/task" + nr+"_"+course.number;
          const output = ejs.render(template, {action:action,display: course.display, title1: course.title1, title2:course.title2, 
            title3: course.title3, title4:course.title4, content1:course.content1, content2:course.content2, content3:course.content3, 
            content4:course.content4, task1:course.task1, task2:course.task2, task3:course.task3, task4:course.task4,
            filename1: filename1, filename2: filename2, filename3: filename3, filename4: filename4});
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(output);
          res.end();
        }
    })
}

async function specificDynamicCourseFromIntermediate(res, number){
    await Course.findOne({"level":"Intermediate", "number" : number}).then((course)=>{
        if(course!=null) {
          const template = fs.readFileSync('./views/modules/GeneralModule.ejs', 'utf8');
          var nr=0;
          const filename1 = "../images/" + course.filename1 +".png";
          const filename2 = "../images/" + course.filename2 +".png";
          const filename3 = "../images/" + course.filename3 +".png";
          const filename4 = "../images/" + course.filename4 +".png";
          if(course.level == "Beginner") nr=1;
          else if(course.level == "Intermediate") nr=2;
          else if(course.level == "Advanced") nr=3;
          const action = "/task" + nr+"_"+course.number;
          const output = ejs.render(template, {action:action,display: course.display, title1: course.title1, title2:course.title2, 
            title3: course.title3, title4:course.title4, content1:course.content1, content2:course.content2, content3:course.content3, 
            content4:course.content4, task1:course.task1, task2:course.task2, task3:course.task3, task4:course.task4,
            filename1: filename1, filename2: filename2, filename3: filename3, filename4: filename4});
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(output);
          res.end();
        }
    })
}

async function specificDynamicCourseFromAdvanced(res, number){
    await Course.findOne({"level":"Advanced", "number" : number}).then((course)=>{
        if(course!=null) {
          const template = fs.readFileSync('./views/modules/GeneralModule.ejs', 'utf8');
          var nr=0;
          const filename1 = "../images/" + course.filename1 +".png";
          const filename2 = "../images/" + course.filename2 +".png";
          const filename3 = "../images/" + course.filename3 +".png";
          const filename4 = "../images/" + course.filename4 +".png";
          if(course.level == "Beginner") nr=1;
          else if(course.level == "Intermediate") nr=2;
          else if(course.level == "Advanced") nr=3;
          const action = "/task" + nr+"_"+course.number;
          const output = ejs.render(template, {action:action,display: course.display, title1: course.title1, title2:course.title2, 
            title3: course.title3, title4:course.title4, content1:course.content1, content2:course.content2, content3:course.content3, 
            content4:course.content4, task1:course.task1, task2:course.task2, task3:course.task3, task4:course.task4,
            filename1: filename1, filename2: filename2, filename3: filename3, filename4: filename4});
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(output);
          res.end();
        }
    })
}

async function addDynamicCourse(req, res, dirname){//daca e aceeasi poza sa nu o mai adaug
    var form = new formidable.IncomingForm();
    await form.parse(req, async function (err, fields, files) {
        var oldpath = files.filename1.filepath;
        var response2="";
        var newName1 = Date.now().toString() + files.filename1.originalFilename.substring(0,files.filename1.originalFilename.length-4) + "1" +".png";
        var newpath1 =  dirname + '/views/images/' + newName1;
        await fs.copyFile(oldpath, newpath1, function (err) {
            if (err) throw err;
            else 
            {
                response2="File uploaded and moved!" + newpath1;
                console.log(response2);
            }
        });
        oldpath = files.filename2.filepath;
        var newName2 = Date.now().toString() + files.filename2.originalFilename.substring(0,files.filename2.originalFilename.length-4) + "2" +".png";
        var newpath2 =  dirname + '/views/images/' + newName2;
        await fs.copyFile(oldpath, newpath2, function (err) {
            if (err) throw err;
            else 
            {
                response2="File uploaded and moved!" + newpath2;
                console.log(response2);
            }
        });

        oldpath = files.filename3.filepath;
        var newName3 = Date.now().toString() + files.filename3.originalFilename.substring(0,files.filename3.originalFilename.length-4) + "3" +".png";
        var newpath3 =  dirname + '/views/images/' + newName3;
        await fs.copyFile(oldpath, newpath3, function (err) {
            if (err) throw err;
            else 
            {
                response2="File uploaded and moved!" + newpath3;
                console.log(response2);
            }
        });
        oldpath = files.filename4.filepath;
        var newName4 = Date.now().toString() + files.filename4.originalFilename.substring(0,files.filename4.originalFilename.length-4) + "4" +".png";
        var newpath4 =  dirname + '/views/images/' + newName4;
        await fs.copyFile(oldpath, newpath4, function (err) {
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
        await Course.find({"level":level}).then(async (course)=>{
            if(course!=null){
                var data = {
                "level" : level,
                "number" : course.length+1,
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
                var course1 = new Course(data)
                await course1.save(function (err) {
                    if (err) return console.error(err);
                    response2="Recod Inserted Successfully";
                    console.log(response2);
                    res.writeHead(302, { "Location": "http://" + 'localhost:1234/Admin.html#form-add-course' });
                    res.end(response2);
                });
            }
        });
    });
}

module.exports = {
    allCoursesFromAdvanced,
    allCoursesFromIntermediate,
    allCoursesFromBeginner,
    specificDynamicCourseFromBeginner,
    specificDynamicCourseFromIntermediate,
    specificDynamicCourseFromAdvanced,
    addDynamicCourse,
}
 