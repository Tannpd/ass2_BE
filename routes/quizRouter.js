const express = require('express');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

const router = express.Router();

// Create a new quiz(done)
router.post('/quizzes', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all quizzes (populate questions)(done)
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questions');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single quiz by ID(done)
router.get('/quizzes/:quizId', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate('questions');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a quiz by ID(done)
router.put('/quizzes/:quizId', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.quizId, req.body, { new: true });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a quiz by ID(done)
router.delete('/quizzes/:quizId', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get quizzes with questions that contain the word "capital"(done)
router.get('/quizzes/:quizId/populate', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate({
      path: 'questions',
      match: { keywords: { $in: ['capital'] } }
    });

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a single question to a quiz(done)
router.post('/quizzes/:quizId/question', async (req, res) => {
  try {
    const { text, options, keywords, correctAnswerIndex } = req.body;
    const question = new Question({ text, options, keywords, correctAnswerIndex });
    await question.save();

    const quiz = await Quiz.findByIdAndUpdate(req.params.quizId, { $push: { questions: question._id } }, { new: true }).populate('questions');

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



module.exports = router;
