const inquirer = require('inquirer')
const mysql = require('mysql2')

const connection = 
mysqul.createConnection({
    host: 'localhost',
    // port: something
    user: 'root',
    password: 'password',
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
            leaderBoard()
        } else if(answer.costumeContest === 'Vote'){
            vote()
        } else {
            connection.end()
        }
    })
}
