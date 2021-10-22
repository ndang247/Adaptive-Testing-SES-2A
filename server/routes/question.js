import express from 'express';
import { body } from 'express-validator';
import { auth, authHost } from '../middleware/auth.js';
import {
    updateQuestion, getQuestionById
} from '../controllers/question.controller.js';

const router = express.Router();

// PUT questions/:question_id
// Route for host to update fields of a question
router.put('/:question_id', authHost,
    body('category', 'Category is required').not().isEmpty(),
    body('content', 'Content is required').not().isEmpty(),
    body('rating', 'Question rating is required').not().isEmpty().isNumeric(),
    body('difficulty', 'Difficulty is required').not().isEmpty(),
    body('correctAnswer', 'Correct answer is required').not().isEmpty(),
    body('answers', 'Four answers are required').not().isEmpty(),
    updateQuestion
);

// GET questions/:question_id
// Route to return question by question ID
router.get('/:question_id', auth, getQuestionById);

export default router;
