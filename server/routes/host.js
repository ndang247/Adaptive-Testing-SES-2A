import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/host.controller.js';

const router = express.Router();

// POST host/register
// Route to register a new host
router.post('/register',
    // Validate user fields
    body('firstName', 'Name is required').not().isEmpty(),
    body('lastName', 'Name is required').not().isEmpty(),
    body('email', 'Valid email required').isEmail(),
    body('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6, max: 128 }),
    register);

// POST host/login
// Route to login an existing host
router.post('/login',
    // Validate inputs
    body('email', 'Valid email required').isEmail(),
    body('password', 'Password required').exists(),
    login);

export default router;
