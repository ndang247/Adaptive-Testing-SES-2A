import express from 'express';
import { body } from 'express-validator';
import { updateUser } from '../controllers/setting.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Update a user
router.patch('/:id', // Validate user fields
    auth,
    body('firstName', 'First name is required').not().isEmpty(),
    body('lastName', 'Last name is required').not().isEmpty(),
    body('oldPassword', 'Old password is required').not().isEmpty(),
    body('newPassword', 'New password is required').not().isEmpty(),
    updateUser);

export default router;