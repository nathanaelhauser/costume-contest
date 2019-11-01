const inquirer = require('inquirer')
const mysql = require('mysql2')

const connection =
  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'costumes_db'
  })

connection.connect(err => {
  if (err) throw err

  start()

})

function leaderboard() {
  connection.query('SELECT * FROM contestants ORDER BY score', (e, r, fields) => {
    if (e) {
      console.log(e)
    }
    console.log(r)
    process.exit()
  })
}

function start() {
  inquirer.prompt({
    name: 'costumeContest',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['Enter The Contest', 'Vote', 'LeaderBoard', 'EXIT']
  })
    .then(function (answer) {
      if (answer.constumeContest === 'Enter The Contest') {
        enterContest()
      } else if (answer.costumeContest === 'LeaderBoard') {
        leaderBoard()
      } else if (answer.costumeContest === 'Vote') {
        vote()
      } else {
        connection.end()
      }
    })
}

const enterConterst = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Input your name:'

      },
      {
        type: 'input',
        name: 'costume',
        message: 'Input your costume'
      }
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO contestants SET ?',
        {
          name: answer.name,
          costume: answer.costume,
        },
        function (err) {
          if (err) throw err
          console.log('You were successfully entered into the contest!')
          start()
        })
    }
    )