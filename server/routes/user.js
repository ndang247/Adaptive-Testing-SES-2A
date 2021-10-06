import express from 'express';
import { body } from 'express-validator';
import { register, login, getUserById } from '../controllers/user.controller.js';

const router = express.Router();

// POST users/register
// Route to register a new user
router.post('/register',
    // Validate user fields
    body('firstName', 'Name is required').not().isEmpty(),
    body('lastName', 'Name is required').not().isEmpty(),
    body('email', 'Valid email required').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6, max: 128 }),
    register);

// POST users/login
// Route to login an existing user
router.post('/login',
    // Validate inputs
    body('email', 'Valid email required').isEmail(),
    body('password', 'Password required').exists(),
    login);

// POST users/:user_id
// Route to get a user by ID
router.get('/:user_id', getUserById);

export default router;
