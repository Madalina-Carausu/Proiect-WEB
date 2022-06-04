const Question = require("../models/Question");
const qs = require('querystring');

function returnNotAnsweredQuestions(){
    return Question.find({"answer" : ""}).then((questions)=> {return questions;})
}

async function getNotAnsweredQuestions(res){
    var questions=await returnNotAnsweredQuestions();
        if(questions!=null){
          res.end(JSON.stringify(questions));  
        }
        else{
          res.end(JSON.stringify("Eroare"));  
        }
}

async function getQuestions(res){
    await Question.find({"answer" : {$ne: ""}}).then((questions)=>{
        if(questions!=null){
          res.end(JSON.stringify(questions));  
        }
        else{
          res.end(JSON.stringify("Eroare"));  
        }
    })
}

async function getAllQuestions(res){
    await Question.find().then((questions)=>{
        if(questions!=null){
          res.end(JSON.stringify(questions));  
        }
        else{
          res.end(JSON.stringify("Eroare"));  
        }
    })
}

async function addQuestion(body, res, username){
    var post = qs.parse(body);
    var question = post.question;
    var data = {
        "question": question,
        "username": username,
        "answer" : ""
    }
    var question1 = new Question(data);
    await question1.save(function (err) {
        if (err) return console.error(err);
        response2="Recod Inserted Successfully";
        console.log(response2);
        res.writeHead(302, { "Location": "http://" + 'localhost:1234/QA.html' });
        res.end(response2);
    });
}

async function answerTheQuestion(body, res){
    var response2="";
    var post = qs.parse(body);
    var questionAndFrom = post.chosen_question;
    var answer = post.answer;
    var question = questionAndFrom.slice(0, questionAndFrom.search(" ---"));
    var user = questionAndFrom.slice(questionAndFrom.search("FROM")+5, questionAndFrom.length);
    await Question.findOne({"question":question, "username" : user}).then( async (question)=> {
        if(question!=null){
            await Question.updateOne({"question":question.question, "username" : user}, 
            {'$set' : {"answer" : answer }});
            response2="Record Inserted Successfully";
            console.log(response2);
            res.writeHead(302, { "Location": "http://localhost:1234/Admin.html#form-answer-question" });
            res.end(response2);
        }
    });
}
async function returnAnswerTheQuestion(body, res){
    var response2="";
    var post = qs.parse(body);
    var questionAndFrom = post.chosen_question;
    var answer = post.answer;
    var question = questionAndFrom.slice(0, questionAndFrom.search(" ---"));
    var user = questionAndFrom.slice(questionAndFrom.search("FROM")+5, questionAndFrom.length);
    await Question.findOne({"question":question, "username" : user}).then( async (question)=> {
        if(question!=null){
            await Question.updateOne({"question":question.question, "username" : user}, 
            {'$set' : {"answer" : answer }});
            response2="Record Inserted Successfully";
            res.end(JSON.stringify("response","Successfully answered!"));  

        }
    });
}
async function deleteQuestion(res, id){
    await Question.deleteOne({"id":id});
    var jsonCourse = JSON.stringify({"message" : "Deleted successfully"})
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(jsonCourse);
    res.end();
  }

module.exports = {
    getAllQuestions,
    getNotAnsweredQuestions,
    getQuestions,
    addQuestion,
    answerTheQuestion,
    returnAnswerTheQuestion,
    deleteQuestion,
 }
 