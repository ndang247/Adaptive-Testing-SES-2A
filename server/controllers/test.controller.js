import TestModel from '../models/test.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { DateTime } from 'luxon';
import dotenv from 'dotenv';

dotenv.config();


export const createTest = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { title, expiryDate, testLength, contentType, pin } = req.body;

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
            contentType,
            pin   
        });

        await test.save();
        res.json({ msg: 'Test created' });
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

    const pin = req.body;

    try {
        // Find one test based on ID in req parameters
        const test = await TestModel.findOne({ test: req.params.test_id })  
        
        if(!test){
            return res.status(400).json({ msg: 'Test not found' });
        }

        // If pin is not match throw error
        if (test.pin != pin){
            return res.status(401).json({ msg: 'Invalid pin'})
        }

        //return test if valid
        res.json(test); 

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}
