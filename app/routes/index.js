import express from 'express';
import authRouter from './auth.router.js';
import drugsRouter from './drugs.router.js';
import vaccinationRouter from './vaccination.router.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/drugs', drugsRouter);
router.use('/vaccination', vaccinationRouter);

export default router;
