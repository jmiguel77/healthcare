import express from 'express';
import authRouter from './auth.router.js';
import drugsRouter from './drugs.router.js';
import vaccinationRouter from './vaccination.router.js';
import tokenUtils from "../utils/token.utils.js";

const router = express.Router();

router.use((request, response, next) => {
    const URL = request.originalUrl.toString();
    if (!URL.startsWith('/auth')) {
        const authorization = request.headers.authorization;
        if (authorization == null) {
            response.status(401);
            response.send();
        } else {
            const token = authorization.replace('Bearer ', '');
            if (tokenUtils.isValidToken(token)) {
                next();
            } else {
                response.status(401);
                response.send();
            }
        }
    } else {
        next();
    }
});

router.use('/auth', authRouter);
router.use('/drugs', drugsRouter);
router.use('/vaccination', vaccinationRouter);

export default router;
