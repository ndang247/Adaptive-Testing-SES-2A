import UserModel from '../models/user.js';
import TestModel from '../models/test.js';
import ScoreModel from '../models/score.js';
import QuestionModel from '../models/question.js';
import { validationResult } from 'express-validator';
import { DateTime } from 'luxon';
import { inRange } from './question.controller.js';
import { Easy, Expert, Hard, Intermediate, Master } from '../constants/difficulties.js';

// Global variables for elo system
// Scale factor indicates how drastically it will increase/decrease
const defaultRating = 2000;
const userScaleFactor = 600;
const questionScaleFactor = 32;

// If score drops below easyRatingThreshold or above masterRatingThreshold the test ends
const easyRatingThreshold = 950;
const masterRatingThreshold = 3150;

export const createScore = async (_id, test_id) => {
    try {
        const existingScore = await ScoreModel.findOne({ testId: test_id, userId: _id });
        if (!existingScore) {
            const score = new ScoreModel({
                testId: test_id,
                userId: _id,
                currentRating: defaultRating,
                progressiveRatings: [defaultRating],
                answeredQuestionIds: [],
                dateCreated: DateTime.now()
            });

            await score.save();

            // Add the score id to it's corresponding user and test models
            await UserModel.findByIdAndUpdate(_id, {
                "$push": { "scoreIds": score._id }
            });

            await TestModel.findByIdAndUpdate(test_id, {
                "$push": { "scoreIds": score._id }
            });
        }

        const nextQuestion = await getOptimalQuestion(_id, test_id);

        return nextQuestion;
        // res.json(nextQuestion);
    } catch (error) {
        console.error(error);
        // return res.status(500).send('Server Error');
    }
}

export const updateScore = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { answer } = req.body;
    const { _id } = req.user;
    const { test_id, question_id } = req.params;
    // console.log(req.body);
    try {
        const test = await TestModel.findById(test_id);
        const question = await QuestionModel.findById(question_id);
        // Get the score based on test_id and user's id
        const score = await ScoreModel.findOne({ testId: test_id, userId: _id });

        let userRating = score.currentRating;
        let questionRating = question.rating;
        let response, difficulty = '';

        // Check if question is correct and adjust performance accordingly
        if (question.correctAnswer === answer) {
            [userRating, questionRating] = increasePerformance(userRating, questionRating);
            response = "That was correct";
            console.log(response);
        }
        else {
            [userRating, questionRating] = decreasePerformance(userRating, questionRating);
            response = "That was incorrect";
            console.log(response);
        }

        if (inRange(Math.round(questionRating / 40), 1, 19)) difficulty = Easy;
        else if (inRange(Math.round(questionRating / 40), 20, 39)) difficulty = Intermediate;
        else if (inRange(Math.round(questionRating / 40), 40, 59)) difficulty = Hard;
        else if (inRange(Math.round(questionRating / 40), 60, 79)) difficulty = Expert;
        else if (inRange(Math.round(questionRating / 40), 80, 100)) difficulty = Master;

        // Update the current question's rating
        await QuestionModel.findByIdAndUpdate(question_id, {
            "$set": { "rating": questionRating, "difficulty": difficulty }
        });

        // Update current score with the question as answered and the new performance
        await ScoreModel.findByIdAndUpdate(score._id, {
            "$set": { "currentRating": userRating },
            "$push": { "answeredQuestionIds": question_id, "progressiveRatings": userRating }
        });

        const nextQuestion = await getOptimalQuestion(_id, test_id);

        res.json({ msg: response, nextQuestion, test });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

const getOptimalQuestion = async (userId, testId) => {
    try {
        const score = await ScoreModel.findOne({ testId, userId });
        const test = await TestModel.findById(testId);

        const currentUserRating = score.currentRating;
        const ratings = score.progressiveRatings;

        // Check the variance threshold to see if a user's score can already be determined
        if (currentUserRating < easyRatingThreshold || currentUserRating > masterRatingThreshold || ratings.length > 15) {
            // TODO: change response to something front-end can recognize
            return null;
            // res.json({ msg: 'Test has concluded' });
        }

        let nextQuestionId;

        // If this is the user's first question or they got the previous question wrong
        // Find the next easiest question closest to the user's rating
        if (ratings.length < 2 || ratings[ratings.length - 1] < ratings[ratings.length - 2]) {
            nextQuestionId = await retrieveQuestionId(score, test, true);
        }
        else { // If they got the previous question correct find the next hardest question
            nextQuestionId = await retrieveQuestionId(score, test, false);
        }

        if (nextQuestionId === -1) {
            // TODO: change response to something front-end can recognize
            return null;
            // res.json({ msg: 'Test has concluded' });
        }

        const nextQuestion = await QuestionModel.findById(nextQuestionId);

        return nextQuestion;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Retrieve the closest question fitting a user's rating
// Cannot be a question they have previously answered
// Question will be lower than user rating if user got previous question wrong
async function retrieveQuestionId(score, test, makeEasier) {
    let smallestDifference = Number.MAX_SAFE_INTEGER;
    let difference = 0;
    let optimalQuestionId;
    let bool = false;

    for (const questionId of test.questionIds) {
        // Make sure the question is not previously answered
        const found = score.answeredQuestionIds.find(i => String(i) === String(questionId));

        if (!found) {
            const question = await QuestionModel.findById(questionId);

            // Calculate the difference between the proposed question and the user's current rating
            if (makeEasier && question.rating <= score.currentRating) {
                bool = true;
                console.log(question.content + " at 174");
                difference = score.currentRating - question.rating;
            }
            else if (!makeEasier && question.rating >= score.currentRating) {
                bool = true;
                console.log(question.content + " at 179");
                difference = question.rating - score.currentRating;
            }

            // Optimal question is one with the smallest absolute difference
            if (difference < smallestDifference && bool) {
                console.log(question.content + " at 185");
                smallestDifference = difference;
                optimalQuestionId = questionId;
            }
        }
    }

    // For each array function is not async friendly -> see ref below
    // https://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript
    // test.questionIds.forEach(questionId => async () => { });

    if (smallestDifference !== Number.MAX_SAFE_INTEGER) return optimalQuestionId;

    // Return -1 if no question could be found -> indicates test should end prematurely
    return -1;
}

// Increase the performance of a user and decrease the difficulty of a question 
function increasePerformance(userRating, questionRating) {
    let positiveTransform = 10 ** (userRating / 400);
    let negativeTransform = 10 ** (questionRating / 400);

    let positiveScaleFactor = positiveTransform / (positiveTransform + negativeTransform);
    let negativeScaleFactor = negativeTransform / (positiveTransform + negativeTransform);

    userRating = userRating + userScaleFactor * (1 - positiveScaleFactor);
    questionRating = questionRating + questionScaleFactor * (0 - negativeScaleFactor);

    return [Math.round(userRating), Math.round(questionRating)];
}

// Decrease the performance of a user and decrease the difficulty of a question
function decreasePerformance(userRating, questionRating) {
    let positiveTransform = 10 ** (userRating / 400);
    let negativeTransform = 10 ** (questionRating / 400);

    let positiveScaleFactor = positiveTransform / (positiveTransform + negativeTransform);
    let negativeScaleFactor = negativeTransform / (positiveTransform + negativeTransform);

    userRating = userRating + userScaleFactor * (0 - positiveScaleFactor);
    questionRating = questionRating + questionScaleFactor * (1 - negativeScaleFactor);

    return [Math.round(userRating), Math.round(questionRating)];
}