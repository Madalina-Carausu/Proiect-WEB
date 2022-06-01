const User = require("../models/User");
const qs = require('querystring');
const saltRounds = 10;
const bcrypt = require("bcrypt");

//post
function SignUpUser(req, res) {

    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6)
            req.connection.destroy();
    });

    req.on('end', async function () {
        var post = qs.parse(body);
        var name = post.uname;
        var password = post.psw;
        var phone=post.phone;

        const hashedPwd = await bcrypt.hash(password, saltRounds);

        var data = {
          "name": name,
          "password": hashedPwd,
          "phone": phone,
          "plants":[], 
          "tasks":[]
      }
      User.findOne({"name":data.name}).then((user)=> {
          if(user==null){ 
            var user1 = new User({ name: name, password: hashedPwd, phone: phone, plants: [], tasks: []});
            // save model to database
            user1.save(function (err, user) {
            if (err) return console.error(err);
                //res.writeHead(302, { "Location": "http://" + 'localhost:1234' });
                return "Recod Inserted Successfully";
            });
          }
          else
          {
              //console.log(user);
              //res.writeHead(302, { "Location": "http://" + 'localhost:1234' });
              return "Sign up failed!";
          }
      });
    });
    return "Sign up failed!";
}

module.exports = {
    SignUpUser,
  };