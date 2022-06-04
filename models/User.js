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
  session: {
    type: String,
  },
  token: {
    type: String,
  },
});
const User = mongoose.model("users", UserSchema);
module.exports = User;