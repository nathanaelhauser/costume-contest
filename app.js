// npm packages
const inquirer = require('inquirer')
const mysql = require('mysql2')

// connection to database
const connection =
  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'costumes_db'
  })

// creating connection to db and starting in console
connection.connect(err => {
  if (err) throw err

  start()

})

// start function in console
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
        leaderboard()
      } else if (answer.costumeContest === 'Vote') {
        vote()
      } else {
        connection.end()
      }
    })
}

// letting users add their costume to constest
const enterContest = () => {
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
    // adding users into database
    .then(answer => {
      connection.query(
        'INSERT INTO contestants(name, costume, votes, votedYet) VALUES (?, ?, ?, ?)',
        [answer.name, answer.costume, 0, 0],
        function (err) {
          if (err) throw err
          console.log('You were successfully entered into the contest!')
          start()
        })
    })
    .catch(e => console.log(e))
}

// leaderboard function
function leaderboard () {
    connection.query('SELECT * FROM contestants ORDER BY score', (e, r) => {
        if (e) {
            console.log(e)
        }
            console.log(r)
            process.exit()
    })
}
