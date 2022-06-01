const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  answer: {
    type: String,
  },
});
const Question = mongoose.model("questions", QuestionSchema);
module.exports = Question;