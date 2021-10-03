import express from 'express';
//import { body } from 'express-validator';
import { getProfile } from '../controllers/settings.controller.js'; 

const router = express.Router();

// GET users/:user_email
// Route to get a user by email
router.get('/:user_email', getProfile);

export default router;