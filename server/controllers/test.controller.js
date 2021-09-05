import TestModel from '../models/test.js';
import { validationResult } from 'express-validator';
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';
import test from '../models/test.js';

dotenv.config();

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
