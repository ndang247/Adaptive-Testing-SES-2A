import UserModel from '../models/user.js';
import { validationResult } from 'express-validator';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/role.js';
import { DateTime } from 'luxon';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
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

export const login = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { email, password } = req.body;

    try {
        // Check to see if user exists in database
        let user = await UserModel.findOne({ email });

        // If no user exists send error
        if (!user) return res.status(401).json({ errors: 'Invalid credentials' });

        // Match user to password
        const isMatch = await validatePassword(password, user.password);

        if (!isMatch) return res.status(401).json({ errors: 'Invalid credentials' });

        if (user.role !== User) return res.status(400).json({ errors: 'Unauthorized' });

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
                res.json({ token });
            });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

export const getUser = async (req, res) => {
    try {
        // Find one question based on ID in req parameters
        const user = await UserModel.findOne({ test: req.params.user_id })  
        
        if(!user){
            return res.status(400).json({ msg: 'User not found' });
        }

        res.json(user); 
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}
