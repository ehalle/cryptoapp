import express from 'express';
import userRouter from './routers/users';
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
        maxAge: 1000 * 60 * 60 * 24 * 5 * 7,
    },
}));
server.use(auth.initialize());
server.use(auth.session());

//routing
server.use('/users', userRouter);

server.get('/login')

//error middlewares
server.use(errorHandler);

server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});