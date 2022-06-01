const User = require("../models/User");
const qs = require('querystring');
const saltRounds = 10;
const bcrypt = require("bcrypt");

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

//post
module.exports = async function(body, res){
    var post = qs.parse(body);
    var name = post.uname;
    var password = post.psw;
    var email=post.email;
    var phone=post.phone;

    const hashedPwd = await bcrypt.hash(password, saltRounds);

    var data = {
        "name": name,
        "password": hashedPwd,
        "email": email,
        "phone": phone,
        "plants":[], 
        "tasks":[],
    }
    await User.findOne({"name":data.name}).then( async (user) => {
        console.log("ina user.find one")
        if(user==null){
            var user1 = new User({ name: name, password: hashedPwd, phone: phone, plants: [], tasks: []});
            await user1.save(function (err, user) {
                if (err) return console.error(err);
                localStorage.setItem("responseFromSignUp", "Recod Inserted Successfully!");
                res.writeHead(302, { "Location": "http://localhost:1234" });
                res.end("Recod Inserted Successfully!")
            });
        }
        else
        {
            localStorage.setItem("responseFromSignUp", "Sign up failed!");
            res.writeHead(302, { "Location": "http://localhost:1234" });
            res.end("Sign up failed!");
        }
    });
}