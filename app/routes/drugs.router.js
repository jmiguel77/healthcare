import express from 'express';

const router = express.Router();

router.post('/', (request, response) => {
    response.send('add new drug');
});

router.get('/', (request, response) => {
    response.send('list of drugs');
});

router.put('/:id', (request, response) => {
    response.send('update drug');
});

router.delete('/:id', (request, response) => {
    response.send('delete a drug');
});

export default router;
