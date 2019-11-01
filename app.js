const inquirer = require('inquirer')
const mysql = require('mysql2')

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'costumes_db'
// })

const votingMenu = _ => {
  inquirer.prompt({
    type: 'input',
    name: 'voter',
    message: 'What is your name?'
  })
    .then(answer => {
      console.log(hello)
      console.log(answer)
    })
    .catch(e => console.log(e))
}

votingMenu()