const inquirer = require('inquirer')
const mysql = require('mysql2')

const connection = 
mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'costumes_db'
})

connection.connect(err => {
    if(err) throw err

  start()

})

function start () {
    inquirer.prompt({
        name: 'costumeContest',
        type:'list',
        message: 'What would you like to do?',
        choices:['Enter The Contest', 'Vote', 'LeaderBoard', 'EXIT']
    })
    .then(function (answer) {
        if(answer.constumeContest === 'Enter The Contest'){
            enterContest()
        } else if(answer.costumeContest === 'LeaderBoard'){
            leaderboard()
        } else if(answer.costumeContest === 'Vote'){
            vote()
        } else {
            connection.end()
        }
    })
}

function leaderboard () {
    connection.query('SELECT * FROM contestants ORDER BY score', (e, r) => {
        if (e) {
            console.log(e)
        }
        console.log(r)
        process.exit()
    })
}