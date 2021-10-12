import QuestionModel from '../models/question.js';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import { Easy, Expert, Hard, Intermediate, Master } from '../constants/difficulties.js';

dotenv.config();

export const createQuestion = async (questions) => {
    let questionIds = [];

    for (const question of questions) {
        const {
            category,
            content,
            rating,
            correctAnswer,
            wrongA,
            wrongB,
            wrongC,
        } = question;

        let difficulty = '';
        rating *= 40;
        
        if (inRange(rating, 0, 19)) difficulty = Easy;
        else if (inRange(rating, 20, 39)) difficulty = Intermediate;
        else if (inRange(rating, 40, 59)) difficulty = Hard;
        else if (inRange(rating, 60, 79)) difficulty = Expert;
        else if (inRange(rating, 80, 100)) difficulty = Master;

        const newQuestion = new QuestionModel({
            category,
            content,
            rating,
            difficulty,
            correctAnswer,
            wrongAnswers: [wrongA, wrongB, wrongC]
        });

        try {
            await newQuestion.save();

            const question = await QuestionModel.findOne().sort({ _id: -1 });
            questionIds.push(question._id);
        } catch (error) {
            console.log(error);
        }
    }

    return questionIds;
}

export const updateQuestion = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { category, content, rating, difficulty, correctAnswer, wrongAnswers } = req.body;

    const questionId = req.params.question_id;

    // Validate wrong answers
    if (wrongAnswers.length != 3) {
        return res.status(401).send('Three wrong answers required');
    }

    try {
        // Update the current question
        const found = await QuestionModel.findByIdAndUpdate(questionId, {
            "$set": {
                "category": category,
                "content": content,
                "rating": rating,
                "difficulty": difficulty,
                "correctAnswer": correctAnswer,
                "wrongAnswers": wrongAnswers
            }
        });

        // Validate question ID
        if (!found) {
            res.json({ msg: 'Question not found' });
        }
        else {
            res.json({ msg: 'Question updated' });
        }


    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const getQuestion = async (req, res) => {
    try {
        // Find one question based on ID in req parameters
        const question = await QuestionModel.findOne({ test: req.params.question_id });

        if (!question) {
            return res.status(400).json({ msg: 'Question not found' });
        }

        res.json(question);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const getRandomAnswers = async (req, res) => {
    try {
        // Find one question based on ID in req parameters
        const question = await QuestionModel.findOne({ test: req.params.question_id });

        if (!question) {
            return res.status(400).json({ msg: 'Question not found' });
        }

        // Create array containing answers
        var answers = [question.correctAnswer, question.wrongAnswers[0], question.wrongAnswers[1], question.wrongAnswers[2]];

        // Randomly arrange answers
        await shuffle(answers);

        res.json(answers);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

// Function to randomly sort an array
function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle
    while (currentIndex != 0) {

        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function inRange(x, min, max) {
    return ((x - min) * (x - max) <= 0);
}