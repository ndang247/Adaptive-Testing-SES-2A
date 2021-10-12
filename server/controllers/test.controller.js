import UserModel from '../models/user.js';
import TestModel from '../models/test.js';
import ScoreModel from '../models/score.js';
import QuestionModel from '../models/question.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { DateTime } from 'luxon';
import dotenv from 'dotenv';
import question from '../models/question.js';
import { createQuestion } from './question.controller.js';

dotenv.config();

// Global variables for elo system
// Scale factor indicates how drastically it will increase/decrease
const defaultRating = 2000;
const userScaleFactor = 384;
const questionScaleFactor = 32;

const varianceThreshold = 20; //If variance in score drops below this value the test ends

export const createTest = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const {
        creatorId,
        title,
        questions,
        expiryDate,
        contentType
    } = req.body;

    const questionIds = await createQuestion(questions);

    const newTest = new TestModel({
        creatorId,
        title,
        questionIds,
        dateCreated: new Date(),
        expiryDate,
        scoreIds: [],
        contentType
    });

    try {
        await newTest.save();

        res.status(201).json(newTest);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}


export const validatePin = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { pin } = req.body;
    try {
        // Find one test based on ID in req parameters
        const test = await TestModel.findOne({ test: pin });

        if (!test) return res.status(400).json({ msg: 'Test not found' });

        // If pin is not match throw error
        if (test._id != pin) {
            return res.status(401).json({ msg: 'Invalid pin' });
        }

        // TODO: Return true/false or positive message as front-end changes
        // Return test if valid
        res.json(test);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const createScore = async (req, res) => {
    //Retrieve the current user id from the header for the user id field
    const decoded = jwt.verify(req.header('authorization').split(" ")[1], process.env.JWT_SECRET_TOKEN);

    const userId = decoded?.user._id;

    const test = await TestModel.findById(req.params.test_id);

    const currentRating = defaultRating;

    try {
        // Initialize a score instance
        const score = new ScoreModel({
            testId: req.params.test_id,
            userId: userId,
            title: test.title,
            currentRating,
            progressiveRatings: [currentRating],
            answeredQuestionIds: [],
            dateCreated: DateTime.now()
        });

        await score.save();

        // Add the score id to it's corresponding user and test models
        await UserModel.findByIdAndUpdate(userId, {
            "$push": { "scoreIds": score._id }
        });

        await TestModel.findByIdAndUpdate(req.params.test_id, {
            "$push": { "scoreIds": score._id }
        });

        res.json({ msg: 'Score Created' });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const updateScore = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { answer } = req.body;

    const decoded = jwt.verify(req.header('authorization').split(" ")[1], process.env.JWT_SECRET_TOKEN);

    const userId = decoded?.user._id;

    const testId = req.params.test_id;

    const question = await QuestionModel.findById(req.params.question_id);

    try {
        // Grab current user and question ratings
        let score = await ScoreModel.findOne({ testId: testId, userId: userId });

        let userRating = score.currentRating;
        let questionRating = question.rating;
        let questionResponse;

        // Check if question is correct and adjust performance accordingly
        if (question.correctAnswer == answer) {
            [userRating, questionRating] = increasePerformance(userRating, questionRating);
            questionResponse = "That was correct";
        }
        else {
            [userRating, questionRating] = decreasePerformance(userRating, questionRating);
            questionResponse = "That was incorrect";
        }

        // Update the current question
        await QuestionModel.findByIdAndUpdate({ _id: req.params.question_id }, {
            "$set": { "rating": questionRating }
        });

        // Update current score with the question as answered and the new performance
        await ScoreModel.findOneAndUpdate({ testId: testId, userId: userId }, {
            "$set": { "currentRating": userRating },
            "$push": { "answeredQuestionIds": question._id, "progressiveRatings": userRating },
        }, { "new": true, "upsert": true });

        res.json({ msg: questionResponse });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const getOptimalQuestion = async (req, res) => {
    const decoded = jwt.verify(req.header('authorization').split(" ")[1], process.env.JWT_SECRET_TOKEN);

    const userId = decoded?.user._id;

    const testId = req.params.test_id;

    try {

        // Determine if the user got their previous question right/wrong
        const score = await ScoreModel.findOne({ testId: testId, userId: userId });

        const test = await TestModel.findById(testId);

        const ratings = score.progressiveRatings;

        // Check the variance threshold to see if a user's score can already be determined
        if(Math.variance(ratings) < varianceThreshold){
            // TODO change response to something front-end can recognize
            res.json({ msg: 'Test has concluded' });
        }

        var nextQuestionId;

        // If this is the user's first question or they got the previous question wrong
        // Find the next easiest question closest to the user's rating
        if (ratings.length < 2 || ratings[ratings.length - 1] < ratings[ratings.length - 2]) {
            nextQuestionId = retrieveQuestion(score, test, true);
        }
        else { // If they got the previous question correct find the next hardest question
            nextQuestionId = retrieveQuestion(score, test, false);
        }


        if (nextQuestionId = -1) {
            // TODO change response to something front-end can recognize
            res.json({ msg: 'Test has concluded' });
        }

        const nextQuestion = await QuestionModel.findById(nextQuestionId);

        res.json(nextQuestion);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

// Increase the performance of a user and decrease the difficulty of a question 
function increasePerformance(userRating, questionRating) {
    let positiveTransform = 10 ** (userRating / 400);
    let negativeTransform = 10 ** (questionRating / 400);

    let positiveScaleFactor = positiveTransform / (positiveTransform + negativeTransform);
    let negativeScaleFactor = negativeTransform / (positiveTransform + negativeTransform);

    userRating = userRating + userScaleFactor * (1 - positiveScaleFactor);
    questionRating = questionRating + questionScaleFactor * (0 - negativeScaleFactor);

    return [userRating, questionRating];
}

// Decrease the performance of a user and decrease the difficulty of a question
function decreasePerformance(userRating, questionRating) {
    let positiveTransform = 10 ** (userRating / 400);
    let negativeTransform = 10 ** (questionRating / 400);

    let positiveScaleFactor = positiveTransform / (positiveTransform + negativeTransform);
    let negativeScaleFactor = negativeTransform / (positiveTransform + negativeTransform);

    userRating = userRating + userScaleFactor * (0 - positiveScaleFactor);
    questionRating = questionRating + questionScaleFactor * (1 - negativeScaleFactor);

    return [userRating, questionRating];
}

// Retrieve the closest question fitting a user's rating
// Cannot be a question they have previously answered
// Question will be lower than user rating if user got previous question wrong
async function retrieveQuestion(score, test, makeEasier) {
    var smallestDifference = MAX_SAFE_INTEGER;
    var difference;
    var optimalQuestionId;

    test.questionIds.forEach(questionId => async () => {
        // Make sure the question is not previously answered
        const found = score.answeredQuestionIds.find(i => i = questionId);

        if (!found) {
            // const question = await QuestionModel.findById(questionId);

            // Calculate the difference between the proposed question and the user's current rating
            if (makeEasier && question.rating < score.currentRating) {
                difference = score.currentRating - question.rating;
            }
            else if (!makeEasier && question.rating > score.currentRating) {
                difference = question.rating - score.currentRating;
            }

            // Optimal question is one with the smallest absolute difference
            if (difference < smallestDifference) {
                smallestDifference = difference;
                optimalQuestionId = question._id;
            }
        }
    });

    if (smallestDifference != MAX_SAFE_INTEGER) {
        return optimalQuestionId;
    }

    // Return -1 if no question could be found - indicates test should end prematurely
    return -1;
}


