// npm packages
const inquirer = require('inquirer')
const mysql = require('mysql2')

// connection to database
const connection =
  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'groot',
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
      if (answer.costumeContest === 'Enter The Contest') {
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
function leaderboard() {
  connection.query('SELECT * FROM contestants ORDER BY votes', (e, r) => {
    if (e) {
      console.log(e)
    }
    console.log(r)
    process.exit()
  })
}

async function findVotes(contestants, name) {
  let response = await new Promise((resolve, reject) => {
    contestants.forEach((e, i, arr) => {
      if (e.name === name) {
        resolve(e.votes)
      }
    })
    reject(-1)
  })

  return response
}

const vote = _ => {
  inquirer.prompt({
    type: 'input',
    name: 'voter',
    message: 'What is your name?'
  })
    .then(answer => {
      connection.query('SELECT * FROM contestants ORDER BY votes', (e, data) => {
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
              name: 'name',
              message: 'Who do you want to vote for?',
              choices: names
            })
              .then(answer_name => {
                findVotes(data, answer_name.name)
                  .then(votes => {
                    connection.query('UPDATE contestants SET votes = ? WHERE name = ?', [votes + 1, answer_name.name], (e, data) => {
                      if (e) {
                        console.log(e)
                      }
                      connection.query('UPDATE contestants SET votedYet = ? WHERE name = ?', [1, answer.voter]), (e, data) => {
                        if (e) {
                          console.log(e)
                        }
                      }
                      console.log('Thank you for voting!')
                      start()
                    })
                  })
                  .catch(e => console.log(e))

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