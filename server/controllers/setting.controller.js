import UserModel from '../models/user.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import mongoose from "mongoose";

dotenv.config();

export const updateUser = async (req, res) => {
    const result = validationResult(req);

    // Return bad request on validation error
    // If the result is not empty then there is something wrong
    if (!result.isEmpty()) return res.status(400).json({ errors: result.errors });

    const id = req.params.id;
    const { firstName, lastName, oldPassword, newPassword } = req.body;

    let user = await UserModel.findById(id);
    if (!mongoose.Types.ObjectId.isValid(id) || !user) return res.status(404).send(`No user existed with that id: ${id}`);

    // Match user to password
    const isMatch = await validatePassword(oldPassword, user.password);

    if (!isMatch) return res.status(401).json({ errors: 'Invalid credentials' });

    const hashedNewPassword = await hashPassword(newPassword);

    const updatedUser = { firstName, lastName, password: hashedNewPassword };

    await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });

    // Updated user
    user = await UserModel.findById(id);

    res.json({
        token: req.headers.authorization?.split(" ")[1],
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
    });
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}