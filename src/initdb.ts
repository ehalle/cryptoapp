import mysql from 'mysql2';
import util from 'util';

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'cryptoapp',
  port: 3310
});

const connect = util.promisify(connection.connect).bind(connection);
const query = util.promisify(connection.query).bind(connection);
(async () => {
  try {
    await connect();
    console.log("Connected!");

    await query(`
        CREATE TABLE IF NOT EXISTS users (
            id int auto_increment,
            github_id varchar(255) not null,
            primary key (id)
        ) 
    `);
    console.log("created table users!");

    await query(`
        CREATE TABLE IF NOT EXISTS users_symbols (
            id int auto_increment,
            user_id int not null,
            symbol varchar(3) not null,
            primary key (id)
        ) 
    `);
    console.log("created table users_symbols!");
    connection.end();
} catch (e) {
    console.log(e);
  }
})();