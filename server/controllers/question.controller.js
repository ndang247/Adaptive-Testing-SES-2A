import QuestionModel from '../models/question.js';
import TestModel from '../models/test.js'
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { DateTime } from 'luxon';
import dotenv from 'dotenv';

dotenv.config();


export const createQuestion = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { category, content, rating, difficulty, correctAnswer, wrongAnswers } = req.body;

    //Retrieve the test id from url
    const testId = req.params.test_id;

    //Validate wrong answers
    if(wrongAnswers.length != 3){
        return res.status(401).send('Error: Three wrong answers required');
    }

    try {
        // Question instance with validated data
        const question = new QuestionModel({
            testIds: [],
            category,
            content,
            rating,
            difficulty, 
            correctAnswer,
            wrongAnswers
        });

        question.testIds.push(testId);

        await question.save();

        //Add the current question to its corresponding test entity
        await TestModel.findByIdAndUpdate(testId, 
            { "$push": { "questionIds": question._id } },
        );

        res.json({ msg: 'Question created' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const updateQuestion = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { category, content, rating, difficulty, correctAnswer, wrongAnswers } = req.body;

    const questionId = req.params.question_id;
    
    //Validate wrong answers
    if(wrongAnswers.length != 3){
        return res.status(401).send('Three wrong answers required');
    }
    try {
        //Update the current question
        const found = await QuestionModel.findByIdAndUpdate(questionId, 
            { "$set": { 
                "category": category, 
                "content": content,
                "rating": rating,
                "difficulty": difficulty,
                "correctAnswer": correctAnswer,
                "wrongAnswers": wrongAnswers
            }},
        )
        
        //Validate question ID
        if(!found){
            res.json({ msg: 'Question not found' }); 
        }
        else{
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
        const question = await QuestionModel.findOne({ test: req.params.question_id })  
        
        if(!question){
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
        const question = await QuestionModel.findOne({ test: req.params.question_id })  
        
        if(!question){
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
    var currentIndex = array.length,  randomIndex;
  
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


