import express from 'express';

const router = express.Router();

router.post('/signup', (request, response) => {
    response.send('ok');
});

router.post('/login', (request, response) => {
    response.send('some token');
})

export default router;
