import express from 'express';
import { body } from 'express-validator';
import { authUser, authHost } from '../middleware/auth.js';
import { createQuestion, updateQuestion } from '../controllers/question.controller.js';

const router = express.Router();

// POST questions/
// Route for host to create new questions
router.post('/:test_id', authHost,
    // Validate user fields
    body('category', 'Category is required').not().isEmpty(),
    body('content', 'Content is required').not().isEmpty(),
    body('rating', 'Question rating is required').not().isEmpty().isNumeric(),
    body('difficulty', 'Difficulty is required').not().isEmpty(),
    body('correctAnswer', 'Correct answer is required').not().isEmpty(),
    body('wrongAnswers', 'Three wrong answers are required').not().isEmpty(),
    createQuestion
);

router.put('/:test_id/:question_id', authHost,
    body('category', 'Category is required').not().isEmpty(),
    body('content', 'Content is required').not().isEmpty(),
    body('rating', 'Question rating is required').not().isEmpty().isNumeric(),
    body('difficulty', 'Difficulty is required').not().isEmpty(),
    body('correctAnswer', 'Correct answer is required').not().isEmpty(),
    body('wrongAnswers', 'Three wrong answers are required').not().isEmpty(),
    updateQuestion
);

export default router;
