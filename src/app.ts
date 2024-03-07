import express from 'express';
import usersRouter from './routers/users';
import guestsRouter from './routers/guests';
import githubRouter from './routers/github';
import path from 'path';
import config from 'config';
import errorHandler from './middlewares/error/error-handler';
import session from 'express-session';
import auth from './middlewares/github-auth';

const server = express();
const port = config.get<number>('app.port');

server.set('views', path.resolve(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use(express.urlencoded());
server.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
    },
}));
server.use(auth.initialize());
server.use(auth.session());

//routing
server.use('/', guestsRouter);
server.use('/users', usersRouter);
server.use('/github', githubRouter);

server.get('/login')

//error middlewares
server.use(errorHandler);

server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});