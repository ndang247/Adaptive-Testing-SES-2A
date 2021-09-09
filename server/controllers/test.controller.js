import TestModel from '../models/test.js';
import { validationResult } from 'express-validator';
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';
import test from '../models/test.js';

dotenv.config();


export const createTest = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { firstName, lastName, email, password } = req.body;

    try {
        // Check to see if a user exists
        let user = await UserModel.findOne({ email });

        // If a user was already found in the database by email throw error
        if (user) return res.status(400).json({ errors: 'Account already exists' });

        // Get user avatar
        const avatar = gravatar.url(email, {
            s: '200',
            d: 'mm'
        });

        // Encrypt user password
        const hashedPassword = await hashPassword(password);

        // User instance with validated data
        user = new UserModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            avatar,
            role: User,
            dateCreated: DateTime.now(),
            scoreIds: []
        });

        await user.save();

        // Return jsonwebtoken for authorization
        const payload = { // Create payload from mongoDB id -> note mongoDB id is _id
            user: {
                _id: user._id,
                email: user.email,
                role: user.role
            }
        }

        // TODO: Shorten expiry time post production -> set 1h
        jwt.sign(payload, process.env.JWT_SECRET_TOKEN, { expiresIn: 3600000 },
            (err, token) => { // Either returns error or token
                if (err) throw err;
                res.status(201).json({ token });
            });

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
