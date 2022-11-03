import express from 'express';
import mainRouter from './app/routes/index.js';

const app = express();

app.use(mainRouter);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
})

