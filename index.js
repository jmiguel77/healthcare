import express from 'express';
import bodyParser from 'body-parser';
import mainRouter from './app/routes/index.js';

const app = express();

app.use(bodyParser.json());
app.use(mainRouter);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
})

