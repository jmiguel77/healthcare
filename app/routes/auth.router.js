import express from 'express';
import useCases from '../use-cases/index.js';
import extractErrorMessage from '../utils/error.utils.js';

const router = express.Router();

router.post('/signup', (request, response) => {
    useCases.userUseCases.addUser(request.body)
        .then(() => {
            response.status(201);
            response.send();
        })
        .catch(err => {
            response.status(500);
            response.send(extractErrorMessage(err));
        });

});

router.post('/login', (request, response) => {
    useCases.userUseCases.validateUser(request.body)
        .then((token) => {
            response.json({token});
        })
        .catch((err) => {
            response.status(500);
            response.send(extractErrorMessage(err));
        });
})

export default router;
