import UserModel from '../models/user.js';
import { validationResult } from 'express-validator';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import dotenv from 'dotenv';
import { Host } from '../models/role.js';

dotenv.config();

export const register = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const { firstName, lastName, email, password, policy } = req.body;

    try {
        // Check to see if a user exists
        let user = await UserModel.findOne({ email });

        // If a user was already found in the database by email throw error
        if (user) return res.status(400).json({ errors: 'That account already exists' });

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
            policy,
            role: Host,
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
        jwt.sign(payload, process.env.JWT_SECRET_TOKEN, { expiresIn: "1h" },
            (err, token) => { // Either returns error or token
                if (err) throw err;
                res.status(201).json({ 
                    token, 
                    id: user._id,
                    firstName: user.firstName, 
                    lastName: user.lastName, 
                    email: user.email, 
                    role: user.role });
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
        if (!user) return res.status(400).json({ errors: 'Invalid credentials' });

        // Match user to password
        const isMatch = await validatePassword(password, user.password);

        if (!isMatch) return res.status(401).json({ errors: 'Invalid credentials' });

        if (user.role !== Host) return res.status(400).json({ errors: 'Unauthorized' });

        const payload = { // Create payload from mongoDB id -> note mongoDB id is _id
            user: {
                _id: user._id,
                email: user.email,
                role: user.role
            }
        }

        // TODO: Shorten expiry time post production -> set 1h
        jwt.sign(payload, process.env.JWT_SECRET_TOKEN, { expiresIn: "1h" },
            (err, token) => { // Either returns error or token
                if (err) throw err;
                res.status(201).json({ 
                    token, 
                    id: user._id,
                    firstName: user.firstName, 
                    lastName: user.lastName, 
                    email: user.email, 
                    role: user.role });
            });

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
