import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import { createQuery } from '../controllers/query.controller.js';

const router = express.Router();

// NOTE: All question routes require a test ID

// POST queries
// Route for host to create new questions
router.post('/', auth,
    // Validate user fields
    body('fullName', 'Name is required').not().isEmpty(),
    body('email', 'Valid email required').isEmail(),
    body('query', 'Query is required').not().isEmpty(),
    createQuery
);


export default router;
