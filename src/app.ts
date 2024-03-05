import express from 'express';

const server = express();
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server running in port ${PORT}...`);
});