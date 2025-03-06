const express = require('express');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

const router = express.Router();

// Add multiple questions to a quiz (done)
router.post('/quizzes/:quizId/questions', async (req, res) => {
  try {
    const questions = await Question.insertMany(req.body.questions);
    const questionIds = questions.map(q => q._id);

    const quiz = await Quiz.findByIdAndUpdate(req.params.quizId, { $push: { questions: { $each: questionIds } } }, { new: true }).populate('questions');

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new question
router.post('/questions', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({question});
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

// Get all questions(done)
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single question by ID(done)
router.get('/questions/:idquestion', async (req, res) => {
  try {
    const question = await Question.findById(req.params.idquestion);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a question by ID(done)
router.put('/questions/:idquestion', async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.idquestion,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a question by ID(done)
router.delete('/questions/:idquestion', async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.idquestion);
    if (!deletedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all questions(done)
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single question by ID(done)
router.get('/question/:idquestion', async (req, res) => {
  try {
    const question = await Question.findById(req.params.idquestion);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a question by ID(done)
router.put('/question/:idquestion', async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.idquestion,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a question by ID(done)
router.delete('/question/:idquestion', async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.idquestion);
    if (!deletedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
