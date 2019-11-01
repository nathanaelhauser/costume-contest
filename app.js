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
      if (answer.costumeContest === 'Enter The Contest') {
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

 function leaderboard () {
 connection.query('SELECT * FROM contestants ORDER BY score', (e, r, fields) => {
    if (e) {
      console.log(e)
    }
    console.log(r)
    process.exit()
  })
}

const findVotes = (contestants, name) => {
  contestants.forEach(e => {
    if (e.name === name) {
      return e.votes
    }
  })
  return -1
}

const vote = _ => {
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
              name: 'name',
              message: 'Who do you want to vote for?',
              choices: names
            })
              .then(answer => {
                const votes = findVotes(data, answer.name)
                connection.query('UPDATE contestants SET votes = ? WHERE name = ?', [ votes+1, answer.name], (e, data) => {
                  if (e) {
                    console.log(e)
                  }
                  console.log(data)
                })
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