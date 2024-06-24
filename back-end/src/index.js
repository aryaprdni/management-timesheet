import express from 'express'
import publicRouter from './route/public-api.js';
import userRouter from './route/api.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(publicRouter);
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})