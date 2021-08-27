const mysql      = require('mysql');

const connection = mysql.createConnection({
  host     : '192.241.155.75',
  user     : process.env.ROOT_NEW,
  password : process.env.PASS_NEW,
  database : process.env.DATABASE_NEW
});

module.exports =  connection ;