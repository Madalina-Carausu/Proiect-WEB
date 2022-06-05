const User = require("../models/User");
const qs = require('querystring');
const saltRounds = 10;
const bcrypt = require("bcrypt");

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
function validateData(text){
    if(text!=undefined&&text!=null)
    for(let i =0;i<text.length;i++){
        if((text[i]>='a'&&text[i]<='z')||(text[i]>='A'&&text[i]<='Z')||(text[i]>='0'&&text[i]<='9')||text[i]=='!'||text[i]=='@'||text[i]=='.'||text[i]=="?"||text[i]=='#'||text[i]=='*');
        else
            return "Not correct!"
    }
    return "Correct!"
}

function validatePhoneNumber(phone){
    if(phone!=undefined&&phone!=null)
    for(let i =0;i<phone.length;i++){
        if(phone[i]>='0'&&phone[i]<='9');
        else
            return "Not correct!"
    }
    return "Correct!"
}
//post
module.exports = async function(body, res){
    var post = qs.parse(body);
    var name = post.uname;
    var password = post.psw;
    var email=post.email;
    
    var phone=post.phone;
    if(validateData(email)=="Correct!"&&validateData(name)=="Correct!"&&validateData(password)=="Correct!"&&validatePhoneNumber(phone)=="Correct!")
    {    
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
    else{
        localStorage.setItem("responseFromSignUp", "Sign up failed!");
        res.writeHead(302, { "Location": "http://localhost:1234" });
        res.end("Sign up failed!");
    }
}