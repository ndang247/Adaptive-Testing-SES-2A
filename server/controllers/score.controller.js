import UserModel from '../models/user.js';
import TestModel from '../models/test.js';
import ScoreModel from '../models/score.js';
import QuestionModel from '../models/question.js';
import { validationResult } from 'express-validator';
import { DateTime } from 'luxon';

// Global variables for elo system
// Scale factor indicates how drastically it will increase/decrease
const defaultRating = 2000;
const userScaleFactor = 600;
const questionScaleFactor = 32;

// If variance in score drops below this value the test ends
const varianceThreshold = 20;

export const createScore = async (req, res) => {
    const { _id } = req.user;
    const { test_id } = req.params;

    console.log(req.user);

    try {
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
    const { _id } = req.user;
    const { test_id, question_id } = req.params;

    try {
        const question = await QuestionModel.findById(question_id);
        // Get the score based on test_id and user's id
        const score = await ScoreModel.findOne({ testId: test_id, userId: _id });

        let userRating = score.currentRating;
        let questionRating = question.rating;
        let response;

        // Check if question is correct and adjust performance accordingly
        if (question.correctAnswer === answer) {
            [userRating, questionRating] = increasePerformance(userRating, questionRating);
            response = "That was correct";
        }
        else {
            [userRating, questionRating] = decreasePerformance(userRating, questionRating);
            response = "That was incorrect";
        }

        // Update the current question's rating
        await QuestionModel.findByIdAndUpdate(question._id, {
            "$set": { "rating": questionRating }
        });

        // Update current score with the question as answered and the new performance
        await ScoreModel.findByIdAndUpdate(score._id, {
            "$set": { "currentRating": userRating },
            "$push": { "answeredQuestionIds": question._id, "progressiveRatings": userRating }
        });

        const nextQuestion = getOptimalQuestion(_id, test_id);

        res.json({ msg: response, nextQuestion });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

const getOptimalQuestion = async (userId, testId) => {
    try {
        const score = await ScoreModel.findOne({ testId, userId });
        const test = await TestModel.findById(testId);

        const ratings = score.progressiveRatings;

        // Check the variance threshold to see if a user's score can already be determined
        if (Math.variance(ratings) < varianceThreshold || ratings.length > 8) {
            // TODO: change response to something front-end can recognize
            return null;
            // res.json({ msg: 'Test has concluded' });
        }

        let nextQuestionId;

        // If this is the user's first question or they got the previous question wrong
        // Find the next easiest question closest to the user's rating
        if (ratings.length < 2 || ratings[ratings.length - 1] < ratings[ratings.length - 2]) {
            nextQuestionId = retrieveQuestionId(score, test, true);
        }
        else { // If they got the previous question correct find the next hardest question
            nextQuestionId = retrieveQuestionId(score, test, false);
        }

        if (nextQuestionId = -1) {
            // TODO: change response to something front-end can recognize
            return null;
            // res.json({ msg: 'Test has concluded' });
        }

        const nextQuestion = await QuestionModel.findById(nextQuestionId);

        return nextQuestion;
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

// Retrieve the closest question fitting a user's rating
// Cannot be a question they have previously answered
// Question will be lower than user rating if user got previous question wrong
async function retrieveQuestionId(score, test, makeEasier) {
    var smallestDifference = MAX_SAFE_INTEGER;
    var difference;
    var optimalQuestionId;

    test.questionIds.forEach(questionId => async () => {
        // Make sure the question is not previously answered
        const found = score.answeredQuestionIds.find(i => i === questionId);

        if (!found) {
            const question = await QuestionModel.findById(questionId);

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
                optimalQuestionId = questionId;
            }
        }
    });

    if (smallestDifference != MAX_SAFE_INTEGER) return optimalQuestionId;

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
    // TODO: Round the rating to whole number if needed
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
    // TODO: Round the rating to whole number if needed
    return [userRating, questionRating];
}