import express from 'express';
import { register , login , refreshAccessToken } from './auth.controller.js';

const router = express.Router();

// -----------------------Auth-Routes ------------------------

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);

export default router;