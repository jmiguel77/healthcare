import express from 'express';

const router = express.Router();

router.post('/', (request, response) => {
    response.send('add new vaccination');
});

router.get('/', (request, response) => {
    response.send('list of vaccination');
});

router.put('/:id', (request, response) => {
    response.send('update vaccination');
});

router.delete('/:id', (request, response) => {
    response.send('delete vaccination');
});

export default router;
