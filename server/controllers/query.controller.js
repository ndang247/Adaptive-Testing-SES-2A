import QueryModel from '../models/query.js';
import { validationResult } from 'express-validator';
import { DateTime } from 'luxon';

export const createQuery = async (req, res) => {

    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { fullName, email, query } = req.body;
        
    try {
        // Create new query
        const newQuery = new QueryModel({ 
            fullName,
            email,
            query,
            dateCreated: new Date()
        });
        
        // Post query to database
        await newQuery.save();

        res.json({ msg: 'Query sent' });

    } catch (error) {
        console.log(error);
    }
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