import express from 'express';
import { body } from 'express-validator';
import { authUser, authHost } from '../middleware/auth.js';
import {
    validatePin, createTest, getTestsByCreator, getTestById,
    getTestHistory
} from '../controllers/test.controller.js';
import { updateScore } from '../controllers/score.controller.js';

const router = express.Router();

router.get('/:creatorId', authHost, getTestsByCreator);

router.get('/user/exam/:id', authUser, getTestById);

// GET api/tests/history
// Route to get history of tests by user id
router.get('/user/history', authUser, getTestHistory);

// POST api/tests/
// Route for host to create a new test
router.post('/', authHost,
    // Validate test fields
    body('title', 'Title is required').not().isEmpty(),
    body('questions', 'Must have a least one question').isArray({ min: 1 }),
    body('expiryDate', 'Valid date required').not().isEmpty(),
    body('contentType', 'Test content description required').not().isEmpty(),
    createTest
);

// POST api/tests/validate
// Route to validate user input exam's id/pin
router.post('/validate', authUser,
    // Validate pin
    body('pin', 'Please enter a valid pin').not().isEmpty(),
    validatePin
);

// Route to initialize a user's attempt at a test, creates a score entity
// router.post('/scores/:test_id/:question_id', authUser, createScore);

// PUT api/tests/scores/:test_id/:question_id
// Route to mark a question correct or incorrect then update the rating of the player & question
router.put('/scores/:test_id/:question_id', authUser,
    // Validate answer field
    body('answer', 'Answer is required').not().isEmpty(),
    updateScore
);

export default router;
