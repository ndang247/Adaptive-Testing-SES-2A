import express from 'express';
import { body } from 'express-validator';
import { authUser, authHost } from '../middleware/auth.js';
import { validatePin, createTest, createScore, updateScore } from '../controllers/test.controller.js';

const router = express.Router();

// POST tests/
// Route for host to create a new test
router.post('/', authHost,
    // Validate test fields
    body('title', 'Title is required').not().isEmpty(),
    body('expiryDate', 'Valid date required').not().isEmpty(),
    body('testLength', 'Valid test duration is required').not().isEmpty().isNumeric(),
    body('contentType', 'Test content description required').not().isEmpty(),
    createTest
);

// GET tests/
// Route to grant user access to a test
router.get('/', authUser,
    // Validate pin
    body('pin', 'Please enter a valid pin')
    .not().isEmpty(),
    validatePin
);

// POST tests/scores/:test_id/:question_id
// Route to initialize a user's attempt at a test, creates a score entity
router.post('/scores/:test_id/:question_id', authUser, createScore );

// PUT tests/scores/:test_id/:question_id
// Route to mark a question correct or incorrect then update the rating of the player & question
router.put('/scores/:test_id/:question_id', authUser, 
    // Validate answer field
    body('answer', 'Answer is required').not().isEmpty(),
updateScore);

export default router;
