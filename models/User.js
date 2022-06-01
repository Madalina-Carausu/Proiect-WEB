const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
 plants: {     
   type: Array,    
   },
  tasks: {
    type: Array,
  },
});
const User = mongoose.model("users", UserSchema);
module.exports = User;
//module.exports = {User};