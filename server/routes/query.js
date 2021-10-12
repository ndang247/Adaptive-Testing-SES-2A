import express from 'express';
import { body } from 'express-validator';
import { authUser } from '../middleware/auth.js';
import { createQuery } from '../controllers/query.controller.js';

const router = express.Router();

// POST queries
router.post('/', authUser,
    // Validate user fields
    body('fullName', 'Name is required').not().isEmpty(),
    body('email', 'Valid email required').isEmail(),
    body('query', 'Query is required').not().isEmpty(),
    createQuery
);


export default router;
