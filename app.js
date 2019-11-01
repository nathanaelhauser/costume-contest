const inquirer = require('inquirer')
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'groot',
  database: 'costumes_db'
})

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
        console.log(data)
      })

    })
    .catch(e => console.log(e))
}

votingMenu()