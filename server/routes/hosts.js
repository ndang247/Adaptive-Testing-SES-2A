import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-Validator';

import User from '../models/user.js';

dotenv.config();

// POST host/register
// Route to register a new host

router.post('/register',
    //validate user fields
    body('firstName', 'Name is required').not().isEmpty(),
    body('lastName', 'Name is required').not().isEmpty(),
    body('email', 'Valid email required').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6, max: 128 })

    , async(req, res) => {    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()}); //return bad request on validation error
    }
    
    const{ firstName, lastName, email, password } = req.body;

    try {
        //Check to see if a user exists
        let user = await User.findOne({ email });

        if(user){ //if a user was already found in the database by email throw error
            return res.status(400).json({ errors: [{ msg: 'That account already exists' }] });
        }

        //Get user avatar
        const avatar = gravatar.url(email, {
            s: '200',
            d: 'mm'
        });

        const role = "Host"

        //User instance with validated data
        user = new User({
            firstName,
            lastName,
            email,
            password,
            avatar,
            role
        });

        //Encrypt user password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return jsonwebtoken for authorization

        const payload = { //create payload from mongo id
            user: {
                id: user.id
            }
        }

        //TODO: Shorten expiry time post production
        jwt.sign(payload, 
            process.env.JWT_SECRET_TOKEN,
            { expiresIn: 3600000},
            (err, token) => { //either returns error or token
                if(err) throw err;
                res.json({ token });
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

// POST host/login
// Route to login an existing host

router.post('/login',
    //validate inputs
    body('email', 'Valid email required').isEmail(),
    body('password', 'Password required').exists(),
async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()}); //return validation errors
    }

    const{ email, password } = req.body;

    try {
        //Check to see if user exists in database
        let user = await User.findOne({ email });

        if(!user){  //if no user exists send error
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        //Match user to password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        if(user.role !== "Host"){
            return res.status(400).json({ errors: [{ msg: 'User account found, please use user login' }] });
        }

        const payload = { //create payload from mongo id
            user: {
                id: user.id
            }
        }

        //TODO: Shorten expiry time post production
        jwt.sign(payload, 
            process.env.JWT_SECRET_TOKEN,
            { expiresIn: 3600000},
            (err, token) => { //either returns error or token
                if(err) throw err;
                res.json({ token });
        });
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

export default router;