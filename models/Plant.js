const mongoose = require("mongoose");
const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  task1: {
    type: String,
    required: true,
  },
  task2: {
    type: String,
    required: true,
  },
  task3: {     
   type: String,  
   required: true,  
   },
  level: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const Plant = mongoose.model("plants", PlantSchema);
module.exports = Plant;