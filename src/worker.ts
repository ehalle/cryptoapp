import config from 'config';
import mysql from 'mysql2';
import util from 'util';
import mongoose from 'mongoose';
import getModel from './models/user-symbol/factory';
import getSymbolValueModel from './models/symbol-value/factory';
import axios from 'axios';
import cheerio from 'cheerio';

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

async function scrape(symbol: string) {
    console.log(`Scraping symbol ${symbol}`)
    const response = await axios(`https://www.google.com/finance/quote/${symbol}-USD`);
    const html = response.data;
    const $ = cheerio.load(html);
    const value = Number($('.YMlKec.fxKbKc').text().replace(',', ''));
    
    // Save in mongo
    await getSymbolValueModel().add({
        symbol,
        value,
        when: new Date()
    });

    return;
}

async function work() {
    try {
        const symbols = await getModel().getUniqueSymbols();
        await Promise.allSettled(symbols.map(scrape));
    } catch (err) {
        console.log(err);
    } finally {
        setTimeout(work, config.get<number>('worker.interval'));
    }
}

(async () => {
    await Promise.all([
        connect(),
        mongoose.connect(`mongodb://${host}:${port}/${database}`)
    ]);
    work();
})();