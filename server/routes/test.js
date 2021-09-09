import express from 'express';
import { body } from 'express-validator';
import auth from '../middleware/auth.js';
import { validatePin, createTest } from '../controllers/test.controller.js';

const router = express.Router();

// POST tests/
// Route to create a new test
router.post('/', auth,
    // Validate user fields
    body('title', 'Title is required').not().isEmpty(),
    body('expiryDate', 'Valid date required').not().isEmpty(),
    body('testLength', 'Valid test duration is required').not().isEmpty().isNumeric(),
    body('contentType', 'Test content description required').not().isEmpty(),
    body('pin', 'Valid pin required').not().isEmpty().isLength({ min: 6, max: 6}),
    createTest
);

// GET tests/:test_id
// Route to grant user access to a test
router.get('/:test_id', auth,
    // Validate pin
    body('pin', 'Please enter a valid 6 digit pin')
    .isLength({ min: 6, max: 6 })
    .not().isEmpty(),
    validatePin
);

export default router;
