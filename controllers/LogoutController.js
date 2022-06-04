const User = require("../models/User");

async function logoutUser(cookie){
    await User.updateOne({name:cookie.substring(20, cookie.lenght)}, 
        {'$set' : {session : "", token:"" }});
}

module.exports = {
    logoutUser,
}