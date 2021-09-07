import express from 'express';
import { body } from 'express-validator';
import { validatePin } from '../controllers/test.controller.js';

const router = express.Router();

// POST test/:test_id
// Route to grant user access to a test
router.get('/test/:test_id',
    // Validate pin
    body('pin', 'Please enter a valid 6 digit pin')
    .isLength({ min: 6, max: 6 })
    .not().isEmpty(),
    validatePin
);

export default router;
