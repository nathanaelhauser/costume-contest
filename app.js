const inquirer = require('inquirer')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: costumes_db
});

function leaderboard () {
    connection.query('SELECT * FROM contestants ORDER BY score', (e, r, fields) => {
        if (e) {
            console.log(e)
        }
        console.log(r)
        process.exit()
    })
}