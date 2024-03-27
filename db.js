const mysql = require("mysql2")
const db = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "password",
    database: "login"
}).promise();

db.connect(function(err) {
    if(err) throw err;
    console.log("Database Created!!");
});

module.exports = db;