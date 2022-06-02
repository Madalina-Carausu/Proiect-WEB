const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  display: {
    type: String,
    required: true,
  },
  maxPoints: {     
   type: Number,  
   required: true,  
   },
  title1: {
    type: String,
  },
  content1: {
    type: String,
  },
  filename1: {
    type: String,
  },
  title2: {
    type: String,
  },
  content2: {
    type: String,
  },
  filename2: {
    type: String,
  },
  title3: {
    type: String,
  },
  content3: {
    type: String,
  },
  filename3: {
    type: String,
  },
  title4: {
    type: String,
  },
  content4: {
    type: String,
  },
  filename4: {
    type: String,
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
  task4: {
    type: String,
    required: true,
  },
});
const Course = mongoose.model("courses", CourseSchema);
module.exports = Course;