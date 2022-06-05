const User = require("../models/User");
const qs = require('querystring');
const bcrypt = require("bcrypt");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

async function findUserAndComparePassword(name, password){

  return await User.findOne({name: name}).then(async (user)=>{
    if(user!=null){
      const cmp = await bcrypt.compare(password, user.password);
      return cmp;
    }
    else
      return "Login failed!";
  })
}

async function loginUser(body, res){

  var post = qs.parse(body);
  var name = post.name;
  var password = post.pswd;
  const cmp = await findUserAndComparePassword(name, password)
    if(cmp==true){
      const username=name;
      response="Login succesfully!";
      var session = Math.random().toString(36).substring(2,12);
      var token = Math.random().toString(36).substring(2,12)
      const cookie=session+token+username;
      res.setHeader('Set-Cookie',"session="+cookie);
      console.log(response)
      await User.updateOne({name:username}, 
            {'$set' : {session : session, token:token }});
      res.writeHead(302, { "Location": "http://localhost:1234/Proiect_MyProfile.html" });
      res.end(response);
    }
    else{
      response="Login failed!";
      console.log(response)
      res.writeHead(302, { "Location": "http://localhost:1234/" });
      res.end(response);
    }
}

module.exports = {
  findUserAndComparePassword,
  loginUser
}