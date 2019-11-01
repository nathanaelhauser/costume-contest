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
