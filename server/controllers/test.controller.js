import TestModel from '../models/test.js';
import ScoreModel from '../models/score.js'
import QuestionModel from '../models/question.js'
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { DateTime } from 'luxon';
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

// Global variables for elo system

const defaultRating = 2000;
const userScaleFactor = 256;
const questionScaleFactor = 32;

export const createTest = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { title, expiryDate, testLength, contentType } = req.body;

    //Retrieve the current user id from the header for the creator field
    const decoded = jwt.verify(req.header('x-auth-token'), process.env.JWT_SECRET_TOKEN);

    const userId = decoded?.user._id;

    try {
        // Test instance with validated data
        const test = new TestModel({
            title,
            creatorId: userId,
            questionIds: [],
            dateCreated: DateTime.now(),
            expiryDate,
            testLength,
            scoreIds: [],
            contentType 
        });

        await test.save();
        res.json(test._id);
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
        const test = await TestModel.findOne({ test: pin })  
        
        if(!test){
            return res.status(400).json({ msg: 'Test not found' });
        }

        // If pin is not match throw error
        if (test._id != pin){
            return res.status(401).json({ msg: 'Invalid pin'})
        }

        //TODO: Return true/false or positive message as front-end changes
        //return test if valid
        res.json(test); 

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const createScore = async (req, res) => {

    //Retrieve the current user id from the header for the user id field
    const decoded = jwt.verify(req.header('x-auth-token'), process.env.JWT_SECRET_TOKEN);

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

    const decoded = jwt.verify(req.header('x-auth-token'), process.env.JWT_SECRET_TOKEN);

    const userId = decoded?.user._id;

    const testId = req.params.test_id;

    const question = await QuestionModel.findById(req.params.question_id);
    
    try { 
        
        // Grab current user and question ratings
        let score = await ScoreModel.findOne({testId: testId, userId: userId});

        let userRating = score.currentRating;
        let questionRating = question.rating;
        let questionResponse;

        // Check if question is correct and adjust performance accordingly
        if(question.correctAnswer == answer)
        {
            [userRating, questionRating] = increasePerformance(userRating, questionRating);
            questionResponse = "That was correct";
        }
        else
        {
            [userRating, questionRating] = decreasePerformance(userRating, questionRating);
            questionResponse = "That was incorrect";
        }
        
        //Update the current question
        await QuestionModel.findByIdAndUpdate({_id: req.params.question_id}, 
            { "$set": 
                { "rating": questionRating }}
        );

        // Update current score with the question as answered and the new performance
        
        await ScoreModel.findOneAndUpdate({testId: testId, userId: userId}, {   
            "$set": { "currentRating": userRating },
            "$push": { "answeredQuestionIds": question._id, "progressiveRatings": userRating},
            },
            {"new": true, "upsert": true },
        );
        
        res.json({ msg: questionResponse });
        
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}


function increasePerformance(userRating, questionRating) {
    let positiveTransform = 10 ** (userRating/400);
    let negativeTransform = 10 ** (questionRating/400);

    let positiveScaleFactor = positiveTransform / (positiveTransform + negativeTransform);
    let negativeScaleFactor = negativeTransform / (positiveTransform + negativeTransform);

    userRating = userRating + userScaleFactor * (1 - positiveScaleFactor);
    questionRating = questionRating + questionScaleFactor * (0 - negativeScaleFactor);

    return [userRating, questionRating];
}

function decreasePerformance(userRating, questionRating) {
    let positiveTransform = 10 ** (userRating/400);
    let negativeTransform = 10 ** (questionRating/400);

    let positiveScaleFactor = positiveTransform / (positiveTransform + negativeTransform);
    let negativeScaleFactor = negativeTransform / (positiveTransform + negativeTransform);

    userRating = userRating + userScaleFactor * (0 - positiveScaleFactor);
    questionRating = questionRating + questionScaleFactor * (1 - negativeScaleFactor);

    return [userRating, questionRating];
}

