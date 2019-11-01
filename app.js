const inquirer = require('inquirer')
const mysql = require('mysql2')

const connection =
  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'groot',
    database: 'costumes_db'
  })

connection.connect(err => {
  if (err) throw err

  start()

})

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
function leaderboard() {
  connection.query('SELECT * FROM contestants ORDER BY score', (e, r, fields) => {
    if (e) {
      console.log(e)
    }
    console.log(r)
    process.exit()
  })
}

const votingMenu = _ => {
  inquirer.prompt({
    type: 'input',
    name: 'voter',
    message: 'What is your name?'
  })
    .then(answer => {
      console.log(answer)
      db.query('SELECT * FROM contestants ORDER BY votes', (e, data) => {
        if (e) {
          console.log(e)
        }
        let index = -1
        data.forEach((cont, i) => {
          if (cont.name === answer.voter) {
            index = i
          }
        })
        if (index !== -1) {
          if (!data[index].votedYet) {
            const names = data.filter((x, i) => i !== index).map(x => x.name)

            inquirer.prompt({
              type: 'list',
              name: 'vote',
              message: 'Who do you want to vote for?',
              choices: names
            })
              .then(answer => {
                console.log(answer)
              })
              .catch(e => console.log(e))
          }
        } else {
          console.log(`Can't vote until you enter the competition.`)
          start()
        }
      })

    })
    .catch(e => console.log(e))
}