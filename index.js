const express = require('express');
const mongoose = require('mongoose');
const quizRouter = require('./routes/quizRouter');
const questionRouter = require('./routes/questionRouter');

require('dotenv').config();

const app = express();
app.use(express.json());

const db = require('./config/db')

//connect DB
db.connect()

app.use('/quizzes', quizRouter);
app.use('/questions', questionRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

