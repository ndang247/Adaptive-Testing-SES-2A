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

        if (inRange(rating, 0, 19)) difficulty = Easy;
        else if (inRange(rating, 20, 39)) difficulty = Intermediate;
        else if (inRange(rating, 40, 59)) difficulty = Hard;
        else if (inRange(rating, 60, 79)) difficulty = Expert;
        else if (inRange(rating, 80, 100)) difficulty = Master;

        // Cannot assign a const rating
        const scaledRating = rating * 40;

        const newQuestion = new QuestionModel({
            category,
            content,
            rating: scaledRating,
            difficulty,
            correctAnswer,
            answers: [correctAnswer, wrongA, wrongB, wrongC]
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

    const {
        category,
        content,
        rating,
        difficulty,
        correctAnswer,
        answers
    } = req.body;

    const { question_id } = req.params;

    // Validate wrong answers
    if (answers.length != 4) return res.status(401).send('Four answers required!');

    if (!mongoose.Types.ObjectId.isValid(question_id)) return res.status(404).send(`No question existed with that id: ${question_id}`);

    try {
        // Update the current question
        const found = await QuestionModel.findByIdAndUpdate(question_id, {
            "$set": {
                "category": category,
                "content": content,
                "rating": rating,
                "difficulty": difficulty,
                "correctAnswer": correctAnswer,
                "answers": answers
            }
        }, { new: true });

        // Validate question ID
        if (!found) res.json({ msg: 'Question not found' });
        else res.json({ msg: 'Question updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const getQuestionById = async (req, res) => {
    const { question_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(question_id)) return res.status(404).send(`No question existed with that id: ${question_id}`);

    try {
        // Find one question based on ID in req parameters
        const question = await QuestionModel.findById(question_id);

        if (!question) return res.status(400).json({ msg: 'Question not found' });

        res.json(question);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

// Function to randomly sort an array
export const shuffle = (array) => {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle
    while (currentIndex != 0) {

        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function inRange(x, min, max) {
    return ((x - min) * (x - max) <= 0);
}