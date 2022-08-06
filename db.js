const mysql = require('mysql2');

module.exports = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'imagepalace11',
    database:'online_exam',
    
});