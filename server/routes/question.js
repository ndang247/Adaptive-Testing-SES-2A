import express from 'express';
import { body } from 'express-validator';
import { auth, authUser, authHost } from '../middleware/auth.js';
import { createQuestion, updateQuestion, getQuestion, getRandomAnswers } from '../controllers/question.controller.js';

const router = express.Router();

//NOTE: All question routes require a test ID


// POST questions/:test_id
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

// PUT questions/:test_id/:question_id
// Route for host to update fields of a question

router.put('/:test_id/:question_id', authHost,
    body('category', 'Category is required').not().isEmpty(),
    body('content', 'Content is required').not().isEmpty(),
    body('rating', 'Question rating is required').not().isEmpty().isNumeric(),
    body('difficulty', 'Difficulty is required').not().isEmpty(),
    body('correctAnswer', 'Correct answer is required').not().isEmpty(),
    body('wrongAnswers', 'Three wrong answers are required').not().isEmpty(),
    updateQuestion
);

// GET questions/:test_id/:question_id
// Route to return question by question ID

router.get('/:test_id/:question_id', auth, getQuestion);

// GET questions/answers:test_id/:question_id
// Route to all answers in a random order by question ID
router.get('/answers/:test_id/:question_id', auth, getRandomAnswers);
export default router;
