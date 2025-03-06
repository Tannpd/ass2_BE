const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  keywords: [{ type: String }],
  correctAnswerIndex: { type: Number, required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);
