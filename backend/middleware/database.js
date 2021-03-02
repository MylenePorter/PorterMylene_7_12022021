const mysql = require('mysql');
require('dotenv').config(); // Centralise variables environnements 

exports.connection = mysql.createPool({
    host     : `${process.env.DB_HOST}`,
    user     : `${process.env.DB_USER}`,
    password : `${process.env.DB_PASSWORD}`,
    database : `${process.env.DB_BASE}`
});