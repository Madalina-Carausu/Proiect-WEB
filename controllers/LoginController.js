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
    if(cmp){
      const username=name;
      localStorage.setItem("login", "1");
      if(username=="admin")
        localStorage.setItem("admin", "1");
      else
        localStorage.setItem("admin", "0");
      response="Login succesfully!";
      
      localStorage.setItem("username", username)
      localStorage.setItem("responseFromLogin", response)
      console.log(response)
      
      //const session="sesstion_id="+Math.random().toString(36).substring(2,20)+";  HttpOnly, Secure'";
      //res.setHeader('Set-Cookie',session);
      res.writeHead(302, { "Location": "http://localhost:1234/Proiect_MyProfile.html" });
      res.end(response);
    }
    else{   
      
      localStorage.setItem("login", "0");
      localStorage.setItem("admin", "0");
      response="Login failed!";
      localStorage.setItem("responseFromLogin", response)
      console.log(response)
      res.writeHead(302, { "Location": "http://localhost:1234" });
      res.end(response);
    }
}

module.exports = {
  findUserAndComparePassword,
  loginUser
}