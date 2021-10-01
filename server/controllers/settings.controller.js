import UserModel from '../models/user.js';
import { validationResult } from 'express-validator';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/role.js';
import { DateTime } from 'luxon';
import dotenv from 'dotenv';

dotenv.config();

export const getProfile = async (req, res) => {
    try {
        // Find one question based on ID in req parameters
        const user = await UserModel.findOne({ email: req.params.user_email })

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}