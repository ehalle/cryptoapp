import config from 'config';
import mysql from 'mysql2';
import util from 'util';
import mongoose from 'mongoose';

// mysql init
const connection = mysql.createConnection(config.get('mysql'));
const connect = util.promisify(connection.connect).bind(connection);
const query = util.promisify(connection.query).bind(connection);

// mongo init
const host = config.get<string>('mongo.host');
const port = config.get<number>('mongo.port');
const database = config.get<string>('mongo.database');

// function scrape
// fetch data from google
// save in mongo
//

// loop get symbols from mysql
// scrape all symbols
// set timeout for next cycle

async function work() {
    try {

    } catch(err) {
        console.log(err);
    } finally {
        setTimeout(work, config.get<number>('worker.interval'));
    }
}

(async() => {
    await Promise.all([
        connect(),
        mongoose.connect(`mongodb://${host}:${port}/${database}`)
    ]);
    work();
})();