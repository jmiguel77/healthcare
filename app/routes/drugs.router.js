import express from 'express';
import UseCases from '../use-cases/index.js';
import extractErrorMessage from '../utils/error.utils.js';

const router = express.Router();

router.post('/', (request, response) => {
    UseCases.drugsUseCases.addDrug(request.body)
        .then(() => {
            response.status(201);
            response.send();
        })
        .catch(err => {
            response.status(500);
            response.send(extractErrorMessage(err))
        });
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
