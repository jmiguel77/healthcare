import express from 'express';
import useCases from '../use-cases/index.js';
import extractErrorMessage from '../utils/error.utils.js';

const router = express.Router();

router.post('/', (request, response) => {
    useCases.drugsUseCases.addDrug(request.body)
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
    useCases.drugsUseCases.fetchDrugs()
        .then((data) => {
            response.send(data);
        })
        .catch(err => {
            response.status(500);
            response.send(extractErrorMessage(err))
        });
});

router.put('/:id', (request, response) => {
    useCases.drugsUseCases.updateDrug(request.params.id, request.body)
        .then(() => {
            response.status(200);
            response.send();
        })
        .catch(err => {
            response.status(500);
            response.send(extractErrorMessage(err))
        });
});

router.delete('/:id', (request, response) => {
    useCases.drugsUseCases.deleteDrug(request.params.id)
        .then(() => {
            response.status(200);
            response.send();
        })
        .catch(err => {
            response.status(500);
            response.send(extractErrorMessage(err))
        });
});

export default router;
