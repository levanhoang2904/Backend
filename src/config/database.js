const mysql = require('mysql2');
// require('dotenv').config();

// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3307,
//     user: 'root',
//     password: '123456',
//     database: 'vanhuy'
//   });

const connection = mysql.createConnection({
    host: 'localhost',
 
    user: 'root',
    password: '',
    database: 'DuAn'

  });

module.exports = connection;
  