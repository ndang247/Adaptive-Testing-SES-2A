import express from 'express';
import { authUser } from '../middleware/auth.js';
import { getScoreByExamId } from '../controllers/score.controller.js';

const router = express.Router();

router.get('/:test_id', authUser, getScoreByExamId);

export default router;
