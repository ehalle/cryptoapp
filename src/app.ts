import express from 'express';
import userRouter from './routers/users';

const server = express();
const PORT = 8080;

server.use('/users', userRouter);

server.listen(PORT, () => {
    console.log(`Server running in port ${PORT}...`);
});