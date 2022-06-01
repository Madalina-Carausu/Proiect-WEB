const User = require("../models/User");
const qs = require('querystring');
const bcrypt = require("bcrypt");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const LoginUser = (req, res) => {
  var body = '';                       
  req.on('data', function (data) {
    body += data;
    if (body.length > 1e6)
      req.connection.destroy();
   });

  req.on('end', function () {
    var post = qs.parse(body);
    var name = post.name;
    var password = post.pswd;
      User.findOne({"name":name}).then((user)=>{
      if(user!=null){
        const cmp = bcrypt.compare(password, user.password);
        if(cmp){
          username=user.name;
          localStorage.setItem("login", 1);
          if(username=="admin")
            localStorage.setItem("admin", 1);
          else
            localStorage.setItem("admin", 0);
          response="Login succesfully!";
          localStorage.setItem("username", username)
          localStorage.setItem("responseFromLogin", response)
          console.log(response)
          res.writeHead(302, { "Location": "http://localhost:1234/Proiect_MyProfile.html" });
          res.end(response);
        }
        else{   
          localStorage.setItem("login", 0);
          localStorage.setItem("admin", 0);
          response="Login failed!";
          console.log(response)
          res.writeHead(302, { "Location": "http://localhost:1234" });
          res.end(response);
        }
      }
      else{
        localStorage.setItem("login", 0);
        localStorage.setItem("admin", 0);
        response="Login failed!";
        console.log(response)
        res.writeHead(302, { "Location": "http://localhost:1234" });
        res.end(response);
      }
    });
  })
}

module.exports = {
    LoginUser,
  };