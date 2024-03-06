import config  from 'config';
import { Server } from 'socket.io';

const io = new Server({
    cors: {
        origin: "*"
    }
});

io.on('connection', socket => {
    console.log('A user connected');
    socket.on('update from worker', message => {
        console.log(`Message received from allegedly worker`, message)
        io.emit('update your list', message);
    });
});

io.listen(config.get<number>('io.port'));